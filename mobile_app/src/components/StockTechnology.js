import React,{Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import IconButton from 'material-ui/IconButton'
import NavigationBefore from 'material-ui/svg-icons/image/navigate-before'
import ContentAdd from 'material-ui/svg-icons/content/add'
import ActionDone from 'material-ui/svg-icons/action/done'
import Chip from 'material-ui/Chip'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {StickyContainer, Sticky} from 'react-sticky'
import Toast from 'rk-toast'
import stock from '../common/stock'
import utils from '../common/utils'
import ConfirmDialog from '../common/ConfirmDialog'

const ScreenWidth = window.screen.width
const ScreenHeight = window.screen.height
export default class StockTechnology extends Component {
    constructor(props) {
        super(props)
        let data = this.initData(true)
        let selectedCategory = []
        if (typeof this.props.value === 'string' && this.props.value.length > 0){
            selectedCategory = this.props.value.split(',')
        }
        this.state = {
            category: data.category,
            currentCategory: data.currentCategory,
            selectedCategory: selectedCategory,
            data: data.data,
            disabledSubmit: false,
            disabledLabel: '提交中，请稍候...',
        }
        //console.log(this.props)
    }

    initData(isFirst) {
        let category = stock.getTechnologyCategory()
        let data = [], currentCategory = null
        if (category.length > 0) {
            if (isFirst) { // 如果是第一次初始化，则使用第1个分类
                currentCategory = category[0]
            } else if (category.indexOf(this.state.currentCategory) >= 0) { // 如果删除删除后，当前的分类还存在，则使用当前分类
                currentCategory = this.state.currentCategory
            } else {// 如果删除删除后，当前的分类不存在，则使用第1个分类
                currentCategory = category[0]
            }
        }
        if (category.length > 0) {
            data = stock.getTechnology(currentCategory)
        }
        return {category: category, data: data, currentCategory: currentCategory}
    }

    handleDelete = (item)=> {
        ConfirmDialog.show(`确定要删除【${item.name}】吗？`, ()=> {
            if (stock.deleteTechnology(item.id)) {
                this.setState(this.initData())
                Toast.show('股票技术删除成功', 5)
            } else {
                Toast.show('股票技术删除失败', 5)
            }
        })
    }

    handleTypeChange = (e, item)=> {
        this.setState({currentCategory: item.key, data: stock.getTechnology(item.key)})
    }

    handleSelectedRemove = (item)=> {
        let selectedCategory = this.state.selectedCategory
        let index = selectedCategory.indexOf(item)
        if (index >= 0) {
            selectedCategory.splice(index, 1)
            this.setState({selectedCategory: selectedCategory})
        }
    }

    handleSelectedAdd = (item)=> {
        let selectedCategory = this.state.selectedCategory
        let index = selectedCategory.indexOf(item)
        if (index < 0) {
            selectedCategory.push(item)
            this.setState({selectedCategory: selectedCategory})
        }
    }

    handleFinish = ()=> {
        this.props.onSelected && this.props.onSelected(this.state.selectedCategory)
    }

    renderHeader() {
        if (this.props.isSelect) {
            return (
                <div style={{display:'flex',padding:5,backgroundColor:'#da301c'}}>
                    {this.state.selectedCategory.map((item)=> {
                        return (
                            <Chip style={{marginRight:5}} key={item}
                                  onRequestDelete={()=>this.handleSelectedRemove(item)}>
                                {item}
                            </Chip>
                        )
                    })}
                    <ActionDone style={{width:32,height:32,color:'#fff'}} onTouchTap={this.handleFinish}/>
                </div>
            )
        } else {
            return (
                <AppBar
                    titleStyle={{fontSize:20}}
                    title='股票技术'
                    iconElementLeft={<IconButton style={{padding:7}} iconStyle={{width:36,height:36}} onTouchTap={()=>{ history.go(-1)}}><NavigationBefore /></IconButton>}
                    iconElementRight={<IconButton style={{padding:6}} iconStyle={{width:36,height:36}} href='#/stock/technology/add'><ContentAdd /></IconButton>}
                />
            )
        }
    }

    render() {
        return (
            <StickyContainer>
                <Sticky style={{zIndex:9999,}}>
                    {this.renderHeader()}
                </Sticky>
                <div
                    style={{width:100,backgroundColor:'#5096d2',minHeight:ScreenHeight-48,float:'left',overflowY:'auto',overflowX:'hidden'}}>
                    <Menu style={{maxWidth:100}} listStyle={{paddingBottom:0,paddingTop:0}}
                          onItemTouchTap={this.handleTypeChange}>
                        {this.state.category.map(item => (
                            <MenuItem key={item} primaryText={item}
                                      style={this.state.currentCategory===item?{backgroundColor: '#fff',color: '#5096d2'}:{color:'#fff'}}>
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
                <div
                    style={{width:ScreenWidth-100,backgroundColor:'#f5f5f5',height:ScreenHeight-48,float:'left',overflowY:'auto',overflowX:'hidden'}}>
                    {this.state.data.map((item)=> {
                        return (
                            <Card style={{position:'relative'}}
                                  zDepth={0} key={item.id} initiallyExpanded={false}>
                                <CardHeader
                                    style={{padding:6}} textStyle={{paddingRight:40}} titleStyle={{padding:'5px 0'}}
                                    title={ this.props.isSelect?(<a href="javascript:;" onTouchTap={()=>this.handleSelectedAdd(item.name)}>{item.name}</a>):item.name}
                                    showExpandableButton={true}
                                />
                                <CardText style={{padding:'0 6px',textAlign:'left'}} expandable={true}>
                                    <pre style={{margin:'10px 0'}}>{item.description}</pre>
                                </CardText>
                                <CardActions style={{padding:0,textAlign:'right'}} expandable={true}>
                                    <FlatButton style={{minWidth:40}} labelStyle={{paddingLeft:8,paddingRight:8}}
                                                label='修改' href={`#/stock/technology/add/${item.id}`}
                                                secondary={true}/>
                                    <FlatButton style={{minWidth:40}} labelStyle={{paddingLeft:8,paddingRight:8}}
                                                label='删除' onTouchTap={this.handleDelete.bind(this,item)}
                                                secondary={true}/>
                                </CardActions>
                                <Divider/>
                            </Card>
                        )
                    })}
                </div>
            </StickyContainer>
        )
    }
}

const styles = {
    input: {
        width: '96%',
    },
}

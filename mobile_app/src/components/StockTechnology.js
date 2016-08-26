import React,{Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationBefore from 'material-ui/svg-icons/image/navigate-before'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {StickyContainer, Sticky} from 'react-sticky'
import Toast from 'rk-toast'
import stock from '../common/stock'
import utils from '../common/utils'

const ScreenWidth = window.screen.width
const ScreenHeight = window.screen.height
export default class StockTechnology extends Component {
    constructor(props) {
        super(props)
        let category = stock.getTechnologyCategory()
        let data = [], currentCategory = category[0]
        if (category.length > 0) {
            data = stock.getTechnology(currentCategory)
        }
        this.state = {
            category: category,
            currentCategory: currentCategory,
            data: data,
            disabledSubmit: false,
            disabledLabel: '提交中，请稍候...',
        }
        console.log(data,category)
    }

    handleTypeChange = (e, item)=> {
        this.setState({currentCategory: item.key, data: stock.getTechnology(item.key)})
    }

    render() {
        return (
            <StickyContainer>
                <Sticky style={{zIndex:9999}}>
                    <AppBar
                        titleStyle={{fontSize:20}}
                        title='股票技术'
                        iconElementLeft={<IconButton style={{padding:7}} iconStyle={{width:36,height:36}} onTouchTap={()=>{ history.go(-1)}}><NavigationBefore /></IconButton>}
                        iconElementRight={<IconButton style={{padding:6}} iconStyle={{width:36,height:36}} href='#/stock/technology/add'><ContentAdd /></IconButton>}
                    />
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
                                    title={
                                        <a href="">{item.name}</a>
                                     }
                                    showExpandableButton={true}
                                />
                                <CardText style={{padding:'0 6px',textAlign:'left'}} expandable={true}>
                                    <pre style={{margin:'10px 0'}}>{item.description}</pre>
                                </CardText>
                                <CardActions style={{padding:0,textAlign:'right'}} expandable={true}>
                                    <FlatButton style={{minWidth:40}} labelStyle={{paddingLeft:8,paddingRight:8}}
                                                label='选择' href={`#/stock/operation/${item.id}`}
                                                secondary={true}/>
                                    <FlatButton style={{minWidth:40}} labelStyle={{paddingLeft:8,paddingRight:8}}
                                                label='修改' href={`#/stock/operation/${item.id}`}
                                                secondary={true}/>
                                    <FlatButton style={{minWidth:40}} labelStyle={{paddingLeft:8,paddingRight:8}}
                                                label='删除' href={`#/stock/detail/${item.id}`}
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

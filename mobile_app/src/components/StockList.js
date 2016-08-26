import React,{Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import NavigationBefore from 'material-ui/svg-icons/image/navigate-before'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import InfiniteScroll from 'react-infinite-scroller'
import {StickyContainer, Sticky} from 'react-sticky'
import _ from 'underscore'
import utils from '../common/utils'
import Loading from '../common/Loading'
import stock from '../common/stock'
import {StockStateEnum,StockRecordTypeEnum} from '../common/enum'

export default class StockList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: stock.list(),
            openState: false,
            openDialog: false,
        }
    }

    handleStateOpen(event, item) {
        event.preventDefault()
        this.setState({
            currentItem: item,
            openState: true,
            anchorEl: event.currentTarget,
        })
    }

    handleStateClose = () => {
        this.setState({
            openState: false,
        })
    }

    handleDialogClose = () => {
        this.setState({openDialog: false});
    }

    handleDialogSave = (event) => {
        event.preventDefault()
        if (stock.changeState(this.state.currentItem, 3, this.refs.summary.getValue())) {
            this.setState({
                openDialog: false,
                data: stock.list(),
            })
        } else {
            alert('fail')
        }
    }

    handleMenuItemTap = (event, menuItem)=> {
        event.preventDefault()
        if (menuItem.key === '3') { // 已完成状态
            this.setState({
                openDialog: true,
                openState: false,
            })
        } else {
            if (stock.changeState(this.state.currentItem, menuItem.key)) {
                this.setState({
                    openState: false,
                    data: stock.list(),
                })
            } else {
                alert('fail')
            }
        }
    }

    render() {
        const dialogActions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleDialogClose}
            />,
            <FlatButton
                label="保存"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleDialogSave}
            />,
        ];
        return (
            <StickyContainer id='StockList'>
                <Sticky style={{zIndex:9999}}>
                    <AppBar
                        titleStyle={{fontSize:20}}
                        title="股票操盘"
                        iconElementLeft={<IconButton style={{padding:7}} iconStyle={{width:36,height:36}} onTouchTap={()=>{ history.go(-1)}}><NavigationBefore /></IconButton>}
                        iconElementRight={<IconButton style={{padding:6}} iconStyle={{width:36,height:36}} href='#/stock/add'><ContentAdd /></IconButton>}
                    />
                </Sticky>
                <InfiniteScroll pageStart={0} hasMore={false} loader={<Loading/>}>
                    {this.state.data.map((item)=> {
                        return (
                            <Card style={{position:'relative'}} zDepth={0} key={item.id} className="pager"
                                  initiallyExpanded={false}>
                                <CardHeader
                                    style={{padding:8}}
                                    title={
                                        <div>{item.name}（{item.code}）
                                        <FlatButton label={StockStateEnum[item.state]} secondary={true} onTouchTap={e=>this.handleStateOpen(e,item)}/>
                                        </div>
                                    }
                                    showExpandableButton={true}
                                />
                                <Divider/>
                                <CardText expandable={true}>
                                    <div className='item'>选股理由：
                                        <pre>{item.reason}</pre>
                                    </div>
                                    {item.state == 2 ?
                                        <div className='item'>持股数量：<span>{item.amount}</span></div> : ''}
                                    {item.state == 3 ?
                                        <div className='item'>总盈亏：<span>{item.income}</span></div> : ''}
                                    {item.state == 3 ? <div className='item'>总结：
                                        <pre>{item.summary}</pre>
                                    </div> : ''}
                                    <div className='item'>近期操盘：</div>
                                    {_.sortBy(item.records,'date').reverse().slice(0, 3).map((record)=> {
                                        return (
                                            <div className='item'
                                                 key={_.uniqueId('dom_')}>
                                                {utils.dateFormat(record.date)}（{record.type === 1 ? StockRecordTypeEnum[record.type] : `${StockRecordTypeEnum[record.type]} - ${record.amount}`}）
                                                <pre>{record.remark}</pre>
                                            </div>
                                        )
                                    })}
                                </CardText>
                                <Divider/>
                                <CardActions style={{textAlign:'right'}}>
                                    <FlatButton label='操盘' href={`#/stock/operation/${item.id}`} secondary={true}/>
                                    <FlatButton label='更多' href={`#/stock/detail/${item.id}`} secondary={true}/>
                                </CardActions>
                            </Card>
                        )
                    })}
                </InfiniteScroll>
                <Popover
                    open={this.state.openState}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleStateClose}
                >
                    {this.state.currentItem &&
                    <Menu onItemTouchTap={this.handleMenuItemTap}>
                        {_.map(StockStateEnum, (value, key)=> (this.state.currentItem.state != key ?
                            <MenuItem key={key} value={key} primaryText={value}/> : ''))}
                    </Menu>
                    }
                </Popover>
                <Dialog
                    title='总结'
                    actions={dialogActions}
                    modal={false}
                    open={this.state.openDialog}
                    onRequestClose={this.handleDialogClose}
                >
                    <TextField ref='summary' name='summary' multiLine={true} hintText='总结'
                               defaultValue={this.state.currentItem && this.state.currentItem.summary}/>
                </Dialog>
            </StickyContainer>
        )
    }
}
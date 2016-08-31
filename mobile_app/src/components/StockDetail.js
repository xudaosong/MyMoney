import React,{Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import NavigationBefore from 'material-ui/svg-icons/image/navigate-before'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import ActionAssignment from 'material-ui/svg-icons/action/assignment'
import ActionDone from 'material-ui/svg-icons/action/done'
import SocialNotifications from 'material-ui/svg-icons/social/notifications'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Popover from 'material-ui/Popover'
import {StickyContainer, Sticky} from 'react-sticky'
import _ from 'underscore'
import utils from '../common/utils'
import Loading from '../common/Loading'
import stock from '../common/stock'
import {StockStateEnum,StockRecordTypeEnum} from '../common/enum'

export default class StockDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentRecord: null,
            openState: false,
            openSummaryDialog: false,
            openCommentDialog: false,
            item: stock.get(this.props.params.id)
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

    handleDialogSave = (event) => {
        event.preventDefault()
        if (this.state.openSummaryDialog) {
            if (stock.changeState(this.state.currentItem, 3, {
                    summary: this.refs.summary.getValue(),
                    income: this.refs.income.getValue()
                })) {
                this.setState({
                    openSummaryDialog: false,
                    data: stock.list(),
                })
            }
        } else if (this.state.openCommentDialog) {
            if (stock.recordComment(this.state.currentRecord, {
                    comment: this.refs.comment.getValue(),
                    result: this.refs.result.state.selected
                })) {
                this.setState({
                    openCommentDialog: false,
                    data: stock.list(),
                })
            }
        }
    }

    handleDialogClose = () => {
        this.setState({openSummaryDialog: false, openCommentDialog: false});
    }

    handleShowCommentDialog = (record)=> {
        console.log(record)
        this.setState({
            openCommentDialog: true,
            currentRecord: record,
        })
    }

    handleMenuItemTap = (event, menuItem)=> {
        event.preventDefault()
        if (menuItem.key === '3') { // 已完成状态
            this.setState({
                openSummaryDialog: true,
                openState: false,
            })
        } else {
            if (stock.changeState(this.state.currentItem, menuItem.key)) {
                this.setState({
                    openState: false,
                    data: stock.list(),
                })
            }
        }
    }

    render() {
        let item = this.state.item
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
                        title={`${this.state.item.name}（${this.state.item.code}）操盘详情`}
                        iconElementLeft={<IconButton style={{padding:0}} iconStyle={{width:36,height:36}} onTouchTap={()=>{ history.go(-1)}}><NavigationBefore /></IconButton>}
                    />
                </Sticky>
                <Card key={item.id} zDepth={0} className='pager' initiallyExpanded={true}>
                    <CardHeader
                        style={{padding:8}}
                        title={
                            <div>
                                {item.name}（{item.code}）
                                <FlatButton label={StockStateEnum[item.state]} secondary={true} onTouchTap={e=>this.handleStateOpen(e,item)}/>
                            </div>
                        }
                        showExpandableButton={true}
                    />
                    <Divider/>
                    <CardText expandable={true}>
                        {item.technology && item.technology.length > 0 ? (<div className='item'>符合技术：
                            <pre>{item.technology}</pre>
                        </div>) : ''}
                        {item.reason && item.reason.length > 0 ? (<div className='item'>其它理由：
                            <pre>{item.reason}</pre>
                        </div>) : ''}
                        {item.state == 1 ?
                            <div className='item'>持股数量：<span>{item.amount}</span></div> : ''}
                        {item.state == 3 ?
                            <div className='item'>总盈亏：<span>{item.income}</span></div> : ''}
                        {item.state == 3 ?
                            <div className='item'>总结：
                                <pre>{item.summary}</pre>
                            </div> : ''}
                        <div className='item'>近期操盘：</div>
                        {_.sortBy(item.records, 'date').reverse().map((record)=> {
                            return (
                                <div className='item'
                                     key={_.uniqueId('dom_')}>
                                    <div style={{position:'relative'}}>
                                        {utils.dateFormat(record.date)}（{record.type === 1 ? StockRecordTypeEnum[record.type] : `${StockRecordTypeEnum[record.type]} - ${record.amount}`}）
                                        {(!record.result || record.result == 1) && <ActionAssignment
                                            style={{width:18,height:18,position:'absolute',top:2,color:'#4CAF50'}}
                                            onTouchTap={()=>this.handleShowCommentDialog(record)}/>}
                                        {record.result == 2 && <ActionDone
                                            style={{width:18,height:18,position:'absolute',top:2,color:'#4CAF50'}}
                                            onTouchTap={()=>this.handleShowCommentDialog(record)}/>}
                                        {record.result == 3 && <NavigationClose
                                            style={{width:18,height:18,position:'absolute',top:2,color:'#da301c'}}
                                            onTouchTap={()=>this.handleShowCommentDialog(record)}/>}
                                        {record.result == 4 && <SocialNotifications
                                            style={{width:18,height:18,position:'absolute',top:2,color:'#da301c'}}
                                            onTouchTap={()=>this.handleShowCommentDialog(record)}/>}

                                    </div>
                                    {record.technology && record.technology.length > 0 ? (
                                        <pre>{record.technology}</pre>) : ''}
                                    {record.remark && record.remark.length > 0 ? (<pre>{record.remark}</pre>) : ''}
                                    {record.comment && record.comment.length > 0 ? (<pre
                                        style={{borderTop:'1px dashed #999',paddingTop:5}}>{record.commentDate && utils.dateFormat(record.commentDate)}：{record.comment}</pre>) : ''}
                                </div>
                            )
                        })}
                    </CardText>
                    <Divider/>
                    <CardActions style={{textAlign:'right'}}>
                        <FlatButton label='操盘' href={`#/stock/operation/${item.id}`} secondary={true}/>
                    </CardActions>
                </Card>
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
                    titleStyle={{paddingBottom:0}}
                    title='点评'
                    actions={dialogActions}
                    modal={false}
                    open={this.state.openCommentDialog}
                    onRequestClose={this.handleDialogClose}
                >
                    <TextField style={{width:'96%'}} ref='comment' name='comment' multiLine={true} hintText='点评' floatingLabelText='点评'
                               defaultValue={this.state.currentRecord && this.state.currentRecord.comment}/>
                    <RadioButtonGroup style={{marginTop:10,display:'flex',flexWrap:'wrap'}} ref='result' name='result'
                                      defaultSelected={(!!this.state.currentRecord && !!this.state.currentRecord.result) ? this.state.currentRecord.result:1}>
                        <RadioButton
                            style={{marginBottom: 16,width:'50%'}}
                            value={1}
                            label="待定"
                        />
                        <RadioButton
                            style={{marginBottom: 16,width:'50%'}}
                            value={4}
                            label="重要"
                        />
                        <RadioButton
                            style={{marginBottom: 16,width:'50%'}}
                            value={2}
                            label="正确"
                        />
                        <RadioButton
                            style={{marginBottom: 16,width:'50%'}}
                            value={3}
                            label="错误"
                        />
                    </RadioButtonGroup>
                </Dialog>
            </StickyContainer>
        )
    }
}
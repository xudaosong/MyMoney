import React,{Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import NavigationBefore from 'material-ui/svg-icons/image/navigate-before'
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
            item: stock.get(this.props.params.id)
        }
    }

    render() {
        let item = this.state.item
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
                        title={`${item.name}（${item.code}）${StockStateEnum[item.state]}`}
                        showExpandableButton={true}
                    />
                    <Divider/>
                    <CardText expandable={true}>
                        <div className='item'>选股理由：<span>{item.reason}</span></div>
                        {item.state == 2 ?
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
                                    {utils.dateFormat(record.date)}（{record.type === 1 ? StockRecordTypeEnum[record.type] : `${StockRecordTypeEnum[record.type]} - ${record.amount}`}）
                                    <pre>{record.remark}</pre>
                                </div>
                            )
                        })}
                    </CardText>
                    <Divider/>
                    <CardActions style={{textAlign:'right'}}>
                        <FlatButton label='操盘' href={`#/stock/operation/${item.id}`} secondary={true}/>
                    </CardActions>
                </Card>
            </StickyContainer>
        )
    }
}
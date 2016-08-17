import React,{Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
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
            data: stock.list()
        }
    }

    render() {
        return (
            <StickyContainer id='StockList'>
                <Sticky style={{zIndex:9999}}>
                    <AppBar
                        titleStyle={{fontSize:20}}
                        title="我的钱"
                        showMenuIconButton={false}
                        iconElementRight={<IconButton style={{padding:6}} iconStyle={{width:36,height:36}} href='#/stock/add'><ContentAdd /></IconButton>}
                    />
                </Sticky>
                <InfiniteScroll pageStart={0} hasMore={false} loader={<Loading/>}>
                    {this.state.data.map((item)=> {
                        return (
                            <Card key={item.id} zDepth={0} className="pager" initiallyExpanded={true}>
                                <CardHeader
                                    title={`${item.name}（${item.code}）${StockStateEnum[item.state]}`}
                                    showExpandableButton={true}
                                />
                                <Divider/>
                                <CardText expandable={true}>
                                    <div className='item'>选股理由：<span>{item.reason}</span></div>
                                    <div className='item'>持股数量：<span>{item.amount}</span>总盈亏：<span>{item.income}</span>
                                    </div>
                                    <div className='item'>总结：<span>{item.summary}</span></div>
                                    <div className='item'>近期操盘：</div>
                                    {item.records.slice(0, 3).map((record)=> {
                                        return (
                                            <div className='item'
                                                 key={_.uniqueId('dom')}>
                                                {record.date}（{record.type === 1 ? StockRecordTypeEnum[record.type] : `${StockRecordTypeEnum[record.type]} - ${record.amount}`}）
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
            </StickyContainer>
        )
    }
}
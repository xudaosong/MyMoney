import React,{Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import InfiniteScroll from 'react-infinite-scroller'
import utils from '../common/utils'
import Loading from '../common/Loading'
import AppBar from 'material-ui/AppBar'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'

export default class StockList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id='StockList'>
                <AppBar
                    title="我的钱"
                    showMenuIconButton={false}
                />
                <InfiniteScroll pageStart={0} hasMore={false} loader={<Loading/>}>
                    <Card zDepth={0} className="pager" initiallyExpanded={true}>
                        <CardHeader
                            title='闽发铝业（002578）操作中'
                            showExpandableButton={true}
                        />
                        <Divider/>
                        <CardText expandable={true}>
                            <div className='item'>选股理由：<span>要要要要淡为为虽烛烛要为欠中欠欠斧人欠我我</span></div>
                            <div className='item'>持股数量：<span>10000</span>总盈亏：<span>5000</span></div>
                            <div className='item'>总结：<span>要要要要淡为为虽烛烛要为欠中欠欠斧人欠我我</span></div>
                            <div className='item'>近期操盘：</div>
                            <div className='item'>2016-8-12 13:20（看盘）：<span>我为人人我人国人为人中人为保人为人中为为为为</span></div>
                            <div className='item'>2016-8-12 13:20（看盘）：<span>我为人人我人国人为人中人为保人为人中为为为为</span></div>
                            <div className='item'>2016-8-12 13:20（看盘）：<span>我为人人我人国人为人中人为保人为人中为为为为</span></div>
                            <div className='item'>2016-8-12 13:20（看盘）：<span>我为人人我人国人为人中人为保人为人中为为为为</span></div>
                        </CardText>
                        <Divider/>
                        <CardActions style={{textAlign:'right'}}>
                            <FlatButton label='操盘' href='#/stock/operation' secondary={true}/>
                            <FlatButton label='更多' secondary={true}/>
                        </CardActions>
                    </Card>
                </InfiniteScroll>
            </div>
        )
    }
}

const styles = {
    tab: {
        fontSize: 16
    }
}
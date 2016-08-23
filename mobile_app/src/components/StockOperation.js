import React,{Component} from 'react'
import AppBar from 'material-ui/AppBar'
import {Tabs, Tab} from 'material-ui/Tabs'
import IconButton from 'material-ui/IconButton'
import NavigationBefore from 'material-ui/svg-icons/image/navigate-before'

import StockOperationWatch from './StockOperationWatch'
import StockOperationBuy from './StockOperationBuy'
import StockOperationSale from './StockOperationSale'

import stock from '../common/stock'
import {StockRecordTypeEnum} from '../common/enum'

export default class StockOperation extends Component {
    constructor(props) {
        super(props)
        this.state = {
          item:stock.get(this.props.params.id)
        }
    }

    render() {
        return (
            <div id='StockOperation'>
                <AppBar
                    titleStyle={{fontSize:20}}
                    title={`${this.state.item.name}（${this.state.item.code}）操盘`}
                    iconElementLeft={<IconButton style={{padding:0}} iconStyle={{width:36,height:36}} onTouchTap={()=>{ history.go(-1)}}><NavigationBefore /></IconButton>}
                />
                <Tabs>
                    <Tab label='观察' style={styles.tab}>
                        <StockOperationWatch {...this.props}/>
                    </Tab>
                    <Tab label='买入' style={styles.tab}>
                        <StockOperationBuy {...this.props}/>
                    </Tab>
                    <Tab label='卖出' style={styles.tab}>
                        <StockOperationSale {...this.props}/>
                    </Tab>
                </Tabs>

            </div>
        )
    }
}

const styles = {
    tab: {
        fontSize: 16
    },
    input: {
        width: '96%',
    },
}


/*
 <tr>
 <th className='required'>股票名称</th>
 <td>
 <FormsyText style={styles.input}
 name='name' hintText='股票名称' disabled={true}/>
 </td>
 </tr>
 <tr>
 <th className='required'>股票代码</th>
 <td>
 <FormsyText style={styles.input}
 name='code' hintText='股票代码' disabled={true}/>
 </td>
 </tr>*/

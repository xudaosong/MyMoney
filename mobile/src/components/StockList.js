import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    Image,
    View,
    ListView,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator,
    RefreshControl,
    AsyncStorage,
    WebView,
} from 'react-native'

import Loading from './common/Loading'
import Toolbar from './common/Toolbar'
 
export default class StockList extends Component {
    constructor(props) {
        super(props)
        const data=[{
            name:'金明精机',
            code:'300218',
            state:'观察中',
            reason:'连续红量，涨停过顶，量价配合，位置低，位置低，位置低，位置低，位置低',
            operations:[
                {
                    date: '2016-08-06 12:35',
                    type: '买入',
                    amount: 10000,
                    technology:['龙出红海','量价配合','不肯去观音','小市值'],
                    remark:'突破20天线，明天看看是不是能站稳，整体上量价配合'
                },{
                    date: '2016-08-07 12:35',
                    type: '看盘',
                    amount:0,
                    technology:[],
                    remark:'突破20天线，明天看看是不是能站稳，整体上量价配合'
                },{
                    date: '2016-08-08 12:35',
                    type: '卖出',
                    amount: 5000,
                    technology:['短线涨幅较大','破20天线'],
                    remark:'突破20天线，明天看看是不是能站稳，整体上量价配合'
                }
            ]
        },{
            name:'闽发铝业',
            code:'002578',
            state:'观察中',
            reason:'连续红量，涨停过顶，量价配合，位置低，位置低，位置低，位置低，位置低',
            operations:[
                {
                    date: '2016-08-06 12:31',
                    type: '买入',
                    amount: 10000,
                    technology:['龙出红海','量价配合','不肯去观音','小市值'],
                    remark:'突破20天线，明天看看是不是能站稳，整体上量价配合'
                },{
                    date: '2016-08-06 12:32',
                    type: '看盘',
                    amount:0,
                    technology:[],
                    remark:'突破20天线，明天看看是不是能站稳，整体上量价配合'
                },{
                    date: '2016-08-06 12:33',
                    type: '卖出',
                    amount: 5000,
                    technology:['短线涨幅较大','破20天线'],
                    remark:'突破20天线，明天看看是不是能站稳，整体上量价配合'
                }
            ]
        },{
            name:'闽发铝业',
            code:'002578',
            state:'观察中',
            reason:'连续红量，涨停过顶，量价配合，位置低，位置低，位置低，位置低，位置低',
            operations:[
                {
                    date: '2016-08-06 12:31',
                    type: '买入',
                    amount: 10000,
                    technology:['龙出红海','量价配合','不肯去观音','小市值'],
                    remark:'突破20天线，明天看看是不是能站稳，整体上量价配合'
                },{
                    date: '2016-08-06 12:32',
                    type: '看盘',
                    amount:0,
                    technology:[],
                    remark:'突破20天线，明天看看是不是能站稳，整体上量价配合'
                },{
                    date: '2016-08-06 12:33',
                    type: '卖出',
                    amount: 5000,
                    technology:['短线涨幅较大','破20天线'],
                    remark:'突破20天线，明天看看是不是能站稳，整体上量价配合'
                }
            ]
        }]
        this.state = {
            isLoaded: true,
            text:'',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=>row1 !== row2
            }).cloneWithRows(data)
        }
        // this.setState({dataSource:this.state.dataSource.cloneWithRows(['row1','row2'])})
        
    }
    handleSave=()=>{
        AsyncStorage.setItem('@MySuperStore:key',JSON.stringify({
            name:'asdf',
            date:new Date()
        }));
        AsyncStorage.getItem('@MySuperStore:key',(error,result)=>{
            alert(result)
        })
    }
    renderItem(item){
        return (
          <View style={{flexDirection:'column',borderWidth:1,borderColor:'#ccc',marginTop:10,marginLeft:10,marginRight:10}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <Text>名称：</Text>
                        <Text>{item.name}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <Text>代码：</Text>
                        <Text>{item.code}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <Text>状态：</Text>
                        <Text>{item.state}</Text>
                    </View>
                </View>
                <View>
                    <Text>选股理由：</Text>
                    <Text>{item.reason}</Text>
                </View>
                <View>
                    <Text>近期操盘：</Text>
                    {item.operations.map((operation)=>{
                        return (
                            <View key={operation.date}>
                            <Text>{operation.date}-{operation.type}-{operation.amount}</Text>
                            <Text>{operation.technology.join('、')}</Text>
                            <Text>{operation.remark}</Text>
                            </View>
                        )
                    })}
                </View>
                 <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1}} onPress={this.handleSave}>
                        <Text style={{textAlign:'center'}}>操盘</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={this.handleSave}>
                        <Text style={{textAlign:'center'}}>状态</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1}} onPress={this.handleSave}>
                        <Text style={{textAlign:'center'}}>更多</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    render() {
        const {navigator} = this.props;
        return (
            <View style={{ flexDirection: 'column',flex:1,backgroundColor:'#fff',}}>
                <Toolbar title="股票" navigator={navigator}/>
                <ListView
                style={{marginBottom:10}}
                  dataSource={this.state.dataSource}
                  renderRow={this.renderItem}
                    initialListSize={8}
                />
            </View>

        )
    }
}
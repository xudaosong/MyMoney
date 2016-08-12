import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    RefreshControl,
    ScrollView,
    Text,
    View,
    WebView,
    Dimensions
} from 'react-native'

import Loading from '../components/common/Loading'
import Toolbar from '../components/common/Toolbar'
import TabBar from '../components/common/TabBar'
import StockList from '../components/StockList'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import FriendCircle from './FriendCircle'
import Vitasphere from './Vitasphere'
import {statusBarShow} from '../actions/statusBar'

import WebViewBridge from 'react-native-webview-bridge'

const tabs = [{
    name:'交友圈',
    icon: require('../img/group.png'),
    iconActive:  require('../img/group-active.png')
},{
    name:'生活圈',
    icon:  require('../img/home.png'),
    iconActive:  require('../img/home-active.png')
},{
    name:'上进',
    icon:  require('../img/learn.png'),
    iconActive:  require('../img/learn-active.png')
},{
    name:'娱乐',
    icon:  require('../img/play.png'),
    iconActive:  require('../img/play-active.png')
},{
    name:'我',
    icon:  require('../img/personal.png'),
    iconActive:  require('../img/personal-active.png')
}];
const injectScript = `
  (function () {
                    if (WebViewBridge) {

                      WebViewBridge.onMessage = function (message) {
                        if (message === "hello from react-native") {
                          WebViewBridge.send("got the message inside webview");
                        }
                      };

                      WebViewBridge.send("hello from webview");
                    }
                  }());
`
export default class Main extends Component {
    componentDidMount(){
        const {statusBar,dispatch} = this.props;
        if(!statusBar){
            dispatch(statusBarShow());
        }
    }
    onBridgeMessage=(message)=>{
        const { webviewbridge } = this.refs;
        switch (message) {
            case "hello from webview":
                webviewbridge.sendToBridge("hello from react-native");
                break;
            case "got the message inside webview":
                console.log("we have got a message from webview! yeah");
                break;
        }
    }
    render() {
        const {navigator} = this.props;
        let {height, width} = Dimensions.get('window')
        return (
            <View style={{flex:1}}>
                <Toolbar title="萌萌"/>
                <ScrollableTabView
                    initialPage={3}
                    tabBarPosition="bottom"
                    tabBarBackgroundColor="#f8f8f8"
                    renderTabBar={() => <TabBar/>}>
                    <FriendCircle tabLabel={tabs[0]}>
                    </FriendCircle>
                    <Vitasphere tabLabel={tabs[1]} navigator={navigator}>
                    </Vitasphere>
                    <StockList tabLabel={tabs[2]} navigator={navigator}>
                    </StockList>
                    <WebViewBridge tabLabel={tabs[3]}
                                   ref="webviewbridge"
                                   style={{width:width}}
                                   source={{uri: "http://www.baidu.com/"}}>
                    </WebViewBridge>
                    <WebView tabLabel={tabs[4]}
                             style={{width:width}}
                             source={{uri: "http://www.baidu.com/"}}>
                    </WebView>
                </ScrollableTabView>
            </View>
        );
    }
    /*<View style={{flex:1}}></View>
     <TabBar tabs={tabs}/>*/
}

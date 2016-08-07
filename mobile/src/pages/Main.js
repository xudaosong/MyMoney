import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    RefreshControl,
    ScrollView,
    Text,
    View,
} from 'react-native'

import Loading from '../components/common/Loading';
import Toolbar from '../components/common/Toolbar';
import TabBar from '../components/common/TabBar';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FriendCircle from './FriendCircle';
import Vitasphere from './Vitasphere';
import {statusBarShow} from '../actions/statusBar';

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

export default class Main extends Component {
    componentDidMount(){
        const {statusBar,dispatch} = this.props;
        if(!statusBar){
            dispatch(statusBarShow());
        }
    }
    render() {
        const {navigator} = this.props;
        return (
            <View style={{flex:1}}>
                <Toolbar title="萌萌"/>
                <ScrollableTabView
                    initialPage={1}
                    tabBarPosition="bottom"
                    tabBarBackgroundColor="#f8f8f8"
                    renderTabBar={() => <TabBar/>}>
                    <FriendCircle tabLabel={tabs[0]}>
                    </FriendCircle>
                    <Vitasphere tabLabel={tabs[1]} navigator={navigator}>
                    </Vitasphere>
                    <View tabLabel={tabs[2]} style={{ flex: 1, backgroundColor: '#EEFF33', }}>
                    </View>
                    <View tabLabel={tabs[3]} style={{ flex: 1, backgroundColor: '#FF00FF', }}>
                    </View>
                    <View tabLabel={tabs[4]} style={{ flex: 1, backgroundColor: '#0000FF', }}>
                    </View>
                </ScrollableTabView>
            </View>
        );
    }
    /*<View style={{flex:1}}></View>
     <TabBar tabs={tabs}/>*/
}

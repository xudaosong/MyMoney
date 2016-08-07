import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    Navigator,
    StatusBar,
    BackAndroid,
    ToastAndroid,
    View,
} from 'react-native'

import {connect} from 'react-redux'
import {goBack} from '../utils/CommonUtils';
//import LaunchComponent from '../pages/Launch';
import LaunchComponent from '../pages/Main';
//import LaunchComponent from '../pages/MenDian';
// import LaunchComponent from '../components/StockList'

//import codePush from 'react-native-code-push'

let _navigator;

class App extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.renderScene = this.renderScene.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return goBack(_navigator);
        });
    }

    //componentDidMount(){
    //    codePush.checkForUpdate()
    //        .then( (update) =>{
    //            if( !update ){
    //                ToastAndroid.show("app是最新版了", ToastAndroid.LONG);
    //            }else {
    //                ToastAndroid.show("app有新版本更新", ToastAndroid.LONG);
    //                codePush.sync()
    //            }
    //        });
    //}

    configureScene(route, routeStack) {
        //FadeAndroid
        //FloatFromBottom
        //FloatFromBottomAndroid
        //FloatFromLeft
        //FloatFromRight
        //HorizontalSwipeJump
        //HorizontalSwipeJumpFromRight
        //PushFromRight
        //VerticalDownSwipeJump
        //VerticalUpSwipeJump
        return Navigator.SceneConfigs.PushFromRight;
    }

    renderScene(route, navigator) {
        let Component = route.component;
        _navigator = navigator;
        return (
            <Component navigator={navigator} route={route} {...this.props}/>
        );
    }

    render() {
        const {statusBar} = this.props;
        //console.warn('App render', this.props);
        return (
            <View style={{flex:1}}>
                <StatusBar hidden={!statusBar} backgroundColor="#fe566c" barStyle="default"/>
                <Navigator
                    ref='navigator'
                    style={styles.navigator}
                    renderScene={this.renderScene}
                    configureScene={this.configureScene}
                    initialRoute={{
                        component:LaunchComponent,
                        name:'launch'
                    }}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
})
function mapStateToProps(state) {
    //return state;
    //console.warn(state);
    const {statusBar,getJokeList} = state;
    return {
        statusBar,
        getJokeList
    }
}
export default connect(mapStateToProps)(App)

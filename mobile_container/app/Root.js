import React,{Component} from 'react'
import {
    View,
    StatusBar,
    WebView,
    Dimensions
} from 'react-native'

export default class Root extends Component {
    render() {
        let {width,height} = Dimensions.get('window')
        return (
            <View style={{width:width,height:height-StatusBar.currentHeight}}>
                <StatusBar backgroundColor='#da301c' barStyle='light-content'/>
                <WebView
                    domStorageEnabled={true}
                    source={{uri: 'file:///android_asset/index.html'}}>
                </WebView>
            </View>
        )
    }
}
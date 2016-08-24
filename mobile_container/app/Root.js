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
            <View>
                <StatusBar backgroundColor='#da301c' barStyle='light-content'/>
                <WebView style={{width:width,height:height}}
                         domStorageEnabled={true}
                         source={{uri: 'file:///android_asset/index.html'}}>
                </WebView>
            </View>
        )
    }
}
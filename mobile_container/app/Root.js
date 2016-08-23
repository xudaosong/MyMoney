import React,{Component} from 'react'
import {
    WebView,
    Dimensions
} from 'react-native'

export default class Root extends Component {
    render() {
        let {width} = Dimensions.get('window')
        return (
            <WebView style={{width:width}}
                     domStorageEnabled={true}
                     source={{uri: 'file:///android_asset/index.html'}}>
            </WebView>
        )
    }
}
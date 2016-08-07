'use strict';
import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    Image,
    ScrollView,
    View,
    Dimensions,
} from 'react-native'

let {width} = Dimensions.get('window')
export default class FriendCircle extends Component {
    render() {
        return (
            <ScrollView style={styles.FriendCircle}>
                <Image style={styles.image} resizeMode="stretch" source={require('../img/huati.png')}></Image>
                <Image style={styles.image} resizeMode="stretch" source={require('../img/weibo.png')}></Image>
                <Image style={[styles.image,{marginBottom:10}]} resizeMode="stretch" source={require('../img/liaotian.png')}></Image>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    FriendCircle: {
        flex: 1,
        paddingLeft:10,
        paddingRight:10,
    },
    image:{
        width:width-20,
        height:width*0.465596,
        marginTop:10,

    }
});
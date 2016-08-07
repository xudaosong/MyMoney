'use strict';
import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    Image,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
} from 'react-native'

import MenDian from './MenDian';
import Shopping from '../../components/root';
import ShoppingAction from '../../components/animate';
import ModalBase from '../components/common/ModalBase';
import StockList from '../components/StockList'
let {width} = Dimensions.get('window');
const list1 = [
    {
        name: '商城',
        isActive: false,
        image: require('../img/shang-cheng.png'),
        imageActive: require('../img/shang-cheng-active.png'),
        route: {
            component: Shopping,
            name: 'Shopping'
        }
    }, {
        name: '商家活动',
        isActive: false,
        image: require('../img/shang-jia-huo-dong.png'),
        imageActive: require('../img/shang-jia-huo-dong-active.png'),
        route: {
            component: ShoppingAction,
            name: 'ShoppingAction'
        }
    }, {
        name: '门店',
        isActive: false,
        image: require('../img/men-dian.png'),
        imageActive: require('../img/men-dian-active.png'),
        route: {
            component: MenDian,
            name: 'MenDian'
        }
    }
];
const list2 = [
    {
        name: '小蜜蜂兼职',
        isActive: false,
        image: require('../img/xiao-mi-feng-jian-zhi.png'),
        imageActive: require('../img/xiao-mi-feng-jian-zhi-active.png'),
        route: {
            component: ModalBase,
            name: 'ModalBase'
        }
    }, {
        name: '电信服务',
        isActive: false,
        image: require('../img/dian-xin-fu-wu.png'),
        imageActive: require('../img/dian-xin-fu-wu-active.png'),
        route: {
            component: StockList,
            name: 'StockList',
        }
    }, {
        name: '更多WIFI',
        isActive: false,
        image: require('../img/geng-duo-wifi.png'),
        imageActive: require('../img/geng-duo-wifi-active.png')
    }
];
export default class Vitasphere extends Component {
    constructor(props) {
        super(props);
        this.isActive = false;
        //this.onPress = this.onPress.bind(this);
    }

    onPress(item) {
        if (!item.route)
            return;
        const {navigator} = this.props;
        //InteractionManager.runAfterInteractions(()=> {
        navigator.push(item.route);
        //});
    }

    renderItem(item) {
        return (
            <View key={item.name} style={styles.grid_item}>
                <TouchableOpacity style={styles.grid_item_content} onPress={this.onPress.bind(this,item)}>
                    <Image source={this.isActive ? item.imageActive : item.image}/>
                    <Text style={styles.item_text}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={[styles.banner,{width:width,height:width*0.518348623853211}]}
                    source={require('../img/dian-xin-fu-wu-banner.png')}
                />
                <View style={[styles.grid_row,{borderBottomWidth:.5,borderColor:'#dbdbdb'}]}>
                    {list1.map((tab, i) => this.renderItem(tab, i))}
                </View>
                <View style={styles.grid_row}>
                    {list2.map((tab, i) => this.renderItem(tab, i))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    banner: {},
    grid_row: {
        flex: 1,
        flexDirection: 'row'
    },
    grid_item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .5,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderColor: '#dbdbdb',

    },
    grid_item_content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item_text: {
        margin: 10,
        fontSize: 16,
        color: '#aaa',
    },
});
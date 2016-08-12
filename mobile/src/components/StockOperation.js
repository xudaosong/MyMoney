import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native'
import Toolbar from './common/Toolbar'
import ScrollableTabView from 'react-native-scrollable-tab-view'

export default class StockOperation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <Toolbar title="事件"/>
                <ScrollableTabView style={{}}>
                    <View tabLabel='事件上报' style={{flex:1,backgroundColor:'#dcdcdc'}}>
                        <View
                            style={styles.table}>
                            <View style={styles.tr}>
                                <Text style={styles.th}>
                                    时间
                                </Text>
                                <TextInput style={styles.td} />
                            </View>
                            <View style={styles.tr}>
                                <Text style={styles.th}>备注</Text>
                                <TextInput style={styles.td} multiline={true}/>
                            </View>
                            <View style={styles.tr}>
                                <Text style={styles.th}>时间</Text>
                                <TextInput style={styles.td}/>
                            </View>
                        </View>
                    </View>
                    <View tabLabel='事件核查' style={{ flex: 1, backgroundColor: '#FF00FF', }}>
                    </View>
                    <View tabLabel='事件处置' style={{ flex: 1, backgroundColor: '#0000FF', }}>
                    </View>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    table:{
        marginTop:10,
        paddingLeft:10,
        paddingRight:10,
        flexDirection:'column',
        backgroundColor:'#fff'
    },
    tr: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    th: {
        width: 60,
        color: '#333'
    },
    td: {
        flex: 1
    }
})
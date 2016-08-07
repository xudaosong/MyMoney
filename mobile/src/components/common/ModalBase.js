'use strict';
import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    Modal,
    Switch,
    Text,
    TouchableHighlight,
    View,
} from 'react-native'

export default class ModalBase extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            animated: 'slide',
            modalVisible: false,
            transparent: false,
        };
    }

    _setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    _toggleAnimated() {
        this.setState({animated: this.state.animated === 'none'?'slide':'none'})
    }

    render() {

        return (
            <View>

                <Modal animationType={this.state.animated} transparent={this.state.transparent}
                       visible={this.state.modalVisible} onRequestClose={()=>{this._setModalVisible.bind(this,false)}}>

                </Modal>
                <View>
                    <Text>{this.state.animated!=='none' ? 'with animate' : 'without animate'}</Text>
                    <Switch value={this.state.animated!=='none'} onValueChange={this._toggleAnimated.bind(this)}/>
                </View>
                <TouchableHighlight onPress={this._setModalVisible.bind(this, true)}>
                    <Text>Present</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'rgba(0,0,0,.5)'
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor:'#fff',
        padding:20,
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 10,
    },
});
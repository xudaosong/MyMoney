//FirstPageComponent.js
import React, {
    Component,
} from 'react'
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native'


import SecondPageComponent from './second';

export default class FirstPageComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 2,
            user: null,
        }
    }


    _pressButton() {
        let _this = this;
        const { navigator } = this.props;
        if(navigator) {
            navigator.push({
                name: 'SecondPageComponent',
                component: SecondPageComponent,
                params: {
                    id: this.state.id,
                    //从SecondPageComponent获取user
                    getUser: function(user) {
                        _this.setState({
                            user: user
                        })
                    }
                }
            });
        }
    }

    render() {
        if( this.state.user ) {
            return(
                <View>
                    <Text>用户信息: { JSON.stringify(this.state.user) }</Text>
                </View>
            );
        }else {
            return(
                <View>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
                        <Text>查询ID为{ this.state.id }的用户信息</Text>
                    </TouchableOpacity>
                </View>
            );
        }

    }
}
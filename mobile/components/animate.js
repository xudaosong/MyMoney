'use strict';
import React, {
    Component,
} from 'react'
import {
    InteractionManager,
    View,
    Text,
} from 'react-native'

export default class ExpensiveScene extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {renderPlaceholderOnly: true};
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.setState({renderPlaceholderOnly: false});
        });
    }

    render() {
        if (this.state.renderPlaceholderOnly) {
            return this._renderPlaceholderView();
        }

        return (
            <View>
                <Text>Your full view goes here! v3.0.0</Text>
            </View>
        );
    }
    _renderPlaceholderView() {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
}
'use strict';
import React, {
    Component,
    PropTypes,
} from 'react'
import {
    StyleSheet,
    ToolbarAndroid
} from 'react-native'

export default class Toolbar extends Component {
    constructor(props) {
        super(props);
        const {navigator} = this.props;
        if(navigator && navigator.getCurrentRoutes().length > 1){
            this.navBackIcon = require('../../img/arrow-left.png')
        }
        this.onIconClicked = this.onIconClicked.bind(this);
        this.onActionSelected = this.onActionSelected.bind(this);
    }

    onActionSelected(position) {
        this.props.onActionSelected();
    }

    onIconClicked() {
        //console.warn(JSON.stringify(this.props));
        if (this.props.onIconClicked) {
            this.props.onIconClicked();
        } else {
            const {navigator} = this.props;
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
            }
        }
    }

    render() {
        return (
            <ToolbarAndroid
                style={styles.toolbar}
                actions={this.props.actions}
                onActionSelected={this.onActionSelected}
                titleColor='#fff'
                title={this.props.title}
                navIcon={this.navBackIcon}
                onIconClicked={this.onIconClicked}
            />
        );
    }
}

const styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#fe566c',
        height: 50
    }
});

Toolbar.propTypes = {
    title: PropTypes.string,
    actions: PropTypes.array,
    navigator: PropTypes.object,
    onActionSelected: PropTypes.func,
    onIconClicked: PropTypes.func,
    navIcon: PropTypes.number,
    customView: PropTypes.object
};

Toolbar.defaultProps = {
    onActionSelected: function () {
    },
    title: '',
    actions: []
}
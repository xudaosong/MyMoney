'use strict';
import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Animated
} from 'react-native'
export default class TabBar extends Component {
    renderTabOption(tab, page) {
        var isTabActive = this.props.activeTab === page;
        //var activeTextColor = this.props.activeTextColor || 'navy';
        //var inactiveTextColor = this.props.inactiveTextColor || 'black';
        return (
            <TouchableOpacity style={[styles.tab]} key={tab.name} onPress={() => this.props.goToPage(page)}>
                <Image source={ isTabActive ? tab.iconActive:tab.icon} />
            </TouchableOpacity>
        );
        /*<Text style={{color: isTabActive ? activeTextColor : inactiveTextColor, fontSize: 16}}>
         {name}
         </Text>*/
    }

    render() {
        //var containerWidth = this.props.containerWidth;
        //var numberOfTabs = this.props.tabs.length;
        ////let tabUnderlineStyle = {
        //    position: 'absolute',
        //    width: containerWidth / numberOfTabs,
        //    height: 2,
        //    backgroundColor: this.props.underlineColor || 'navy',
        //    bottom: 0,
        //};
        //var left = this.props.scrollValue.interpolate({
        //    inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
        //});
        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor || null}]}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
        /*<Animated.View style={[tabUnderlineStyle, {left}]}/>*/
    }
}
let styles = StyleSheet.create({
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabs: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopColor:'#dbdbdb',
    }
});
TabBar.propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    underlineColor: React.PropTypes.string,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string
};
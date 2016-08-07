import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    Dimensions,
    InteractionManager,
    Image
} from 'react-native'

import MainContainer from '../pages/Main';

let {height,width} = Dimensions.get('window');
export default class Launch extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {navigator} = this.props;
        setTimeout(()=>{
            InteractionManager.runAfterInteractions(() => {
               navigator.resetTo({
                   component:MainContainer,
                   name:'Main'
               }) ;
            });
        }, 1000);
    }
    render() {
        return (
            <Image
                style={{flex: 1, width: width, height: height}}
                source={require('../img/launch.png')}
            />
        );
    }
}
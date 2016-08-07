import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    ActivityIndicator,
    Platform,
    Text,
    View,
} from 'react-native'

export default class Loading extends Component {
    render() {
        return (
            <View style={styles.loading}>
                <ActivityIndicator animating={true} color="#fe566c" size='large'/>
                <Text style={styles.loadingText}>数据加载中...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
    }
})
'use strict';
import React, {
    Component,
} from 'react'
import {
    StyleSheet,
    Image,
    View,
    ListView,
    Text,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator,
    RefreshControl,
} from 'react-native'

import {fetchJokeList} from '../actions/joke';
import Toolbar from '../components/common/Toolbar';

let page = 1;
let canLoadMore;
let loadMoreTime = 0;

export default class MenDian extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2)=>row1 !== row2
            })
        };

        this.renderItem = this.renderItem.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.renderSeparator = this.renderSeparator.bind(this);
        this.renderFooter = this.renderFooter.bind(this);

        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);

        canLoadMore = false;
    }

    componentDidMount() {
        const {getJokeList,dispatch} = this.props;
        if (getJokeList.jokeList.length > 0)
            return;
        //setTimeout(function(){
        InteractionManager.runAfterInteractions(()=> {
            dispatch(fetchJokeList(false, true, false));
        });
        //},300);
    }

    onRefresh() {
        const {dispatch} = this.props;
        canLoadMore = false;
        dispatch(fetchJokeList(true, false, false))
    }

    onEndReached() {
        let time = Date.parse(new Date()) / 1000;
        if (canLoadMore && time - loadMoreTime > 1) {
            const {dispatch} = this.props;
            dispatch(fetchJokeList(false, false, true, ++page));
            canLoadMore = false;
            loadMoreTime = Date.parse(new Date()) / 1000;
        };
    }

    onScroll() {
        if (!canLoadMore) {
            canLoadMore = true;
        }
    }

    renderItem(joke) {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.title}>{joke.title}</Text>
                <Text style={styles.content}>{joke.text}</Text>
            </View>
        );
    }

    renderSeparator(sectionID, rowID) {
        const {getJokeList} = this.props;
        if (parseInt(rowID) === getJokeList.jokeList.length - 1) {
            return;
        }
        return (
            <View key={`${sectionID}-${rowID}`} style={styles.separator}/>
        )
    }

    renderFooter() {
        const {getJokeList} = this.props;
        //console.warn('renderFooter', getJokeList);
        if (getJokeList.isLoadMore) {
            return (
                <View style={styles.footerView}>
                    <ActivityIndicator styleAttr='Inverse' color='#3e9ce9'/>
                    <Text style={{textAlign: 'center', fontSize: 16}}>
                        数据加载中……
                    </Text>
                </View>
            );
        }
    }

    renderContent(dataSource) {
        const {getJokeList} = this.props;
        //console.warn('renderContent',getJokeList)
        if (getJokeList.loading) {
            return (
                <View style={styles.loading}>
                    <ActivityIndicator styleAttr='Inverse' color='#3e9ce9'/>
                    <Text style={{textAlign: 'center', fontSize: 16}}>
                        数据加载中……
                    </Text>
                </View>
            );
        } else if (getJokeList.jokeList.length > 0) {
            return (
                <ListView
                    style={styles.listContainer}
                    initialListSize={8}
                    dataSource={dataSource}
                    renderRow={this.renderItem}
                    onEndReachedThreshold={10}
                    onEndReached={this.onEndReached}
                    onScroll={this.onScroll}
                    renderFooter={this.renderFooter}
                    refreshControl={
                        <RefreshControl
                            refreshing={getJokeList.isRefreshing}
                            onRefresh={this.onRefresh}
                            title="加载中..."
                            colors={['#ffaa66cc', '#ff00ddff', '#ffffbb33', '#ffff4444']}
                        />
                    }
                />
            );
        }
    }

    render() {
        const {getJokeList,navigator} = this.props;
        //console.warn('render',getJokeList)
        return (
            <View style={styles.container}>
                <Toolbar title="萌萌" navigator={navigator}/>
                {this.renderContent(this.state.dataSource.cloneWithRows(getJokeList.jokeList))}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'#fff',
    },
    listContainer: {
        backgroundColor: '#ccc',
    },
    itemContainer: {
        flex:1,
        backgroundColor: '#fff',
        marginTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },
    footerView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
        marginTop: 5,
        marginBottom: 5,
    },
    loading: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: '#000'
    },
    content: {
        fontSize: 14,

    }
});
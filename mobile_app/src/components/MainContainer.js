import React,{Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card'
import InfiniteScroll from 'react-infinite-scroller'
import {StickyContainer, Sticky} from 'react-sticky'
import utils from '../common/utils'
import Loading from '../common/Loading'

export default class MainContainer extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <StickyContainer id='StockList'>
                <Sticky style={{zIndex:9999}}>
                    <AppBar
                        titleStyle={{fontSize:20}}
                        title="我的钱"
                        showMenuIconButton={false}
                    />
                </Sticky>
                {this.props.children}
            </StickyContainer>
        )
    }
}

const styles = {
    tab: {
        fontSize: 16
    }
}
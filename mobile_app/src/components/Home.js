import React,{Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Divider from 'material-ui/Divider'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import ActionSettings from 'material-ui/svg-icons/action/settings'
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up'
import FileDownload from 'material-ui/svg-icons/file/file-download'
import FileUpload from 'material-ui/svg-icons/file/file-upload'
import CreditCard from 'material-ui/svg-icons/action/credit-card'
import ActionSchedule from 'material-ui/svg-icons/action/schedule'
import {GridList, GridTile} from 'material-ui/GridList'
import Toast from 'rk-toast'
import ConfirmDialog from '../common/ConfirmDialog'
import {StickyContainer, Sticky} from 'react-sticky'
import stock from '../common/stock'

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    handleSyncGet = ()=> {
        ConfirmDialog.show('确定要从服务器拉取数据到本地吗？', ()=> {
            stock.syncGET().then((result)=> {
                if (result) {
                    Toast.show('数据拉取成功', 5)
                } else {
                    Toast.show('数据拉取失败', 5)
                }
            })
        })
    }
    handleSyncPost = ()=> {
        ConfirmDialog.show('确定要把本地数据上传到服务器吗？', ()=> {
            stock.syncPOST().then((result)=> {
                if (result) {
                    Toast.show('数据推送成功', 5)
                } else {
                    Toast.show('数据推送失败', 5)
                }
            })
        })
    }

    render() {
        return (
            <StickyContainer>
                <Sticky style={{zIndex:9999}}>
                    <AppBar
                        titleStyle={{fontSize:20}}
                        title='我的钱'
                        showMenuIconButton={false}
                    />
                </Sticky>
                <GridList
                    style={{backgroundColor:'#fff',margin:0}}
                    cellHeight={76}
                    cols={4}
                >
                    <GridTile style={{textAlign:'center'}}>
                        <a href='#/stock'>
                            <CreditCard style={{width:48,height:48,color:'#da301c'}}/>
                            <div>操盘</div>
                        </a>
                    </GridTile>
                    <GridTile style={{textAlign:'center'}}>
                        <a href='#/stock/technology'>
                            <ActionTrendingUp style={{width:48,height:48,color:'#da301c'}}/>
                            <div>操盘技术</div>
                        </a>
                    </GridTile>
                    <GridTile style={{textAlign:'center'}}>
                        <a href='ionic.html'>
                            <ActionSchedule style={{width:48,height:48,color:'#da301c'}}/>
                            <div>待办事项</div>
                        </a>
                    </GridTile>
                    <GridTile style={{textAlign:'center'}}>
                        <a href='javascript:;' onTouchTap={this.handleSyncPost}>
                            <FileUpload style={{width:48,height:48,color:'#da301c'}}/>
                            <div>推送</div>
                        </a>
                    </GridTile>
                    <GridTile style={{textAlign:'center'}}>
                        <a href='javascript:;' onTouchTap={this.handleSyncGet}>
                            <FileDownload style={{width:48,height:48,color:'#da301c'}}/>
                            <div>拉取</div>
                        </a>
                    </GridTile>
                    <GridTile style={{textAlign:'center'}}>
                        <a href='#/setting'>
                            <ActionSettings style={{width:48,height:48,color:'#da301c'}}/>
                            <div>设置</div>
                        </a>
                    </GridTile>
                </GridList>
                <Divider />
            </StickyContainer>
        )
    }
}
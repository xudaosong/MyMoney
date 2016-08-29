import React,{Component} from 'react'
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import NavigationBefore from 'material-ui/svg-icons/image/navigate-before'
import Toast from 'rk-toast'
import ConfirmDialog from '../common/ConfirmDialog'
import {StickyContainer, Sticky} from 'react-sticky'
import stock from '../common/stock'
import { FormsyText } from '../formsy'
export default class Home extends Component {
    constructor(props) {
        super(props)
        let setting = window.localStorage.getItem('setting')
        if (!setting) {
            setting = {serverAddress: '', account: '', password: ''}
        } else {
            //console.log(setting)
            setting = JSON.parse(setting)
        }
        this.state = {
            setting: setting,
            disabledSubmit: false,
            disabledLabel: '提交中，请稍候...'
        }
    }

    submitForm = (data)=> {
        window.localStorage.setItem('setting', JSON.stringify(data))
        Toast.show('配置保存成功', 5)
    }

    render() {
        return (
            <StickyContainer>
                <Sticky style={{zIndex:9999}}>
                    <AppBar
                        titleStyle={{fontSize:20}}
                        title='设置'
                        iconElementLeft={<IconButton style={{padding:7}} iconStyle={{width:36,height:36}} onTouchTap={()=>{ history.go(-1)}}><NavigationBefore /></IconButton>}
                    />
                </Sticky>
                <Formsy.Form className='container-form'
                             onValidSubmit={this.submitForm}>
                    <table className='form'>
                        <tbody>
                        <tr>
                            <th className='required'>服务器</th>
                            <td>
                                <FormsyText style={styles.input}
                                            name='serverAddress' value={this.state.setting.serverAddress}
                                            hintText='服务器地址' required
                                            validationErrors={{'isDefaultRequiredValue':'请输入服务器地址'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th className='required'>同步账号</th>
                            <td>
                                <FormsyText style={styles.input}
                                            name='account' value={this.state.setting.account} hintText='同步账号'
                                            required
                                            validationErrors={{'isDefaultRequiredValue':'请输入同步账号'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th className='required'>同步密码</th>
                            <td>
                                <FormsyText style={styles.input}
                                            name='password' type='password' value={this.state.setting.password}
                                            hintText='同步密码' required
                                            validationErrors={{'isDefaultRequiredValue':'请输入同步密码'}}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div style={{textAlign:'center',margin:10,}}>
                        <RaisedButton type='submit' label={this.state.disabledSubmit?this.state.disabledLabel:'保存'}
                                      primary={true} fullWidth={true}
                                      formNoValidate={true} disabled={this.state.disabledSubmit}/>
                    </div>
                </Formsy.Form>
            </StickyContainer>
        )
    }
}
const styles = {
    input: {
        width: '96%',
    },
}


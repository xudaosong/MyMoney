import React,{Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Toast from 'rk-toast'
import NavigationBefore from 'material-ui/svg-icons/image/navigate-before'
import stock from '../common/stock'
import utils from '../common/utils'
import { FormsyText } from '../formsy'

export default class StockAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabledSubmit: false,
            disabledLabel: '提交中，请稍候...'
        }
    }

    submitForm = (data)=> {
        if(stock.add(data)) {
            Toast.show('股票新增成功', 5)
            history.go(-1)
        }else{
            Toast.show('股票新增失败', 5)
        }
    }

    render() {
        return (
            <div id='StockAdd'>
                <AppBar
                    titleStyle={{fontSize:20}}
                    title="股票新增"
                    iconElementLeft={<IconButton style={{padding:7}} iconStyle={{width:36,height:36}} onTouchTap={()=>{ history.go(-1)}}><NavigationBefore /></IconButton>}
                />
                <Formsy.Form className='container-form'
                             ref='form'
                             onValidSubmit={this.submitForm}>
                    <table className='form'>
                        <tbody>
                        <tr>
                            <th className='required'>证券名称</th>
                            <td>
                                <FormsyText style={styles.input}
                                            name='name' hintText='证券名称' required
                                            validationErrors={{'isDefaultRequiredValue':'请输入证券名称'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th className='required'>证券代码</th>
                            <td>
                                <FormsyText style={styles.input}
                                            name='code' hintText='证券代码' required
                                            validations="isLength:6" validationErrors={{'isDefaultRequiredValue':'请输入证券代码','isLength':'股票代码只能是6位数字'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th className='required multi-line'>选择理由</th>
                            <td>
                                <FormsyText hintText='选股理由' style={styles.input} multiLine={true}
                                            name='reason'
                                            validationErrors={{'isDefaultRequiredValue':'请输入选择理由'}} required/>
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

            </div>
        )
    }
}

const styles = {
    input: {
        width: '96%',
    },
}

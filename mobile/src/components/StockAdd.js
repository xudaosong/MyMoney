import React,{Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
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
        /* this.setState({disabledSubmit: true})
        EventData.report({
            'type_id': data.type,
            'case_addr': data.address,
            'report_time': data.date + ':00',//上报到秒级
            'lon': '0',
            'lat': '0',
            'case_desc': data.description,
            'imgs': this.state.photo,
            'processed': this.state.processed ? 1 : 0,
            'processed_result': this.state.processed ? this.refs.processResult.getValue() : '',
            'processed_imgs': this.state.processed ? this.state.processPhoto : []
        }).then((result)=> {
            this.setState({disabledSubmit: false})
            if (result === true) {
                sys.toast({'message': '事件上报成功'})
                window.location.reload()
            }
        })*/
    }

    render() {
        return (
            <div id='StockAdd'>
                <AppBar
                    title="股票新增"
                    showMenuIconButton={false}
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
                                            name='name' type='number' hintText='证券名称' required
                                            validationErrors={{'isDefaultRequiredValue':'请输入证券名称'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th className='required'>证券代码</th>
                            <td>
                                <FormsyText style={styles.input}
                                            name='code' type='number' hintText='证券代码' required
                                            validations="isInt,isLength:6" validationErrors={{'isDefaultRequiredValue':'请输入证券代码','isInt':'证券代码只能是6位数字','isLength':'股票代码只能是6位数字'}}/>
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

import React,{Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Drawer from 'material-ui/Drawer'
import Toast from 'rk-toast'
import stock from '../common/stock'
import utils from '../common/utils'
import { FormsyText } from '../formsy'
import StockTechnology from './StockTechnology'
const ScreenWidth = window.screen.width

export default class StockOperationWatch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            technology: '',
            showTechnology: false,
            eventTimeFormat: utils.dateFormat(new Date(), 'yyyy-MM-dd hh:mm'),
            disabledSubmit: false,
            disabledLabel: '提交中，请稍候...'
        }
    }

    handleFormSubmit = (data)=> {
        //console.log(data)
        data.type = 1
        if(stock.addRecord(this.props.params.id,data)){
            Toast.show('操盘保存成功',5)
            //history.go(-1)
        }else{
            alert('操盘保存失败',5)
        }
    }

    handleShowDatePicker = (event)=> {
        event.target.blur();
        let event2 = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': false
        });
        this.refs.datetime.dispatchEvent(event2)
    }

    handleDateChange = (e)=> {
        let eventTimeFormat = ''
        if (!!e.target.value) {
            let date = new Date(e.target.value.replace('T', ' '))
            eventTimeFormat = utils.dateFormat(date, 'yyyy-MM-dd hh:mm')
        }
        this.setState({eventTimeFormat: eventTimeFormat})
    }

    handleShowTechnology = () => {
        this.setState({showTechnology: true})
    }

    handleSelectedTechnology = (items) => {
        this.setState({showTechnology: false, 'technology': items.join(',')})
    }

    renderTechnology() {
        return (
            <Drawer open={this.state.showTechnology} style={{zIndex:9999}} width={ScreenWidth}>
                <StockTechnology isSelect={true} onSelected={this.handleSelectedTechnology}
                                 value={this.state.technology}/>
            </Drawer>
        )
    }

    render() {
        return (
            <Formsy.Form className='container-form'
                         ref='form'
                         onValidSubmit={this.handleFormSubmit}>
                <table className='form'>
                    <tbody>
                    <tr>
                        <th className='required'>操盘时间</th>
                        <td>
                            <FormsyText style={styles.input}
                                        name='date' hintText='操盘时间' value={this.state.eventTimeFormat} required
                                        validationErrors={{'isDefaultRequiredValue':'请选择操盘时间'}}
                                        onTouchTap={this.handleShowDatePicker}/>
                            <input style={{position:'absolute',left:-9999}}
                                   ref='datetime' type='datetime-local'
                                   onChange={this.handleDateChange}/>
                        </td>
                    </tr>
                    <tr>
                        <th className='required'>符合技术</th>
                        <td>
                            <FormsyText style={styles.input} value={this.state.technology}
                                        name='technology' hintText='符合技术' onTouchTap={this.handleShowTechnology}
                                        required validationErrors={{'isDefaultRequiredValue':'请选择符合的技术'}}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{verticalAlign: 'top',paddingTop: 17}}>备注</th>
                        <td>
                            <FormsyText style={styles.input} hintText='备注' multiLine={true} name='remark'/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div style={{textAlign:'center',margin:10,}}>
                    <RaisedButton type='submit' label={this.state.disabledSubmit?this.state.disabledLabel:'保存'}
                                  primary={true} fullWidth={true}
                                  formNoValidate={true} disabled={this.state.disabledSubmit}/>
                </div>
                {this.renderTechnology()}
            </Formsy.Form>
        )
    }
}

const styles = {
    tab: {
        fontSize: 16
    },
    input: {
        width: '96%',
    },
}
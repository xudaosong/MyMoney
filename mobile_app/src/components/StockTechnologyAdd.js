import React,{Component} from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Toast from 'rk-toast'
import NavigationBefore from 'material-ui/svg-icons/image/navigate-before'
import _ from 'underscore'
import stock from '../common/stock'
import utils from '../common/utils'
import { FormsyText,FormsyCheckbox } from '../formsy'

export default class StockTechnologyAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: stock.getTechnologyCategory(),
            categoryError: false,
            disabledSubmit: false,
            disabledLabel: '提交中，请稍候...'
        }
        console.log(this.state.category)
    }

    getSelectedCategory(data) {
        let category = []
        _.each(data.category, (value, key)=> {
            value && category.push(key)
        })
        if (data.newCategory) {
            category = category.concat(data.newCategory.split(','))
        }
        return category
    }

    handleFormSubmit = (data)=> {
        let category = this.getSelectedCategory(data)
        this.setState({categoryError: category.length === 0})
        data.category = category
        data = _.omit(data, 'newCategory')
        if (typeof data.description === 'undefined') {
            data.description = ''
        }
        //console.log(data)
        if (stock.addTechnology(data)) {
            Toast.show('股票技术新增成功', 5)
            history.go(-1)
        } else {
            Toast.show('股票技术新增失败', 5)
        }
    }
    handleFormError = (data)=> {
        let category = this.getSelectedCategory(data)
        this.setState({categoryError: category.length === 0})
    }

    render() {
        return (
            <div>
                <AppBar
                    titleStyle={{fontSize:20}}
                    title="股票技术新增"
                    iconElementLeft={<IconButton style={{padding:7}} iconStyle={{width:36,height:36}} onTouchTap={()=>{ history.go(-1)}}><NavigationBefore /></IconButton>}
                />
                <Formsy.Form className='container-form'
                             ref='form'
                             onInvalidSubmit={this.handleFormError}
                             onValidSubmit={this.handleFormSubmit}>
                    <table className='form'>
                        <tbody>
                        <tr>
                            <th className='required'>名称</th>
                            <td>
                                <FormsyText style={styles.input}
                                            name='name' hintText='技术名称' required
                                            validationErrors={{'isDefaultRequiredValue':'请输入技术名称'}}/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{verticalAlign:'top'}} className='required'>类别</th>
                            <td>
                                {this.state.category.map((item)=> {
                                    return (<FormsyCheckbox key={item} name={`category[${item}]`} label={item}/>)
                                })}
                                <FormsyText style={styles.input}
                                            name='newCategory' hintText='新的类别'/>
                                {this.state.categoryError && (
                                    <div style={{color:'rgb(244, 67, 54)',fontSize:12}}>请选择或输入类别</div>)}
                            </td>
                        </tr>
                        <tr>
                            <th className='multi-line'>描述</th>
                            <td>
                                <FormsyText style={styles.input} name='description' hintText='描述' multiLine={true}/>
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

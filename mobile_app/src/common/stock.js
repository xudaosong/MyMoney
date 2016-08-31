import _ from 'underscore'
import 'whatwg-fetch'
import Toast from 'rk-toast'
import utils from './utils'
let config = require('config');

let stockData = window.localStorage.getItem('stock') || []
let stockTechnologyData = window.localStorage.getItem('stockTechnology') || []
let currentUser = window.sessionStorage.getItem('currentUser') || null
let setting = {}
if (typeof stockData === 'string') {
    stockData = JSON.parse(stockData)
}
if (typeof stockTechnologyData === 'string') {
    stockTechnologyData = JSON.parse(stockTechnologyData)
}
if (typeof currentUser === 'string') {
    currentUser = JSON.parse(currentUser)
}
let template = {
    stock:{
        id: '',
        name: '',
        code: '',
        reason: '',
        state: 2,// 1:操作中，2：观察中，3:已完成
        amount: 0,//当前持仓
        income: 0,//总盈收
        summary: '',//总结
        records: [],
        isSync: 0,
    },
    stockRecord:{
        date: '2000-1-1 00:00:00',
        type: 1, // 1：观察，2：买入，3：卖出
        amount: 0,
        remark: '',
        comment:'',
        commentDate:'2000-1-1 00:00:00',
        result:0,//1:待定，2：正确，3：错误，4：重要
    }
}

export default {
    getUrl(resPath){
        setting = window.localStorage.getItem('setting') || {}
        if (typeof setting === 'string') {
            setting = JSON.parse(setting)
        }
        return `http://${setting.serverAddress}/${resPath}`
    },
    login(){
        return fetch(this.getUrl('api/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({username: setting.account, password: setting.password})
        }).then(response=> {
            if (response.ok) {
                return response.json().then((user)=> {
                    currentUser = user
                    window.sessionStorage.setItem('currentUser', JSON.stringify(user))
                    return user
                })
            } else {
                return false
            }
        })
    },
    _syncGET(){
        return fetch(this.getUrl('api/sync'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + currentUser.token
            },
        }).then((response)=> {
            if (response.ok) {
                return response.json().then((result)=> {
                    //console.log(result)
                    stockData = result.Stock
                    stockTechnologyData = result.StockTechnology
                    this._sync()
                    this._syncTechnology()
                    return true
                })
            } else {
                switch (response.status) {
                    case 401:
                        Toast.show('请先登录', 5)
                        break;
                    case 500:
                        response.json().then((result)=> {
                            Toast.show(`同步失败,原因：${result.messages.join('。')}`, 5)
                        })
                        break;
                    case 404:
                        Toast.show('同步失败，接口无法访问', 5)
                        break;
                    default:
                        Toast.show('同步失败，未知的错误', 5)
                        break;
                }
                return false
            }
        })
    },
    _syncPOST(){
        return fetch(this.getUrl('api/sync'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + currentUser.token
            },
            body: JSON.stringify({Stock:stockData,StockTechnology:stockTechnologyData})
        }).then((response)=> {
            if (response.ok) {
                return true
            } else {
                switch (response.status) {
                    case 401:
                        Toast.show('请先登录', 5)
                        break;
                    case 500:
                        response.json().then((result)=> {
                            Toast.show(`同步失败,原因：${result.messages.join('。')}`, 5)
                        })
                        break;
                    case 404:
                        Toast.show('同步失败，接口无法访问', 5)
                        break;
                    default:
                        Toast.show('同步失败，未知的错误', 5)
                        break;
                }
                return false
            }
        })
    },
    syncPOST(){
        if (!currentUser) {
            return this.login().then(()=> {
                return this._syncPOST()
            })
        } else {
            return this._syncPOST()
        }
    },
    syncGET(){
        if (!currentUser) {
            return this.login().then(()=> {
                return this._syncGET()
            })
        } else {
            return this._syncGET()
        }
    },
    sync(){
        if (!currentUser) {
            this.login().then(()=> {
                this._syncPOST()
                this._syncGET()
            })
        } else {
            this._syncPOST()
            this._syncGET()
        }
    },
    _sync(){
        window.localStorage.setItem('stock', JSON.stringify(stockData))
    },
    add(item){
        let newItem = _.extend({}, template.stock, item)
        newItem.id = new Date().getTime()
        stockData.push(newItem)
        this._sync()
        return true
    },
    addRecord(id, record){
        let item = this.get(id)
        if (!item)
            return false
        if (record.type == 2) {// 如果是买入，则修改状态为操作中
            item.state = 1
            item.amount = parseInt(item.amount) + parseInt(record.amount)
        } else if(record.type == 3) {// 如果是卖出
            item.amount =  parseInt(item.amount) - parseInt(record.amount)
        }
        //record.id = new Date().getTime()
        item.records.push(_.extend({}, template.stockRecord, record))
        this._sync()
        return true
    },
    recordComment(record,comment){
        comment.commentDate=  utils.dateFormat(new Date())
        record = _.extend(record, comment)
        this._sync()
        return true
    },
    changeState(item, state, data){
        if (typeof item !== 'object') {
            item = this.get(item)
        }
        item.state = state
        if (state == 3) {
            _.extend(item,data)
        }
        this._sync()
        return true
    },
    list(){
        return _.sortBy(stockData,'state')
    },
    get(id){
        return _.find(stockData, (item)=> {
            return item.id == id
        })
    },
    _syncTechnology(){
        window.localStorage.setItem('stockTechnology', JSON.stringify(stockTechnologyData))
    },
    addTechnology(item){
        item.id = new Date().getTime()
        stockTechnologyData.push(item)
        this._syncTechnology()
        return true
    },
    deleteTechnology(id){
        let index = stockTechnologyData.indexOf(this.getTechnologyById(id))
        if (index >= 0) {
            stockTechnologyData.splice(index, 1)
            this._syncTechnology()
            return true
        } else {
            return false
        }
    },
    editTechnology(id, item){
        let old = this.getTechnologyById(id)
        _.extend(old, item)
        this._syncTechnology()
        return true
    },
    getTechnologyCategory(){
        let categories = []
        _.each(stockTechnologyData, (item)=> {
            categories = categories.concat(item.category)
        })
        return _.sortBy(_.uniq(categories))
    },
    getTechnology(category){
        return _.filter(stockTechnologyData, (item)=> {
            return item.category.indexOf(category) >= 0
        })
    },
    getTechnologyById(id){
        return _.find(stockTechnologyData, (item)=> {
            return item.id == id
        })
    },

}
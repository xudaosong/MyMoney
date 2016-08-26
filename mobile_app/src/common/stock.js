import _ from 'underscore'
import 'whatwg-fetch'
import Toast from 'rk-toast'
let config = require('config');

let data = window.localStorage.getItem('stock') || []
let stockTechnologyData = window.localStorage.getItem('stockTechnology') || []
let currentUser = window.sessionStorage.getItem('currentUser') || null
let setting = {}
if (typeof data === 'string') {
    data = JSON.parse(data)
}
if (typeof stockTechnologyData === 'string') {
    stockTechnologyData = JSON.parse(stockTechnologyData)
}
if (typeof currentUser === 'string') {
    currentUser = JSON.parse(currentUser)
}
let itemTemplate = {
    id: '',
    name: '',
    code: '',
    reason: '',
    state: 1,
    amount: 0,//当前持仓
    income: 0,//总盈收
    summary: '',//总结
    records: [],
    isSync: 0,
}
let recordTemplate = {
    date: '2000-1-1 00:00:00',
    type: 1,
    amount: 0,
    remark: '',
}

/*[
    {
        id: '0',
        name: 'name',
        category: ['category'],
        description: 'remark'
    },
    {
        id: '1',
        name: 'name1',
        category: ['category', 'category1'],
        description: 'remark1'
    }
]*/
export default {
    _sync(){
        window.localStorage.setItem('stock', JSON.stringify(data))
    },
    list(){
        return data
    },
    add(item){
        let newItem = _.extend({},itemTemplate, item)
        newItem.id = data.length
        data.push(newItem)
        this._sync()
        return true
    },
    get(id){
        return _.find(data, (item)=> {
            return item.id == id
        })
    },
    changeState(item, state, summary){
        if (typeof item !== 'object') {
            item = this.get(item)
        }
        item.state = state
        if (state == 3) {
            item.summary = summary
        }
        this._sync()
        return true
    },
    record(id, record){
        let item = this.get(id)
        if (!item)
            return false
        if (record.type == 2) {// 如果是买入，则修改状态为操作中
            item.state = 2
        }
        item.records.push(_.extend({},recordTemplate, record))
        this._sync()
        return true
    },
    _syncGET(){
        return fetch(this.getUrl('api/stock'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + currentUser.token
            },
        }).then((response)=> {
            if (response.ok) {
                return response.json().then((result)=> {
                    data = result.data
                    this._sync()
                    return true
                })
            } else {
                switch (response.status) {
                    case 401:
                        Toast.show('请先登录', 5)
                        break;
                    case 500:
                        response.json().then((result)=> {
                            Toast.show(`同步失败,原因：${result.message}`, 5)
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
        return fetch(this.getUrl('api/stock'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + currentUser.token
            },
            body: JSON.stringify(data)
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
                            Toast.show(`同步失败,原因：${result.message}`, 5)
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
    _syncTechnology(){
        window.localStorage.setItem('stockTechnology', JSON.stringify(stockTechnologyData))
    },
    addTechnology(item){
        item.id = stockTechnologyData.length
        stockTechnologyData.push(item)
        this._syncTechnology()
        return true
    },
    getTechnologyCategory(){
        let categories = []
        _.each(stockTechnologyData, (item)=> {
            categories = categories.concat(item.category)
        })
        return _.uniq(categories)
    },
    getTechnology(category){
        return _.filter(stockTechnologyData, (item)=> {
            return item.category.indexOf(category) >= 0
        })
    },
}
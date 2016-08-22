import _ from 'underscore'
import 'whatwg-fetch'
import Toast from 'rk-toast'
let config = require('config');

let data = window.localStorage.getItem('stock') || []
let currentUser = window.sessionStorage.getItem('currentUser') || null
if (typeof data === 'string') {
    data = JSON.parse(data)
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
export default {
    _sync(){
        window.localStorage.setItem('stock', JSON.stringify(data))
    },
    list(){
        return data
    },
    add(item){
        let newItem = _.extend(itemTemplate, item)
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
        if (state === '3') {
            item.summary = summary
        }
        this._sync()
        return true
    },
    record(id, record){
        let item = this.get(id)
        if (!item)
            return false
        if (record.type === '2') {// 如果是买入，则修改状态为操作中
            item.state = '2'
        }
        item.records.push(_.extend(recordTemplate, record))
        this._sync()
        return true
    },
    _syncGET(){
        fetch(this.getUrl('api/stock'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + currentUser.token
            },
        }).then((response)=> {
            if (response.ok) {
               response.json().then((result)=>{
                   console.log(result)
                   data = result.data
                   this._sync()
                   //window.location.reload()
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
        fetch(this.getUrl('api/stock'), {
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
            this.login().then(()=> {
                this._syncPOST()
            })
        } else {
            this._syncPOST()
        }
    },
    syncGET(){
        if (!currentUser) {
            this.login().then(()=> {
                this._syncGET()
            })
        } else {
            this._syncGET()
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
        return `${config.default.apiHost}/${resPath}`
    },
    login(){
        return fetch(this.getUrl('api/login'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({username: 'xuds', password: 'xds8504'})
        }).then(response=> {
            if (response.ok) {
                response.json().then((user)=> {
                    currentUser = user
                    window.sessionStorage.setItem('currentUser', JSON.stringify(user))
                    return user
                })
            } else {
                return false
            }
        })
    },
}
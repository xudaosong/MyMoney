import _ from 'underscore'
import 'whatwg-fetch'
import Toast from 'rk-toast'

let data = window.localStorage.getItem('stock') || []
if (typeof data === 'string') {
    data = JSON.parse(data)
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
    isSync:0,
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
    sync(url){
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(data)
        }).then((response)=>{
            if(response.ok){
                return true
            } else {
                switch (response.status) {
                    case 401:
                        Toast.show( '请先登录',5)
                        break;
                    case 500:
                        response.json().then((result)=>{
                            Toast.show( `同步失败,原因：${result.message}`,5)
                        })
                        break;
                    case 404:
                        Toast.show( '同步失败，接口无法访问',5)
                        break;
                    default:
                        Toast.show( '同步失败，未知的错误',5)
                        break;
                }
                return false
            }
        })
    },
}
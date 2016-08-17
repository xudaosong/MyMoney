import _ from 'underscore'
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
    summary: '',
    records: []
}
let recordTemplate = {
    date: '2000-11-11 11:11:00',
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
    record(id, record){
        let item = this.get(id)
        if (!item)
            return false
        item.records.push(_.extend(recordTemplate, record))
        this._sync()
        return true
    }
}
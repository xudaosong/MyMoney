/**
* 股票涨跌比率排行榜
*/
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var PriceRatioSchema = new Schema({
    code: {
        type: String,
        trim: true,
        required: '请输入代码'
    },
    name: {
        type: String,
        trim: true,
        required: '请输入名称'
    },
    maxPrice: {
        type: Number,
        required: '请输入最高价'
    },
    secondPrice: {
        type: Number,
        required: '请输入次高价'
    },
    minPrice: {
        type: Number,
        required: '请输入最低价'
    },
    currentPrice: {
        type: Number,
        required: '请输入当前价'
    },
    created: {
        type: Date
    }
});
mongoose.model('PriceRatio', PriceRatioSchema);
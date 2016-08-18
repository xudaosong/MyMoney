var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var StockSchema = new Schema({
    name: String,
    code: String,
    reason:String,
    state:Number,
    amount:Number,
    income:Number,
    summary: String,
    records:[{
         date: Date
        type: Number,
        amount: Number,
        remark: String,
    }],
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('Stock', StockSchema);
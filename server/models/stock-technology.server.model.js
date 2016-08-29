var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StockTechnologySchema = new Schema({
    name: String,
    category: [String],
    description: String,
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('StockTechnology', StockTechnologySchema);
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ChecklistSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: '请输入Checklist标题'
    },
    content: {
        type: String,
        trim: true,
        default: ''
    },
    trend: {
        type: String,
        trim: true,
        required: '请输入趋势'
    },
    operation: {
        type: String,
        trim: true,
        required: '请输入操作'
    },
    sort: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        default: '',
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});
mongoose.model('Checklist', ChecklistSchema);

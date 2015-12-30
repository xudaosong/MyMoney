var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ChecklistSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: '请输入Checklist标题'
    },
    group: {
        type: String,
        trim: true,
        required: '请输入分组'
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

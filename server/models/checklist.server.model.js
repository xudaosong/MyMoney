var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ChecklistSchema = new Schema({
    content: {
        type: String,
        default: '',
        trim: true,
        required: '请输入Checklist内容'
    },
    group:{
        type: String,
        trim: true,
        default: '请输入分组'
    },
    author:{
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
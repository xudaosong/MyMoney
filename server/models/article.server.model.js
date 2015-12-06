var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ArticleSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true,
        required: '请输入文章标题'
    },
    content: {
        type: String,
        default: '',
        trim: true,
        required: '请输入文章内容'
    },
    category:{
        type: String,
        trim: true,
        default: ''
    },
    isGood:{
        type: Boolean,
        default: false
    },
    author:{
        type: String,
        default: '',
        trim: true
    },
    source:{
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
mongoose.model('Article', ArticleSchema);
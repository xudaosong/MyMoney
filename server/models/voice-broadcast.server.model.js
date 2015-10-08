var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var VoiceBroadcastSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: '',
        trim: true,
        required: '请输入直播内容'
    },
    VideoUrl:{
        type: String,
        default: '',
        trim: true
    },
    author:{
        type: String,
        default: '王宁',
        trim: true
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});
mongoose.model('VoiceBroadcast', VoiceBroadcastSchema);
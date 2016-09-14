var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var TodoSchema = new Schema({
    description: {
        type: String,
        trim: true,
    },
    state: {
        type: Number,
        default: 0
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date
    }
});
mongoose.model('Todo', TodoSchema);

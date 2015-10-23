var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    //firstName: String,
    //lastName: String,
    email: {
        type: String,
        index: true,
        match: [/.+\@.+\..+/, '请输入正确的邮箱']
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: '请输入用户名'
    },
    password: {
        type: String,
        validate: [function (password) {
            return password && password.length >= 6;
        }, '密码至少6位数']
    },
    salt: { // 用于对密码进行哈希
        type: String
    },
    provider: { // 用于标明注册用户时所采用的Passport策略类型
        type: String,
        required: '请提供用户的策略类型'
    },
    providerId: String, // 用于标明身份验证策略的用户标志符
    providerData: {}, // 用于存储从OAuth提供方获取的用户信息
    created: {
        type: Date,
        default: Date.now
    }
});
// 添加虚拟属性fullName，该属性不会存储到mongodb中
//UserSchema.virtual('fullName').get(function () {
//    return this.firstName + ' ' + this.lastName;
//}).set(function (fullName) { // 使用set方法，对fullName进行拆分，用firstName和lastName进行存储
//    var splitName = fullName.split(' ');
//    this.firstName = splitName[0] || '';
//    this.lastName = splitName[1] || '';
//});

// 用户保存前的预处理操作。用于对用户密码进行哈希操作
UserSchema.pre('save', function (next) {
    if (this.password) {
        // crypto.randomBytes()方法生成密码学强度的伪随机数据
        // 使用伪随机方法生成哈希
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        // 对密码进行哈希操作
        this.password = this.hashPassword(this.password);
    }
    next();
});
// 通过使用Node.js的crypto模块来执行用户密码的哈希
UserSchema.methods.hashPassword = function (password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};
// 将接收的用户密码进行哈希后的结果与数据库中存储的用户密码进行比较，如果相等则密码正确
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};
// 用于为新用户确定唯一可用的名字，如果重名，会自动为用户名添加后缀(suffix)，通过callback回调函数返回可用名字
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username + (suffix || '');
    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

UserSchema.set('toJSON', {getters: true, virtuals: true});
mongoose.model('User', UserSchema);
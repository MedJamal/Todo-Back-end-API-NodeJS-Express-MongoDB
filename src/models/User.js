const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const UserSchema = Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, index: true, unique: true },
    password: { type: String, require: true },
    createdAT: { type: String, default: new Date() }
});

UserSchema.pre('save', async function (next) {
    // Password encryption
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

// Check if password matched
UserSchema.methods.isPasswordMatch = function(password, hashed, callback) {
    bcrypt.compare(password, hashed, (error, success) => {
        if (error) {
            return callback(error);
        }
        callback(null, success);
    });
};

// Return user as json without password
UserSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;

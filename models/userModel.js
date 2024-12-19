const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    fullname: {
        firstname: {
            required: true,
            type: String,
            minlength: [3, 'First name must be atleast 3 characters']
        },
        lastname: {
            type: String,
            minlength: [3, "last name must be atleast 3 characters"]
        }
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String,
        select: false
    },
    socketId: {
        type: String
    }
});

userSchema.methods.genrateAuthToken = function ()  {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY);
    return token
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10)
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel
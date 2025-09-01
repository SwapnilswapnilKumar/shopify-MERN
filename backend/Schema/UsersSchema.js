const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UsersSchema = mongoose.Schema({
    name:{
        type:String,
        // required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    cartData:{
        type:Object,

    },
    date:{
        type:Date,
        default:Date.now,
    }
})

UsersSchema.pre('save',async function(next){
    const user = this;
    if(!user.isModified('password')){
        return next();
    }
    try{
        //generate salt:
        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(user.password,salt);

        user.password = hashedPassword;

        next();
    }
    catch(error){
        return next(error);
    }

});

UsersSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcryptjs.compare(candidatePassword,this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}

const User = mongoose.model('User',UsersSchema);
module.exports = User;
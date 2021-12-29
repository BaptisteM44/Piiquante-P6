const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


//schéma de donnée pour un utilisateur(User)
const userSchema = mongoose.Schema({
    email: { type:String, required: true, unique: true },
    password: { type: String, required: true }
});
//plugin validation mongoose (unicité mail)
userSchema.plugin(uniqueValidator), { type: 'mongoose-unique-validator' };

module.exports= mongoose.model('User', userSchema);
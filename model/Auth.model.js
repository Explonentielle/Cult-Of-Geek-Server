const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const AuthSchema = new Schema({
    id: Number,
    fname: String,
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String,
    age: Number,
    location: String,
})

const AuthModel = mongoose.model("Auth", AuthSchema)

module.exports = AuthModel
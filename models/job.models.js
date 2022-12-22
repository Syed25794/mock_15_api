const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    name:{ type : String, required: true},
    position:{ type : String, required: true},
    contract:{ type : String, required : true},
    location:{ type: String, required : true},
    time: { type: String, required : true}
});

const userSchema = new mongoose.Schema({
    username:{ type: String, required : true },
    email: { type: String , required : true },
    password: { type : String, required : true}
})

const Job = mongoose.model("myJob",jobSchema);

const User = mongoose.model("myUser",userSchema);

module.exports = { Job , User } ;
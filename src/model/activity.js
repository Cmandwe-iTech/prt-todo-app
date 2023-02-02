const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ActivitySchema = new Schema({
    activity:{type:String},
    status:{type:String, default:"pending"},
    user:{type:String, ref:"users"}
})

const ActiveModel = mongoose.model("activity",ActivitySchema);

module.exports = ActiveModel;
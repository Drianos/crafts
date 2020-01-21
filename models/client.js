/*
 * In this file: Database schema for client records.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Definition for client
var clientSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    birth: { type: Date, required: true },
    email: {type: String, required: true },
    phone: { type: String, required: true},
    registered: { type: Date, default: Date.now },   
  }, 
  { 
    versionKey: false
  }
);

clientSchema.pre('save', next => {
  currentTime = new Date();
  // Save current time each time a record is created
  if(!this.registered) {
    this.registered = currentTime;
  }
  next();
});

module.exports = mongoose.model('client', clientSchema);
var express = require('express');
var mongoose = require('../database/mongo');

// Define schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
    id: String,
    data: Object,
});

// Compile model from schema
var SomeModel = mongoose.model('order', SomeModelSchema);


module.exports.ping = () => {
    console.log("orders model");
}

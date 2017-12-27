var express = require('express');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bitfinex');
module.exports = mongoose;
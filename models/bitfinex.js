var express = require('express');
var BFX = require('bitfinex-api-node');
var gateway = require('../gateway/bitfinex');
var order = require('../models/order');

var bfxRest = new BFX(gateway.apiKey, gateway.apiSecret, { version: 1 }).rest;

module.exports.apiKey = gateway.apiKey;
module.exports.apiSecret = gateway.apiSecret;
module.exports.wssUrl = gateway.wssUrl;

module.exports.pubticker = function (symbol, callback) {
    bfxRest.ticker(symbol, (err, res) => {
        callback((err != null) ? err.message : null, res);
    });
};

module.exports.account_infos = function (callback) {
    bfxRest.account_infos((err, res) => {
        callback((err != null) ? err.message : null, res);
    })
};

module.exports.account_fees = function (callback) {
    gateway.sendRequest({
        request: "/v1/account_fees",
        nonce: Date.now().toString()
    }, callback);
};

module.exports.summary = function (callback) {
    gateway.sendRequest({
        request: "/v1/summary",
        nonce: Date.now().toString()
    }, callback);
};

module.exports.deposit = function (method, callback) {
    gateway.sendRequest({
        "request": "/v1/deposit/new",
        "nonce": Date.now().toString(),
        "method": method,
        "wallet_name": "exchange",
        "renew": 0
    }, callback);
};

module.exports.margin_infos = function (callback) {
    gateway.sendRequest({
        request: "/v1/margin_infos",
        nonce: Date.now().toString()
    }, callback);
};

module.exports.balances = function (callback) {
    gateway.sendRequest({
        request: "/v1/balances",
        nonce: Date.now().toString()
    }, callback);
};

module.exports.orderHist = function (callback) {
    bfxRest.orders_history((err, res) => {
        callback((err != null) ? err.message : null, res);
    })
};

module.exports.orderNew = function (data, callback) {

    // order.ping();
    // callback("OKOKOKOK", "OKOK");

    bfxRest.new_order(data.symbol, data.amount, data.price, data.exchange, data.side, data.type, (err, res) => {
        callback((err != null) ? err.message : null, res);
    })
};

module.exports.orderCancel = function (id, callback) {
    bfxRest.cancel_order(id, (err, res) => {
        callback((err != null) ? err.message : null, res);
    })
};

module.exports.orderStatus = function (id, callback) {
    bfxRest.order_status(id, (err, res) => {
        callback((err != null) ? err.message : null, res);
    })
};

module.exports.orderCancelMulti = function (ordersIds, callback) {
    bfxRest.cancel_multiple_orders(ordersIds, (err, res) => {
        callback((err != null) ? err.message : null, res);
    })
};
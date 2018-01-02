var express = require('express');
var router = express.Router();
var bitfinex = require('../models/bitfinex');
var unicoin = require('../gateway/unicoin');

router.get('/pubticker/:symbol', function (req, res, next) {

  bitfinex.pubtickerPromise(req.params.symbol).then( (res, rej) => {

    

  });

  bitfinex.pubticker(req.params.symbol, function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.get('/account_infos', function (req, res, next) {
  bitfinex.account_infos(function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.get('/account_fees', function (req, res, next) {
  bitfinex.account_fees(function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.get('/summary', function (req, res, next) {
  bitfinex.summary(function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.get('/deposit/:method', function (req, res, next) {
  bitfinex.deposit(req.params.method, function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.get('/margin_infos', function (req, res, next) {
  bitfinex.margin_infos(function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.get('/balances', function (req, res, next) {
  bitfinex.balances(function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.get('/order/hist', function (req, res, next) {
  bitfinex.orderHist(function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.post('/order/new', function (req, res, next) {
  bitfinex.orderNew({
    symbol: req.body.symbol,
    amount: req.body.amount,
    price: req.body.price,
    exchange: req.body.exchange,
    side: req.body.side,
    type: req.body.type,
  }, function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.post('/order/cancel', function (req, res, next) {
  bitfinex.orderCancel(req.body.id, function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.post('/order/status', function (req, res, next) {
  bitfinex.orderStatus(req.body.id, function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.post('/order/cancel/multi', function (req, res, next) {
  bitfinex.orderCancelMulti(req.body.ordersIds, function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

router.post('/callback', function (req, res, next) {
  unicoin.sendRequest('/api/v1/callback/buy', { ramaz: 'shemovedi shensiiii' }, function (err, response) {
    if (err)
      res.json({ error: err });
    else
      res.json(response);
  });
});

module.exports = router;

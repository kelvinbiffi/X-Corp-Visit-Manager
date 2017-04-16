var express = require('express');
var router = express.Router();

var controllerAppointments = require('../controller/controllerAppointments.js')();

/* GET home page. */
router.get('/', function(req, res, next) {
  controllerAppointments.gerarSemanario();
  res.render('appointments', controllerAppointments.retorno);
});

module.exports = router;

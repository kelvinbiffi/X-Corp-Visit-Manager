var express = require('express');
var router = express.Router();

var controllerVisitas = require('../controller/controllerVisitas.js')();

/* GET Schedule page. */
router.get('/', function(req, res, next) {
  controllerVisitas.clearRetorno(req.body);
  res.render('schedule', controllerVisitas.retorno);
});

/* POST Schedule form. */
router.post('/', function(req, res, next) {
  controllerVisitas.manipularVisita(req.body);
  res.render('schedule', controllerVisitas.retorno);

});

module.exports = router;

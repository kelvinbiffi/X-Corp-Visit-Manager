var express = require('express');
var router = express.Router();

var fs = require("fs");

jsonCidades = require("../db/cidades.json").cidades;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('schedule', { title: 'Agendar visita', cidades: jsonCidades });
});

/* GET home page. */
router.post('/', function(req, res, next) {
  res.render('schedule', { title: 'Agendar visita', cidades: jsonCidades });
});

module.exports = router;

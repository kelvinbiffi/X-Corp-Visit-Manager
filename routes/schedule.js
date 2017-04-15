var express = require('express');
var router = express.Router();

jsonCidades = require("../db/cidades.json").cidades;

var ret = {
  title: 'Agendar visita',
  cidades: jsonCidades,
  city: "-",
  date: "",
  erro: ""
};

var clearRet = function(){
  ret.city = "";
  ret.date = "";
  ret.erro = "";
};

/* GET Schedule page. */
router.get('/', function(req, res, next) {
  clearRet();
  res.render('schedule', ret);
});

var handleVisitas = function(){

  var fs = require("fs");

  jsonVisitas = require("../db/visitas.json");

  var vendedor = -1;

  if(jsonVisitas.visitas.length > 0){
    //TODO verificar vendedores na semana na cidade selecionada, caso não tenha cendedores continuar lógica
  }

  if(vendedor == -1){
    //TODO randomizar vendedor para a visita
  }

  //TODO salvar dados da visita

  var callbackSaveSchedule = function(a){
    console.log(a);
  };

  fs.writeFile( "../db/visitas.json", JSON.stringify( jsonVisitas ), "utf8", callbackSaveSchedule );
};


/* POST Schedule form. */
router.post('/', function(req, res, next) {
  clearRet();
  ret.city = req.body.city;
  ret.date = req.body.date;

  if(ret.city == "" || ret.date == ""){
    ret.erro = "Para agendar uma visita é necessário informar a cidade e o dia desejados!";
  }else{
    handleVisitas();
  }

  res.render('schedule', ret);

});

module.exports = router;

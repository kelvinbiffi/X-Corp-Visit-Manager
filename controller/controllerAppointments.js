module.exports = function() {

  var jsonCidades = require("../db/cidades.json").cidades;
  var jsonVendedores = require("../db/vendedores.json").vendedores;

  var date = new Date(); //Data atual

  /**
   * Objeto de retorno
   */
  var retorno = {
    title: 'Semanário de visitas',
    cidades: jsonCidades,
    vendedores: jsonVendedores,
    appointments: [],
    intervalo: ""
  };

  /**
   * Reinicializar campos de retorno
   */
  var clearRetorno = function(){
    retorno.appointments = [];
  };

  /**
   * Retornar a data formatada
   *
   * @param day {Date}
   */
  var getStringDate = function(day){
    var dd = day.getDate();
    var mm = day.getMonth()+1; //January is 0!

    var yyyy = day.getFullYear();
    if(dd < 10){
        dd = '0' + dd;
    }
    if(mm < 10){
        mm = '0' + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
  };

  /**
   * Manipular a data para a geração do semanario de acordo com o comando informado
   */
  var handlePagination = function(req){
    if(req.query.move){
      date.setDate(date.getDate() + (req.query.move == "next" ? 6 : -6));
    }else{
      date = new Date();
    }
  };

  /**
   * Pegar os dias da semana
   *
   * @param red {object}
   */
  var getDias = function(req){
    handlePagination(req);
    date = new Date(getStringDate(date) + " 00:00");
    if(date.getDay() == 0){
      date.setDate(date.getDate() + 1) ;
    }else if(date.getDay() == 6){
      date.setDate(date.getDate() - 1) ;
    }
    intHoje = date.getDay();
    var objDias = {};

    var intDif = 5 - date.getDay();
    var dateMonday = new Date(date.getTime() - ((4-intDif)*24*60*60*1000));
    var dateFriday = new Date(date.getTime() + (intDif*24*60*60*1000));

    arrDias = {
      "1": "Terça",
      "2": "Quarta",
      "3": "Quinta",
      "4": "Sexta"
    }

    objDias[getStringDate(dateMonday)] = {
      diaSemana: "Segunda",
      dia: dateMonday.getDate(),
      visitas: []
    };
    for (var i = 1; i < 5; i++) {
      var day = new Date(dateMonday.getTime() + (i*24*60*60*1000));
      objDias[getStringDate(day)] = {
        diaSemana: arrDias[i],
        dia: day.getDate(),
        visitas: []
      };
    }

    return {
      dias: objDias,
      monday: dateMonday,
      friday: dateFriday
    }
  }

  /**
   * Verificar se a data escolhida esta dentro da semana para as visitas agendadas
   */
  var verifyBetweenDates = function(date, objDias){
    var here = new Date(date + " 00:00");
    if(here >= objDias.monday && here <= objDias.friday){
      return true;
    }

    return false;
  };

  /**
   * Buscar visitas agendatas e montar o semanário pára a semana
   */
  var montarSemanario = function(req){
    var objDias = getDias(req);

    var jsonVisitas = require("../db/visitas.json");
    if(jsonVisitas.visitas.length > 0){
      for (var i = 0; i < jsonVisitas.visitas.length; i++) {
        var visita = jsonVisitas.visitas[i];
        if(verifyBetweenDates(visita.date, objDias)){
          objDias.dias[visita.date].visitas.push(visita);
        }
      }
    }

    retorno.intervalo = getStringDate(objDias.monday) + " até " + getStringDate(objDias.friday);
    retorno.appointments = objDias.dias;

    console.log("Calendário gerado");
  }

  /**
   * retornar as funções disponíveis para a classe de controle de compromissos semanais
   */
  return {
    retorno: retorno, //Objecto com dados de retorno

    /**
     * Montar semanario
     */
    gerarSemanario: function(req){
      clearRetorno();
      montarSemanario(req);
    }

  };
}

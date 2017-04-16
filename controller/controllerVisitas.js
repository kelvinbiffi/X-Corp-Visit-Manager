module.exports = function() {

  var jsonCidades = require("../db/cidades.json").cidades;

  var mensagemFaltandoCampos = "Para agendar uma visita é necessário informar todos os campos!";
  var mensagemDiasDeSemana = "Escolha uma data para visita entre segunda e sexta-feira!";

  /**
   * Objeto de retorno
   */
  var retorno = {
    title: 'Agendar visita',
    cidades: jsonCidades,
    erro: "",
    success: "",
    city: "",
    date: "",
    name: "",
    email: "",
    fone: ""
  };

  /**
   * Reinicializar campos de retorno
   */
  var clearRetorno = function(post){
    retorno.name = (post.name ? post.name : "")
    retorno.email = (post.email ? post.email : "")
    retorno.fone = (post.fone ? post.fone : "")
    retorno.city = (post.city ? post.city : "");
    retorno.date = (post.date ? post.date : "");
    retorno.erro = "";
    retorno.success = "";
  };

  /**
   * Verificar se a data escolhida esta dentro da semana para as visitas agendadas
   */
  var verifyBetweenDates = function(visita){
    var dateSchedule = new Date(visita.date + " 00:00"); //Data da visita já agendada
    var dateChoise = new Date(retorno.date + " 00:00"); //Data escolhida pelo usuario

    var intDif = 5 - dateSchedule.getDay();
    var dateMonday = new Date(dateSchedule.getTime() - ((4-intDif)*24*60*60*1000));
    var dateFriday = new Date(dateSchedule.getTime() + (intDif*24*60*60*1000));

    if(dateChoise >= dateMonday && dateChoise <= dateFriday){
      return true;
    }
    return false;
  };

  /**
   * Persistir nova visita
   */
  var persistirNovaVisita = function(){
    var fs = require("fs"); //module to write files
    var jsonVisitas = require("../db/visitas.json");
    var jsonVendedores = require("../db/vendedores.json");
    var objNovaVisita;
    var idVendedor = Math.floor((Math.random() * jsonVendedores.vendedores.length));

    if(jsonVisitas.visitas.length > 0){
      for (var i = 0; i < jsonVisitas.visitas.length; i++) {
        var visita = jsonVisitas.visitas[i];
        if (visita.cidade == retorno.city) {
          if(verifyBetweenDates(visita)){
            idVendedor = visita.vendedor;
            break;
          }
        }
      }
    }

    objNovaVisita = {
      vendedor: idVendedor,
      nome: retorno.name,
      email: retorno.email,
      telefone: retorno.fone,
      cidade: retorno.city,
      date: retorno.date
    };

    jsonVisitas.visitas.push(objNovaVisita);
    retorno.success = "Visita agendada";
    fs.writeFile( "./db/visitas.json", JSON.stringify( jsonVisitas ), "utf8" );
  }

  /**
   * retornar as funções disponíveis para a classe de controle de agendamento de visitas
   */
  return {
    retorno: retorno, //Objecto com dados de retorno
    clearRetorno: clearRetorno, //limpar campos

    /**
     * Manipular Visita
     *
     * @param post {object}
     */
    manipularVisita: function(post){

      clearRetorno(post);

      var dt;
      if(post.date != ""){
        dt = new Date(post.date + " 00:00");
      }

      if(post.name == "" || post.email == "" || post.fone == "" || post.city == "" || post.date == ""){
        retorno.erro = mensagemFaltandoCampos;
      }else if(dt.getDay() == 0 || dt.getDay() == 6){
        retorno.erro = mensagemDiasDeSemana;
      }else{
        persistirNovaVisita(post);
      }

    }

  };
}

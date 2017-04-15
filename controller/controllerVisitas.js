module.exports = function() {

  var jsonCidades = require("../db/cidades.json").cidades;

  var mensagemFaltandoCampos = "Para agendar uma visita é necessário informar todos os campos!";

  /**
   * Objeto de retorno
   */
  var retorno = {
    title: 'Agendar visita',
    cidades: jsonCidades,
    city: "",
    date: "",
    erro: "",
    name: "",
    email: "",
    fone: ""
  };

  /**
   * Reinicializar campos de retorno
   */
  var clearRetorno = function(post){
    retorno.city = (post.city ? post.city : "");
    retorno.date = (post.date ? post.date : "");
    retorno.name = (post.name ? post.name : "")
    retorno.email = (post.email ? post.email : "")
    retorno.fone = (post.fone ? post.fone : "")
    retorno.erro = "";
  };

  /**
   * Callback ao salvar nova visita
   */
  var callbackSaveVisit = function(a){
    console.log(a);
  };

  /**
   * Persistir nova visita
   */
  var persistirNovaVisita = function(){

    var fs = require("fs");
    var jsonVisitas = require("../db/visitas.json");
    console.log(jsonVisitas, "jsonVisitas");
    // var vendedor = -1;
    // if(jsonVisitas.visitas.length > 0){
    //   //TODO verificar vendedores na semana na cidade selecionada, caso não tenha cendedores continuar lógica
    // }
    // if(vendedor == -1){
    //   //TODO randomizar vendedor para a visita
    // }
    // //TODO salvar dados da visita
    //
    // fs.writeFile( "../db/visitas.json", JSON.stringify( jsonVisitas ), "utf8", salvarVisita );

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

      if(post.city == "" || post.date == "" || post.name == "" || post.email == "" || post.fone == ""){
        retorno.erro = mensagemFaltandoCampos;
      }else{
        persistirNovaVisita(post);
      }

    }

  };
}

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
    retorno.name = (post.name ? post.name : "")
    retorno.email = (post.email ? post.email : "")
    retorno.fone = (post.fone ? post.fone : "")
    retorno.city = (post.city ? post.city : "");
    retorno.date = (post.date ? post.date : "");
    retorno.erro = "";
  };

  /**
   * Callback ao salvar nova visita
   */
  var callbackSaveVisit = function(a){
    console.log(a, "retorno");
  };

  /**
   * Persistir nova visita
   */
  var persistirNovaVisita = function(){

    var fs = require("fs");

    var jsonVisitas = require("../db/visitas.json");
    var jsonVendedores = require("../db/vendedores.json");

    var objNovaVisita;

    if(jsonVisitas.visitas.length > 0){
      //TODO verificar vendedores na semana na cidade selecionada, caso não tenha cendedores continuar lógica
      for (var i = 0; i < jsonVisitas.visitas.length; i++) {
        var visita = jsonVisitas.visitas[i];
        if (visita.cidade == retorno.city) {
          console.log("É A MESMA CIDADE");
          var dataEscolhida = new Date(visita.date + " 00:00");
          console.log(dataEscolhida.getDay()," DAY");
          /*
          * TODO Verificar pela função Date o dia da semana específico da visita salvar.
          * Em seguida descobrir qual dia do més é a segunda e a sexta desta semana
          * Por final verificar se a data que o cliente escolheu sta entre estas duas datas, caso sim pegar id do mesmo vendedores
          * CASO NÃO proseguir
          */
        }
      }
    }else{
      var idVendedor = Math.floor((Math.random() * jsonVendedores.vendedores.length));

      objNovaVisita = {
        vendedor: idVendedor,
        nome: retorno.name,
        email: retorno.email,
        telefone: retorno.fone,
        cidade: retorno.city,
        date: retorno.date
      };

      jsonVisitas.visitas.push(objNovaVisita);
    }

    fs.writeFile( "./db/visitas.json", JSON.stringify( jsonVisitas ), "utf8", callbackSaveVisit );

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

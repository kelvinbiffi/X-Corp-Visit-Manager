module.exports = function() {

  var jsonCidades = require("../db/cidades.json").cidades;
  var jsonVendedores = require("../db/vendedores.json");

  var arrVisitasAgendadas;
  var idVendedor;

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
  var verifyDateChoiceIsBetweenDates = function(visita){
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
   * Alternar os vendedores de forma justa
   */
  var alternaVendedores = function(){
    var empatada = true;
    var idVendedorDeficitario;
    var menorValor = 0;

    for (var i = 0; i < jsonVendedores.vendedores.length; i++) {
      vend = arrVisitasAgendadas[i];

      if(i == 0){
        idVendedorDeficitario = i;
        menorValor = vend.visitas;

      }else{
        if(vend.visitas < menorValor){
          idVendedorDeficitario = i;
          menorValor = vend.visitas;
        }

        if(vend.visitas != arrVisitasAgendadas[i-1].visitas){
          empatada = false;
        }
      }
    }

    if(empatada){//Se todos os vendedores tiverem o mesmo número de visitas agendadas randomizar um vendedor
      idVendedor = Math.floor((Math.random() * jsonVendedores.vendedores.length));
    }else{//Caso contrário pega um dos vendedores com menos visitas agendadas
      idVendedor = idVendedorDeficitario;
    }

  };

  /**
   * Persistir nova visita
   */
  var persistirNovaVisita = function(){
    var fs = require("fs"); //module to write files
    var jsonVisitas = require("../db/visitas.json");
    var objNovaVisita;
    arrVisitasAgendadas = [];
    idVendedor = null;

    //Montar arr para contar as visitas para cada desenvolvedor
    for (var i = 0; i < jsonVendedores.vendedores.length; i++) {
      arrVisitasAgendadas.push({visitas: 0});
    }

    if(jsonVisitas.visitas.length > 0){
      for (var i = 0; i < jsonVisitas.visitas.length; i++) {
        var visita = jsonVisitas.visitas[i];
        if (visita.cidade == retorno.city) {
          if(verifyDateChoiceIsBetweenDates(visita)){
            idVendedor = visita.vendedor;
            break;
          }
        }
        arrVisitasAgendadas[visita.vendedor].visitas++;
      }
    }

    //Se não tiver um vendedor selecionado, buscar o vendedor para a próxima visita
    if(idVendedor == null){
      alternaVendedores();
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
    console.log("Visita agendada");
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

      validateVisitas = require("../validate/validateVisitas.js")(post);

      if(!validateVisitas.validateEmptyFields()){
        retorno.erro = validateVisitas.mensagemFaltandoCampos;
      }else if(!validateVisitas.validateEmail()){
        retorno.erro = validateVisitas.mensagemEmailFormatoInvalido;
      }else if(!validateVisitas.validateTelefone()){
        retorno.erro = validateVisitas.mensagemTelefoneFormatoInvalido;
      }else if(!validateVisitas.validateDate()){
        retorno.erro = validateVisitas.mensagemDataIFormatoInvalido;
      }else if(!validateVisitas.validateDiaDeSemana()){
        retorno.erro = validateVisitas.mensagemDiasDeSemana;
      }else{
        retorno.date = post.date;
        persistirNovaVisita(post);
      }

    }

  };
}

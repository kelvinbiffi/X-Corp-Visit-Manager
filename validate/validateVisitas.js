module.exports = function(post){

  return {

    mensagemFaltandoCampos: "Para agendar uma visita é necessário informar todos os campos!",
    mensagemEmailFormatoInvalido: "E-mail inválido!",
    mensagemTelefoneFormatoInvalido: "Telefone inválido!",
    mensagemDiasDeSemana: "Escolha uma data para visita entre segunda e sexta-feira!",
    mensagemDataIFormatoInvalido: "A data deve estar no formato DD/MM/YYYY!",

    /**
     * Validar se os campos estão vazios
     */
    validateEmptyFields: function(){
      var isThereEmptyFields = true;
      Object.keys(post).forEach(function(prop) {
        if(post[prop].trim() == ""){
          isThereEmptyFields = false;
        }
      });
      return isThereEmptyFields;
    },

    /**
     * Validar o formato do e-mail informado
     */
    validateEmail: function(){
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(post.email);
    },

    /**
     * Validar o formato do telefone informado
     */
    validateTelefone: function(){
      var re = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
      return re.test(post.fone);
    },

    /**
     * Validar o formato da data escolhida
     */
    validateDate: function(){
      var isValidDate = true;
      var reBR = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[012])\/\d{4}$/g;
      var re = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g;
      if(reBR.test(post.date)){
        var date = post.date.split("/");
        post.date = date[2] + "-" + date[1] + "-" + date[0];
      }else if(!re.test(post.date)){
        isValidDate = false;
      }
      return isValidDate;
    },

    /**
     * Validar se a data informada não esta no fim de semana
     */
    validateDiaDeSemana: function(){
      var isWeekDay = true;
      var dt = new Date(post.date + " 00:00");
      if(dt.getDay() == 0 || dt.getDay() == 6){
        isWeekDay = false;
      }
      return isWeekDay;
    }

  }

}

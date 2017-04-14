//Basic requires
var express = require('express');

//Iniciando Server
var app = module.exports = express.createServer();

//Server requires
require('./config/env.js')(app, express);
require('./config/routes.js')(app);

//Pegando porta predefinida para o server
var port = app.get('port');

//Definindo port de acesso
app.listen(port, function(){
  console.log('Server running at port ' + port);
});

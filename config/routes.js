module.exports = function(app){

  var index = require('../routes/index');
  var users = require('../routes/users');

  app.use('/', index);
  app.use('/users', users);

}

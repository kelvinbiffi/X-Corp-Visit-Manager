module.exports = function(app){

  var index = require('../routes/index');
  var admin = require('../routes/admin');
  var schedule = require('../routes/schedule');

  app.use('/', index);
  app.use('/schedule', schedule);
  app.use('/admin', admin);

}

module.exports = function(app, express){

  app.set('port', (process.env.PORT || 8000));
  app.use(express.static(__dirname + '/public'));
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  app.set('views engine', 'html');

  var bodyParser = require('body-parser');

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

};

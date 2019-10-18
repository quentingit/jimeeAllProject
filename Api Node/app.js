var createError = require('http-errors');
var express = require('express');
var path = require('path');
var swaggerJSDoc = require('swagger-jsdoc');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mySqlConnection = require('./databaseHelpers/mySqlWrapper')
const accessTokenDBHelper = require('./databaseHelpers/accessTokensDBHelper')(mySqlConnection)
const userDBHelper = require('./databaseHelpers/userDBHelper')(mySqlConnection)
const oAuthModel = require('./authorisation/accessTokenModel')(userDBHelper, accessTokenDBHelper)
const oAuth2Server = require('node-oauth2-server');

const test = require('./database/database')

///////////////////////////////////////////////////////////////////////////////
// SWAGGER GENERATE - SWAGGER GENERATE - SWAGGER GENERATE- SWAGGER GENERATE ///
///////////////////////////////////////////////////////////////////////////////
var swaggerDefinition = {
    info: {
        title: 'Swagger Doc API',
        version: '1.0.0',
        description: 'documentation api Jimmee',
    },
    host: 'localhost:8081',
    basePath: '/',
};

// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./app/routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

///////////////////////////////////////////

var app = express();

var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



///////////////////////////////////////////////////////
// SWAGGER UI - SWAGGER UI - SWAGGER UI- SWAGGER UI ///
///////////////////////////////////////////////////////

var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = swaggerSpec;


///////////////////////////////////////////////
/// ROUTES -- ROUTES -- ROUTES -- ROUTES -- ///
///////////////////////////////////////////////
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Anciennement route :

//var usersRouter = require('./routes/users'); // obtension ID utilisateurs jimee
//var infoRouter = require('./routes/info'); // information compte instagram

/*var serviceRouter = require('./routes/service'); // information sur le service instapy
var configFollow = require('./routes/configFollow'); // informations sur les configuration (max/min follow/ings/ers)
var tagLikes = require('./routes/tagLikes'); // opérations sur les tag likes
var tagComments = require('./routes/tagComments'); // opérations sur les tag commentaires
var userLogs = require('./routes/userLogs'); // récupère les logs instapy
var instaAccounts = require('./routes/instaAccounts'); // opérations sur les comptes instagram d'un utilisateur
*/
//var loginRouter = require('./app/routes/login');
//var registerRouter = require('./routes/register');

// Modèle MCV ------------------------

let usersRoutes = require('./app/routes/usersroutes'); // obtension ID utilisateurs jimee
let instaAccountsRoutes = require('./app/routes/instaaccountsroutes'); // opérations sur les comptes instagram d'un utilisateur
let configUserInstaRoutes = require('./app/routes/configuserinstaroutes'); // information sur le service instapy
let configFollowRoutes = require('./app/routes/configfollowroutes'); // informations sur les configuration (max/min follow/ings/ers)
let tagCommentsRoutes = require('./app/routes/tagcommentsroutes'); // opérations sur les tag commentaire
let tagLikesRoutes = require('./app/routes/taglikesroutes'); // opérations sur les tag likes
let userLogsRoutes = require('./app/routes/userlogsroutes'); // récupère les logs instapy
let statsRoutes = require('./app/routes/statsroutes'); // récupère les dernières stats pour graph
let actionRoutes = require('./app/routes/actionroutes'); // actions que l'utilisateur peut utiliser
let conseilsRoutes = require('./app/routes/conseilsroutes'); // actions que l'utilisateur peut utiliser
let coursRoutes = require('./app/routes/coursroutes'); // actions que l'utilisateur peut utiliser
let profilRoutes = require('./app/routes/profilroutes'); // actions que l'utilisateur peut utiliser


// OAUTH2 ---------------------------

app.oauth = oAuth2Server({
  model: oAuthModel,
  grants: ['password'],
  debug: true
});
const restrictedAreaRoutesMethods = require('./restrictedArea/restrictedAreaRoutesMethods.js')
const restrictedAreaRoutes = require('./restrictedArea/restrictedAreaRoutes.js')(express.Router(), app, restrictedAreaRoutesMethods)
const authRoutesMethods = require('./authorisation/authRoutesMethods')(userDBHelper)
const authRoutes = require('./authorisation/authRoutes')(express.Router(), app, authRoutesMethods)



// Configurations OAuth2
app.use(app.oauth.errorHandler())
// Routes pour login & register
app.use('/auth', authRoutes)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger(':date :: :method :url :status :response-time ms - :res[content-length] - :remote-addr <-> :remote-user')); // affiche les logs avec la date
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//

usersRoutes(app);
instaAccountsRoutes(app);
configUserInstaRoutes(app);
configFollowRoutes(app);
tagLikesRoutes(app);
tagCommentsRoutes(app);
userLogsRoutes(app);
statsRoutes(app);
actionRoutes(app);
conseilsRoutes(app);
coursRoutes(app);
profilRoutes(app);



// Liste des routes

app.get('/', (req, res) => res.send('{"Jimee api version":1.0}'));
app.use('/users', app.oauth.authorise(), usersRoutes);
app.use('/instaAccounts', app.oauth.authorise(), instaAccountsRoutes);
app.use('/configUserInsta', app.oauth.authorise(), configUserInstaRoutes);
app.use('/configFollow', app.oauth.authorise(), configFollowRoutes);
app.use('/tagLikes', app.oauth.authorise(), tagLikesRoutes);
app.use('/tagComments', app.oauth.authorise(), tagCommentsRoutes);
app.use('/userLogs', app.oauth.authorise(), userLogsRoutes);
app.use('/stats', app.oauth.authorise(), statsRoutes);


// OAUTH SECURITE, AJOUTER : expressApp.oauth.authorise(), restrictedAreaRoutesMethods.accessRestrictedArea

// Anti-crash
process.on('uncaughtException', function (err) {
  console.error(Date()+" :: "+err);
  console.log("Node NOT Exiting...");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(8081, () => console.log("Listening on port 8081!"));

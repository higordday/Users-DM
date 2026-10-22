
const session = require('express-session');
const flash = require('connect-flash');

function express_conf_session(application, EXPRESS_SESSION_SECRET_KEY) 
{

    application.use
    (
        session({ secret: EXPRESS_SESSION_SECRET_KEY, resave: true, saveUninitialized: true })
    );

    application.use(flash());

}

module.exports = express_conf_session;

const ejs = require('ejs');

function express_conf_ejs(application, path) 
{

    application.engine('ejs', ejs.renderFile);
    application.set('view engine', 'ejs');

    application.set('views', path.join(__dirname, './../views'));

}

module.exports = express_conf_ejs;
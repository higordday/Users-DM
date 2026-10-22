
const body_parser = require('body-parser');

function express_conf_body_parser(application) 
{

    application.use(body_parser.urlencoded({ extended: false }))
    application.use(body_parser.json());

}

module.exports = express_conf_body_parser;
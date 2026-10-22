
const jsonwebtoken = require('jsonwebtoken');
const store = require('store');

function authentication_middleware(application) 
{

    application.use( (request, response, next) => 
    {

        if (!store.get('jwt_generated_login_token')) { return next(); }

        const json_web_token_value = store.get('jwt_generated_login_token');

        jsonwebtoken.verify(json_web_token_value, process.env.JWT_SECRET_TOKEN, (error, data) =>
        {

            if (error) { response.json({ status: false, error: 'Authentication Validation Failed' }); }

            request.user = data;

        });

        next();

    });

}

module.exports = authentication_middleware;
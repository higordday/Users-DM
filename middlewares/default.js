
function default_middleware(application) 
{

    application.use( (request, response, next) => 
    {

        response.locals.failure = request.flash('failure');
        response.locals.success = request.flash('success');

        next();

    });

}

module.exports = default_middleware;
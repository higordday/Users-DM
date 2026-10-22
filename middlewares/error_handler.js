
function error_handler_middleware(obj, request, response, next) 
{

    try 
    {

        console.error(obj.error.message);

        request.flash('failure', obj.error.message); response.redirect(obj.redirect);
    
    } catch (error) 
    {

        response.json({ status: false, message: 'Fatal Error', obj: obj });

    }
    
}

module.exports = error_handler_middleware;
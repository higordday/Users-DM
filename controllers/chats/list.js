
const list_chats_model = require('./../../models/chats/list.js');

exports.list = async(request, response, next) =>
{

    (async() => 
    {
        try 
        {

            const chats = await list_chats_model();

            const user = (request.user) ? request.user : null;

            response.render('index', { chats: chats, user: user });

        } catch (error) 
        {

            console.error(error.message);

            response.json({ message: error.message });

        }
    })();

}
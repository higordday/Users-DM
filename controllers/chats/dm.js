
const dmm = require('./../../models/chats/dm.js');
const dm_model = new dmm();

exports.dm = async(request, response, next) => 
{

    if (!request.user) { return response.json({ access: 'Unauthorized', message: 'You are not logged in' }); }

    const logged_username = request.user.username;
    const target_username = request.params.target_username;

    if (logged_username.toLowerCase() == target_username.toLowerCase()) { return response.json({ access: 'Unauthorized', message: 'You cannnot chat yourself' }); }

    (async() => 
    {
        try 
        {

            const user_existence = await dm_model.user_existence(target_username);

            if (!user_existence) 
            {

                return response.json({ access: 'Unauthorized', message: 'The user does not exist' });

            }

            handle_chat();

        } catch (error) 
        {

            next({ redirect: '/', error: error });

        }
    })();

    function handle_chat() 
    {

        (async() => 
        {
            try 
            {

                const chat_existence = await dm_model.chat_existence(logged_username, target_username);

                if (!chat_existence.status) 
                {

                    create_chat();

                } else 
                {

                    open_chat(chat_existence.chat_id);

                }

            } catch (error) 
            {

                next({ redirect: '/', error: error });

            }
        })();

    }

    function create_chat() 
    {

        (async() => 
        {
            try 
            {

                const chat_id = await dm_model.create_chat(logged_username, target_username);

                open_chat(chat_id);

            } catch (error) 
            {

                next({ redirect: '/', error: error });

            }
        })();

    }

    function open_chat(chat_id) 
    {

        (async() => 
        {
            try 
            {

                const messages = await dm_model.previous_messages(chat_id);

                const user = (request.user) ? request.user : null;

                response.render('dm', { chat_id: chat_id, logged_username: logged_username, target_username: target_username, messages: messages, user: user });

            } catch (error) 
            {

                next({ redirect: '/', error: error });

            }
        })();

    }

}
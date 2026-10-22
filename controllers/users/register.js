
const rm = require('./../../models/users/register.js');
const register_model = new rm();

const list_chats_model = require('./../../models/chats/list.js');

exports.register = async(request, response, next) =>
{

    (async() => 
    {
        try 
        {

            const { username, password, password_confirmation } = request.body;

            const chats = await list_chats_model();

            const user = (request.user) ? request.user : null;

            if ((!username) || (!password) || (!password_confirmation)) 
            {

                response.render('index', { register_form_failure: 'Enter the Username, Password and Password Confirmation', chats: chats, user: user }); return;

            }

            if ((username.length < 3) || (username.length > 16)) 
            {

                response.render('index', { register_form_failure: 'The Username must be between 3 and 16 characters long', chats: chats, user: user }); return;

            }

            if (/^[a-zA-Z0-9_]+$/.test(username) == false) 
            {

                response.render('index', { register_form_failure: 'Special characteres are not allowed in the username', chats: chats, user: user }); return;

            }

            if (password.length < 8) 
            {

                response.render('index', { register_form_failure: 'The Password must be at least 8 characters long', chats: chats, user: user }); return;

            }

            if (password_confirmation != password) 
            {

                response.render('index', { register_form_failure: 'Password must match', chats: chats, user: user }); return;

            }

            (async() => 
            {
                try 
                {

                    const username_availability = await register_model.username_availability(username);

                    if (!username_availability) 
                    {

                        response.render('index', { register_form_failure: 'Username already in use', chats: chats, user: user }); return;

                    }

                    reg();

                } catch (error) 
                {

                    next({ redirect: '/', error: error });

                }
            })();

            function reg() 
            {

                (async() => 
                {
                    try 
                    {

                        await register_model.register(username, password);

                        request.flash('success', 'Successfully registered user'); response.redirect('/');

                    } catch (error) 
                    {

                        next({ redirect: '/', error: error });

                    }
                })();

            }

        } catch (error) 
        {

            console.error(error.message);

            response.json({ message: error.message });

        }
    })();

}
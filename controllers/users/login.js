
const lm = require('./../../models/users/login.js');
const login_model = new lm();

const list_chats_model = require('./../../models/chats/list.js');

exports.login = async(request, response, next) => 
{

    (async() => 
    {
        try 
        {

            const { login, password } = request.body;

            const chats = await list_chats_model();

            const user = (request.user) ? request.user : null;

            if ((!login) || (!password)) 
            {

                response.render('index', { login_form_failure: 'Enter the authentication credentials', chats: chats, user: user }); return;

            }

            (async() => 
            {
                try 
                {

                    const auth = await login_model.user(login, password);

                    if (!auth.status) 
                    {

                        next({ redirect: '/', error: { message: 'Invalid Data' } }); return;

                    }

                    log(auth.data);

                } catch (error) 
                {

                    next({ redirect: '/', error: error });

                }
            })();

            function log(user_data) 
            {

                login_model.jwt(user_data); response.redirect('/');

            }

        } catch (error) 
        {

            console.error(error.message);

            response.json({ message: error.message });

        }
    })();

}
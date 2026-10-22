
const database = require('./../../database/model.js');

const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const store = require('store');

class login_model 
{

    user(username, password) 
    {

        return new Promise( (resolve, reject) => 
        {
            database.execute('select id, username, password from users where username = ?', [username.toLowerCase()], (error, results, fields) => 
            {

                if (error) { return reject(error); }

                if (!results[0]) { return resolve({ status: false, reason: 'no_user', data: null }); }

                bcrypt.compare(password, results[0].password, (error, match) => 
                {

                    if (error) { return reject(error); }

                    if (!match) 
                    {

                        return resolve({status: false, reason: 'invalid_password', data: null });

                    }

                    resolve({ status: true, reason: null, data: { id: results[0].id, username: results[0].username }});

                });

            });
        });

    }

    jwt(user_data) 
    {

        const token = jsonwebtoken.sign(user_data, process.env.JWT_SECRET_TOKEN, { expiresIn: process.env.JWT_EXPIRES_IN });

        store.set('jwt_generated_login_token', token);

    }

}

module.exports = login_model;
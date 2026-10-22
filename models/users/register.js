
const database = require('./../../database/model.js');

const bcrypt = require('bcryptjs');
const crypto = require('crypto');

class register_model 
{

    username_availability(username) 
    {

        return new Promise( (resolve, reject) => 
        {
            database.execute('select * from users where lower(username) = ?', [username.toLowerCase()], (error, results, fields) => 
            {

                if (error) { return reject(error); }

                if (results[0]) { return resolve(false); }

                resolve(true);

            });
        });

    }

    register(username, password) 
    {

        return new Promise( (resolve, reject) => 
        {
            bcrypt.genSalt(10, (error, salt) => 
            {

                if (error) { return reject(error); }

                bcrypt.hash(password, salt, (error, hashed_password) => 
                {

                    if (error) { return reject(error); }

                    database.execute
                    (
                        'insert into users (id, username, password) values (?, ?, ?)', [crypto.randomBytes(5).toString('hex'), username, hashed_password], (error) => 
                        {

                            if (error) { return reject(error); }

                            resolve(true);

                        }
                    );

                });

            });
        });

    }

}

module.exports = register_model;
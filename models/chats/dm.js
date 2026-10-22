
const database = require('./../../database/model.js');

const crypto = require('crypto');

class dm_model 
{

    user_existence(target_username) 
    {

        return new Promise( (resolve, reject) => 
        {
            database.execute('select * from users where lower(username) = ?', [target_username], (error, results, fields) => 
            {

                if (error) { return reject(error); }

                if (!results[0]) { return resolve(false); }

                resolve(true);

            });
        });

    }

    chat_existence(logged_username, target_username) 
    {

        return new Promise( (resolve, reject) => 
        {
            database.execute('select id from chats where (username_1 = ? and username_2 = ?) or (username_1 = ? and username_2 = ?)', [logged_username, target_username, target_username, logged_username], (error, results, fields) => 
            {

                if (error) { return reject(error); }

                if (!results[0]) { return resolve({ status: false, chat_id: null }); }

                resolve({ status: true, chat_id: results[0].id });

            });
        });

    }

    create_chat(logged_username, target_username) 
    {

        const chat_id = crypto.randomBytes(5).toString('hex');

        return new Promise( (resolve, reject) => 
        {
            database.execute('insert into chats (id, username_1, username_2) values (?, ?, ?)', [chat_id, logged_username, target_username], (error) => 
            {

                if (error) { return reject(error); }

                resolve(chat_id);

            });
        });

    }

    previous_messages(chat_id) 
    {

        return new Promise( (resolve, reject) => 
        {
            database.execute('select from_username, to_username, message from messages where chat = ?', [chat_id], (error, results, fields) => 
            {

                if (error) { return reject(error); }

                resolve(results);

            });
        });

    }

}

module.exports = dm_model;
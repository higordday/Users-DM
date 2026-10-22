
const database = require('./../../database/model.js');
const crypto = require('crypto');

function send_message(data) 
{

    return new Promise( (resolve, reject) => 
    {
        database.execute('insert into messages (id, chat, from_username, to_username, message) values (?, ?, ?, ?, ?)', [crypto.randomBytes(5).toString('hex'), data.chat, data.from_username, data.to_username, data.message], (error) => 
        {

            if (error) { return reject(error); }

            resolve(true);

        });
    });

}

module.exports = send_message;
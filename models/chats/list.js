
const database = require('./../../database/model.js');

function list_chats_model() 
{

    return new Promise( (resolve, reject) => 
    {
        database.execute('select username from users order by db_id desc', (error, results, fields) => 
        {

            if (error) { return reject(error); }

            resolve(results);

        });
    });

}

module.exports = list_chats_model;
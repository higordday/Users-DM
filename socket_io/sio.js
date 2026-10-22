
const send_message = require('./messages/send.js');

function socket_io_handler(sio) 
{

    sio.on('connection', (socket) => 
    {

        socket.on('join_chat', (chat_id) => { socket.join(chat_id); });

        socket.on('leave_chat', (chat_id) => { socket.leave(chat_id); });

        socket.on('send', (data) => 
        {

            (async() => 
            {
                try 
                {

                    await send_message(data);
                    
                } catch (error) 
                {

                    console.error(error.message);

                }
            })();

            sio.to(data.chat).emit('broadcast', data);

        });

    });

}

module.exports = socket_io_handler;
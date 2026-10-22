
const http = require('http');
const socket_io = require('socket.io')
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// ---

const application = express();

// ---

const server = http.createServer(application);
const sio = socket_io(server);

// ---

dotenv.config();

// ---

const express_conf_session = require('./express_conf/session.js');

express_conf_session(application, process.env.EXPRESS_SESSION_SECRET_KEY)

// --- Middlewares

const default_middleware        =        require('./middlewares/default.js');
const authentication_middleware = require('./middlewares/authentication.js');

default_middleware       (application);
authentication_middleware(application);

// ---

const express_conf_ejs         =         require('./express_conf/ejs.js');
const express_conf_body_parser = require('./express_conf/body_parser.js');
const express_conf_static      =      require('./express_conf/static.js');

express_conf_ejs(            application, path);
express_conf_body_parser(          application);
express_conf_static(application, express, path);

// --- Routes

application.use(require('./routes/index.js'));

// --- Routes :: Users

application.use(require('./routes/users/register.js'));
application.use(require('./routes/users/login.js'));

// ------

// --- Routes :: Chats

application.use(require('./routes/chats/dm.js'));

// ------

// --- Error Handler Middleware

const error_handler_middleware = require('./middlewares/error_handler.js');

application.use(error_handler_middleware);

// --- Web Sockets

const socket_io_handler = require('./socket_io/sio.js');

socket_io_handler(sio);

// ---

server.listen
(
    process.env.SERVER_LISTENING_PORT, console.log(`\nServer Listening on ${process.env.SERVER_LISTENING_PORT} Port`)
);
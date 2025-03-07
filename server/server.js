const express = require('express');
const socketIO =  require("socket.io");
const http = require("http");
const path = require('path');
const fs = require('fs');
const { send } = require('process');


const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3001;

app.use(express.static(publicPath));
// app.get('/', (req, res)=>{
//     res.send('<a href="./user/index.html">Iniciar chat</a>')
// })

// IO : esta es la comunicacion del backend.
module.exports.io = socketIO(server);
require('./sockets/mainSocket');


server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en http://localhost:${ port }`);

});
const {io} = require('../server');

io.on('connection', (client)=>{
    console.log(`Usuario conectado ${client.data.usuario}`);
    //  Detectando la desconexion del usuario.
    client.on('disconnect', (user)=>{
        console.log(`Usuario desconectado`);
    });

    // Escuchar el cliente.
    client.on('enviarMensaje', (data, callback)=>{
        // console.log(data);
        client.emit('enviarMensaje');

        if(data.usuario){
            enviar(data);
            callback({
                resp:"Todo Salio Bien!"
            })
        }else{
            callback({
                resp: "Todo Salio Mal"
            });
        }

    });

    function enviar(data){
        client.broadcast.emit('enviarMensaje', {
            usuario: data.usuario, 
            mensaje: data.mensaje
        });
    }

    // Enviar mensaje al cliente

});
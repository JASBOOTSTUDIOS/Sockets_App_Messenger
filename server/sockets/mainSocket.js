const {io} = require('../server')

io.on('connection', (client)=>{
    console.log(`Usuario conectado ${client}`);
    //  Detectando la desconexion del usuario.
    client.on('disconnect', ()=>{
        console.log(`Usuario desconectado`);
    });

    // Escuchar el cliente.
    client.on('enviarMensaje', (data, callback)=>{
        console.log(data);
        // client.emit('enviarMensaje',data);

        // if(mensaje.usuario){
        //     callback({
        //         resp:"Todo Salio Bien!"
        //     })
            enviar(data.mensaje)
        // }else{
        //     callback({
        //         resp: "Todo Salio Mal"
        //     });
        // }

    });

    function enviar(s){
        client.broadcast.emit('enviarMensaje', {
            usuario: 'Administrador', 
            mensaje: s
        });
    }

    // Enviar mensaje al cliente

});
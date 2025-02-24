const {io} = require('../server');
let users = [];
io.on('connection', (client)=>{
    console.log(`Usuario conectado ${client.id}`);
    //  Detectando la desconexion del usuario.
    client.on('disconnect', (user)=>{
        console.log(`Usuario desconectado`);
    });
    
// Mensajes Privados ===============================================================
   

//  Resgistrando usuarios.
io.on('register', function (userId){
    console.log(`Usuario Registrado: ${userId} con socket ${client.id}`);
    // users.push({userId, socketId: client.id});
});

//  Mensajes Privados.

io.on('private_message',({senderId, receiverId, message})=>{
    const receiver = users.find((user)=> user.userId === receiverId);

    if(receiver){
        io.to(receiver.socketId).emit("receiver_message",{
            senderId,
            message,
        });
        console.log(`Mensaje enviado a ${receiverId}: ${message}`);
    }else {
        console.log(`Usuario ${receiverId} no encontrado`);
      }
});

//  Eliminar usuario cuando se desconecte.

io.on("disconnect", ()=>{
    console.log(users);
    const index = users.findIndex((user)=>user.socketId === socket.id);
    if (index !== -1) {
        console.log(`Usuario desconectado: ${users[index].userId}`);
        users.splice(index, 1);
    }
});

// Mensajes Privados ========================================================================
      
    // Escuchar el cliente =============================
    client.on('enviarMensaje', (data, callback)=>{
        client.emit('enviarMensaje');
        if(data.usuario){
            enviar(data);
            callback({
                resp:"Todo Salio Bien!"
            });
        }else{
            callback({
                resp: "Todo Salio Mal"
            });
        }

    });
// Enviar data ========================================
    function enviar(data){
        client.broadcast.emit('enviarMensaje', {
            usuario: data.usuario, 
            mensaje: data.mensaje
        });
    }
    // Enviar mensaje al cliente
});
// console.log(users)
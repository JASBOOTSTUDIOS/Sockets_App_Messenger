var socket = io();
socket.on('connect', function(){
    console.log(`Conectado al servidor.`);
});
// Los on son para escuchar
socket.on('disconnect', function(){
    console.log(`Perdimos conexion con el servidor`)
})
function enviarSocket(){
    let mensaje = document.getElementById('mensaje');
    //  Son para enviar informacion.
    socket.emit('enviarMensaje', {
        usuario: 'Jefry Astacio',
        mensaje: mensaje.value

    }, function(resp){
        console.log(resp);
    });
    mensaje.value = '';
}

// Escuchar informacion.
let chats = document.getElementById('chats');
socket.on('enviarMensaje', function (mensaje){
    console.log(mensaje.mensaje);
    chats.innerHTML +=  `<p style="text-align:right; color: rgb(3, 82, 56);">${mensaje.mensaje}</p>`;
})
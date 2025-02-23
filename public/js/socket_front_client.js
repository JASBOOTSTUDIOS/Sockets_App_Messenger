var socket = io();
let statusMesage = "";

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.getElementById("enviar").click();
    }
});

socket.on('connect', function(){
    console.log(`Conectado al servidor.`);
});
// Los on son para escuchar
socket.on('disconnect', function(){
    console.log(`Perdimos conexion con el servidor`);
})
function enviarSocket(){
    let mensaje = document.getElementById('mensaje');
    let user = document.getElementById('user');
    //  Son para enviar informacion.
    socket.emit('enviarMensaje', {
        usuario: user.value,
        mensaje: mensaje.value
    }, function(resp){
        console.log(resp);
    });
    statusMesage = mensaje.value;
    mensaje.value = '';
}

// Escuchar informacion.
socket.on('enviarMensaje', function (mensaje){
    let chats = document.getElementById('chats');
    let u_mensaje = document.getElementById('mensaje');
    console.log(u_mensaje.value);
    if(!mensaje){

        chats.innerHTML +=  `<div class="row">
      <div class="col-3"></div>
      <div class="alert alert-success col col-sm-9">
        <p class="text-end text-primary" style="font-size:x-small;">Tú</p>
        <p class="text-end" style="font-size:small;">${statusMesage}</p>
      </div>
    </div>`;

        // chats.innerHTML +=  `<p style="text-align:right; background: rgb(0, 62, 41); color: rgb(255, 255, 255);">${statusMesage}</p>`;
    }else{

        chats.innerHTML +=  `<div class="row">
      <div class="alert alert-info col col-sm-9">
        <p class="text-success" style="font-size:x-small;">${mensaje.usuario}</p>
        <p style="font-size:small;">${mensaje.mensaje}</p>
      </div>
      <div class="col-3"></div>
    </div>`;
        // chats.innerHTML +=  `<p style="text-align:right; background: rgb(0, 198, 132); color: rgb(0, 0, 0);">${mensaje.mensaje}</p>`;
    }
})
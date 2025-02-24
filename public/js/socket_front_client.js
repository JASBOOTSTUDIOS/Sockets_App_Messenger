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
});
function enviarSocket(){
    let mensaje = document.getElementById('mensaje');
    let user = document.getElementById('user');
    //  los emit son para enviar informacion.
    if(user.value === "Selecciones un Usuario"){
        alert(`Error, debe de seleccionar su usuario.`);
    }else if(mensaje.value){
        console.log(mensaje.value)
        socket.emit('enviarMensaje', {
            usuario: user.value,
            mensaje: mensaje.value
        }, function(resp){
            console.log(resp);
        });
        statusMesage = mensaje.value;
        mensaje.value = '';
    }else{
        alert(`${user.value}, Pariguallo! no deje el mensaje vacio `);
    }
}

// Escuchar informacion.
socket.on('enviarMensaje', function (mensaje){
    let enviado = `<p class="text-end text-secondary" style="font-size:x-small;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg></p>`;
    let entragado = `<p class="text-end text-secondary" style="font-size:x-small;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
</svg></p>`; 
    let visto = `<p class="text-end text-primary" style="font-size:x-small;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-all" viewBox="0 0 16 16">
  <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486z"/>
</svg></p>`;

    let mensageStatus = visto;
    let chats = document.getElementById('chats');
    let u_mensaje = document.getElementById('mensaje');
    console.log(u_mensaje.value);
    if(!mensaje){

        chats.innerHTML +=  `<div class="row">
      <div class="col-3"></div>
      <div class="alert alert-success col col-sm-9">
        <p class="text-end text-primary" style="font-size:x-small;">Tú</p>
        <p class="text-end" style="font-size:small;">${statusMesage}</p>
        ${mensageStatus}
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
});

// Seccion de mensajes privados =================================

function miNombre(){
    // alert("funciona")
    let _miNombre = document.getElementById("miNombre");
    let user = document.getElementById("user");
    _miNombre.innerHTML = user.value
}

let received_Id = document.getElementById("msm_private");
let emiter_Id = document.getElementById("emiter_Id");
let msm_send_private = document.getElementById("msm_send_private");

socket.on("receive_message", (data)=>{
    alert(data);
});
socket.off("receive_message");

function registerUser(){
    alert(msm_send_private.value);
    if(msm_send_private.value){
        socket.emit("register", msm_send_private.value);
    }
}

function sendMensaje(){
    if(received_Id.value && msm_send_private.value){
        socket.emit("private_message", {
            senderId: emiter_Id.value,
            receiverId:emiter_Id.value,
            message:msm_send_private
        });
        msm_send_private.value = "";
    }
}
// Seccion de mensajes privados =================================
import { atualizaTextEditor } from "./documento.js";

const socket = io();


function selecionarDocumento(nome){ 
    socket.emit('select-document', nome)
}


socket.on('text-editor-client', (value) => {
    atualizaTextEditor(value) //Escuta eventos do servidor
})

function sendTextEditor(data){
    socket.emit('text-editor', data); //Emite evento para o server escutar (listen) esse evento
}

export { sendTextEditor, selecionarDocumento }
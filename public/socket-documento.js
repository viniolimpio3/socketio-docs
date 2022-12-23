import { updateTextEditor } from "./documento.js";

const socket = io();


function selecionarDocumento(nome){ 
    socket.emit('select-document', nome, (text) => { //param 'callback' - no backend
        updateTextEditor(text);
    });
}


socket.on('text-editor-client', (value) => { //Escuta eventos do servidor
    updateTextEditor(value) 
})

// socket.on('document_text', (text) => {
//     updateTextEditor(text)
// })

function sendTextEditor(data){
    socket.emit('text-editor', data); //Emite evento para o server escutar (listen) esse evento
}

export { sendTextEditor, selecionarDocumento }
import { alertAndRedirect, updateTextEditor } from "./documento.js";

const socket = io();


socket.on('text-editor-client', (value) => { //Escuta eventos do servidor
    updateTextEditor(value) 
});

socket.on('doc_deleted', documentName => {
    alertAndRedirect(documentName)
});

// Caso não fosse implementado o Acknowledgment no server:
// socket.on('document_text', (text) => {
//     updateTextEditor(text)
// })

function selecionarDocumento(nome){ 
    socket.emit('select-document', nome, (text) => { //param 'callback' - no backend
        updateTextEditor(text);
    });
}

function sendTextEditor(data){
    socket.emit('text-editor', data); //Emite evento para o server escutar (listen) esse evento
}

function deleteDocument (pageName) {
    socket.emit('delete-document', pageName);
}


export { sendTextEditor, selecionarDocumento, deleteDocument }
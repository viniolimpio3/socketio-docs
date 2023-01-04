import { insertDocumentLink, removeDocumentLink } from "./index.js";

const socket = io();

socket.on('add_doc_interface', (documentName) => {
    insertDocumentLink(documentName);
})

socket.on('doc_exists', (documentName) => {
    window.alert(`Documento ${documentName} já existe`)
})

socket.on('doc_deleted', (documentName) => {
    removeDocumentLink(documentName);
})


function carregaSockDocs() {
    socket.emit('carrega-sock-docs', (data) => {
        //Callback - sendo 'data' as informações retornadas pelo backend
        data.forEach(item => {
            console.log(item)
            insertDocumentLink(item.page)
        })
    })
}

function insertDoc(name) {
    socket.emit('insert-doc', name);
}

export { carregaSockDocs, insertDoc }
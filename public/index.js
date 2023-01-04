import { carregaSockDocs, insertDoc } from "./socket-index.js";

const documentList = document.getElementById('lista-documentos');

const formAddDoc = document.getElementById('form-adiciona-documento');

function insertDocumentLink(documentName) {

    let a = document.createElement('a');
    
    a.setAttribute('href', `documento.html?page=${encodeURIComponent(documentName)}`)
    a.id = documentName;
    a.textContent = documentName;
        
    a.setAttribute('class', 'list-group-item list-group-item-action')

    documentList.append(a);
}

function removeDocumentLink(documentName) {
    let a = document.getElementById(documentName);

    a.remove();
}


window.onload = () => {
    carregaSockDocs()
}

formAddDoc.onsubmit = (e) => {
    e.preventDefault();
    
    const inputDocName = document.getElementById('input-documento')

    insertDoc(inputDocName.value)
    inputDocName.value = ''
}

export { insertDocumentLink, removeDocumentLink }
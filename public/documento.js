import { selecionarDocumento, sendTextEditor } from "./socket-documento.js";


const pageName = new URLSearchParams(window.location.search).get('page')

const docTitle = document.getElementById('titulo-documento');

docTitle.textContent = pageName || 'Documento sem título';
document.title = docTitle.textContent;

selecionarDocumento(pageName);

const textEditor = document.getElementById('editor-texto');

textEditor.addEventListener('keyup', () => { //Evento da DOM, não do socketIO
    sendTextEditor({
        value: textEditor.value, 
        docName: pageName
    })
});

function atualizaTextEditor(text){ 
    textEditor.value = text
}

export { atualizaTextEditor }
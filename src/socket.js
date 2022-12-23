import io from "./server.js"


const documentos = [
    {
        page: "JavaScript",
        texto: "Text de javascript"
    },
    {
        page: "Node",
        texto: "Text de Node"
    },
    {
        page: "Socket.io",
        texto: "Text de Socket.io"
    }
];


io.on('connection', (socket) => {

    console.log(`Um client se conectou! ID: ${socket.id}`)

    socket.on('select-document', (documentName, returnText) => {

        socket.join(documentName);

        const doc = findDocument(documentName);

        if(doc){
            //socket.emit('document_text', doc.texto); 
            //emite apenas para o client desse socket - que se conectou!

            //Acknowledgment - quando um client publica evento para o servidor e espera receber um dado de volta!!!
            
            returnText(doc.texto) //executa um callback no frontend assim que o evento select-document for emitido!
        }
    });

    socket.on('text-editor', ({value, docName}) => {

        const doc = findDocument(docName);

        if(doc){
            doc.texto = value;

            socket.to(docName).emit('text-editor-client', value); //devolve apenas para os clients nessa sala!!
        }
    });
})


function findDocument(documentName){
    return documentos.find((doc) => {
        return doc.page == documentName
    });
}
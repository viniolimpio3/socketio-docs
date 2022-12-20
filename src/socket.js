import io from "./server.js"


io.on('connection', (socket) => {
    socket.on('select-document', (documentName) => {
        socket.join(documentName);
    });

    socket.on('text-editor', (data) => {
        let { value, docName } = data;
        
        socket.to(docName).emit('text-editor-client', value);
    });
})
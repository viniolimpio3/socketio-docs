import io from "./server.js"
import socketDocs from "./model/SocketDoc.js";

io.on('connection', (socket) => {

    console.log(`Um client se conectou! ID: ${socket.id}`)

    socket.on('select-document', async (documentName, returnText) => {

        socket.join(documentName);

        const doc = await socketDocs.findOne({ page: documentName });

        if (doc) {
            //socket.emit('document_text', doc.text); 
            //emite apenas para o client desse socket - que se conectou!

            //Acknowledgment - quando um client publica evento para o servidor e espera receber um dado de volta!!!

            returnText(doc.text) //executa um callback no frontend assim que o evento select-document for emitido!
        } else if (!doc && documentName) {

            const newPage = new socketDocs({
                page: documentName,
                text: `Documento de ${documentName}.`
            });

            //cria documento
            let created = await newPage.save();

            console.log(`Documento criado ${created}`);

            returnText(newPage.text);

        }
    });

    socket.on('text-editor', async ({ value, docName }) => {

        socketDocs.updateOne({ page: docName }, { $set: { text: value } }, (err) => {
            if (!err) {
                socket.to(docName).emit('text-editor-client', value); //devolve apenas para os clients nessa sala!!

                console.log(`Update do document ${docName} realizado com sucesso!`);
                return;
            }

            console.error(err);
        });
       
    });

    socket.on('carrega-sock-docs', async (returnDocs) => {
        let docs = await socketDocs.find({}, {page: 1, text: 1});

        if(!docs){
            return;
        }

        docs = docs.map((element) => {
            return {
                page: element.page
            }
        })
        returnDocs(docs)
    });


    socket.on('insert-doc', async (docName, returnDoc) => {
        const docExists = (await socketDocs.findOne({ page: docName })) !== null;

        if(docExists)
            socket.emit('doc_exists', docName);
        else{
            const newPage = new socketDocs({
                page: docName,
                text: `Documento de ${docName}.`
            });
    
            //cria documento
            let created = await newPage.save();
    
            console.log(`Documento criado ${created}`);
    
            io.emit('add_doc_interface', created.page);
        }
    });


    socket.on('delete-document', (docName) => {
        socketDocs.remove({page: docName}, (err) => {
                        
            if(!err !== null){ 
                io.emit('doc_deleted', docName);
            }
        })
    });
})
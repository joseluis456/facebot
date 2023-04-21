const login = require("facebook-chat-api");
const fs = require ('fs');

const credential = { appState : JSON.parse(fs.readFileSync('appstate.json', 'utf-8')) }

// login({email: "miguel.angel.miranda.espejo@gmail.com", password: "jlhnjlhn"}, (err, api) => {
//     if(err) return console.error(err);

//     fs.writeFileSync('appstate.json', JSON.stringify(api.getAppState()));
// });

login(credential, (err, api) => {
    if(err) return console.error(err);

    api.setOptions({
        logLevel: "silent"
    });

    api.listenMqtt((err, message) => {
        const date = new Date();
        const fecha = `${ date.getFullYear() }/${ (date.getMonth()+1).toString().padStart(2, '0') }/${ date.getDate().toString().padStart(2, '0') }`
        const hora = `${ date.getHours().toString().padStart(2, '0') }:${ date.getMinutes().toString().padStart(2, '0') }:${ date.getSeconds().toString().padStart(2, '0') }`
        console.log(`${ fecha } ${ hora }`);

        console.log(message);

        if (message && message.body) {
            
        }

        if (message.type === 'message' && typeof message.body === "string") {
            api.sendMessage("Gracias por escribirme, tu mensaje es:\nalgo más? :like: 👷🏽‍♂️", message.threadID);
            api.sendMessage("<" + message.body + ">", message.threadID);

            api.sendMessage(
            {
                body: 'Hello @Sender! @Sender!',
                mentions: [{
                     tag: '@Sender',
                     id: message.senderID,
                     fromIndex: 9, // Highlight the second occurrence of @Sender
                }],
            }, message.threadID);
        }

    });
});

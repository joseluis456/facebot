const login = require("facebook-chat-api");
const fs = require ('fs');

const credential = { appState : JSON.parse(fs.readFileSync('appstate.json', 'utf-8')) }

login(credential, (err, api) => {
    if(err) return console.error(err);

    api.setOptions({
        logLevel: "silent"
    });

    api.listenMqtt((err, message) => {
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

const express = require('express');
const http = require('http');
const app = express();
const servidor = http.createServer(app);

const socketio = require('socket.io');

var moment = require("moment");


let messages = { users: {} };
let questions = { users: {} };
let values;

// SE AGREGA POR VERSION SUPERIOR A 3 DE SOCKET
const io = socketio(servidor, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

io.on('connection', socket => {

    socket.on("actions", (msg) => {

        if (msg.message.includes("?")) {
            let datos = {
                user: msg.user,
                message: msg.message,
                type: "question",
            };
            io.emit("actions", datos);
            

            if (!questions.users.hasOwnProperty(msg.user)) {
                console.log("AQUI");
                questions.users[msg.user] = [];
            }

            values = {
                question: msg.message,
                hour: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
            };

            questions.users[msg.user].push(values);
        } else {
            let datos = {
                user: msg.user,
                message: msg.message,
                type: "comment",
            };

            io.emit("actions", datos);

            if (!messages.users.hasOwnProperty(msg.user)) {
                console.log("AQUI");
                messages.users[msg.user] = [];
            }
            values = {
                message: msg.message,
                hour: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
            };
            messages.users[msg.user].push(values);
        }
        if (msg.message == "obtener") {
            console.log(questions.users, messages.users);
        }
    });

})


servidor.listen(3000, () => console.log("Servidor Funcionando"))



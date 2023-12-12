// Importation des modules nécessaires
require("dotenv").config();  // Permet de charger les variables d'environnement depuis un fichier .env
const cors = require('cors');  // Gestion des requêtes CORS

const mongoose = require("mongoose");  // ODM (Object Document Mapper) pour MongoDB
const express = require("express");  // Framework pour construire des applications web
const http = require("http");  // Module pour créer un serveur HTTP
const socketIo = require("socket.io");  // Bibliothèque pour la communication en temps réel
const jwt = require("jwt-then");  // Bibliothèque pour gérer les tokens JWT

// Connexion à la base de données MongoDB
mongoose.connect(process.env.DATABASE, {
useUnifiedTopology: true,
useNewUrlParser: true,
});

mongoose.connection.on("error", (err) => {
console.error("Erreur de connexion à Mongoose : " + err.message);
});

mongoose.connection.once("open", () => {
console.log("MongoDB connecté !");
});

// Importation des modèles MongoDB
require("./models/User");
require("./models/Chatroom");
require("./models/Message");

// Création de l'application Express
const app = express();

app.use(cors());  // Utilisation de CORS pour gérer les requêtes cross-origin

// Configuration du serveur HTTP et de Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
allowEIO3: true,
cors: {
origin: true,
methods: ['GET', 'POST'],
credentials: true,
},
});

// Middleware d'authentification pour Socket.IO
io.use(async (socket, next) => {
try {
const token = socket.handshake.query.token;
const payload = await jwt.verify(token, process.env.SECRET);
socket.userId = payload.id;
next();
} catch (err) {
console.error("Erreur d'authentification Socket.IO :", err);
next(new Error("Erreur d'authentification"));
}
});

// Événement de connexion à Socket.IO
io.on("connection", (socket) => {
console.log("Connecté : " + socket.userId);

// Événement de déconnexion
socket.on("disconnect", () => {
console.log("Déconnecté : " + socket.userId);
});

// Événement pour rejoindre une salle de chat
socket.on("joinRoom", ({ chatroomId }) => {
socket.join(chatroomId);
console.log("Un utilisateur a rejoint la salle de chat : " + chatroomId);
});

// Événement pour quitter une salle de chat
socket.on("leaveRoom", ({ chatroomId }) => {
socket.leave(chatroomId);
console.log("Un utilisateur a quitté la salle de chat : " + chatroomId);
});

// Événement de message dans une salle de chat
socket.on("chatroomMessage", async ({ chatroomId, message }) => {
if (message.trim().length > 0) {
    const user = await User.findOne({ _id: socket.userId });
    const newMessage = new Message({
    chatroom: chatroomId,
    user: socket.userId,
    message,
    });

    io.to(chatroomId).emit("newMessage", {
    message,
    name: user.name,
    userId: socket.userId,
    });

    await newMessage.save();
}
});
});

// Démarrage du serveur
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
console.log(`Serveur en écoute sur le port ${PORT}`);
});

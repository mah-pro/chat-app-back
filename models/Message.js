// Importation du module mongoose qui permet de faciliter les opérations liées à MongoDB dans Node.js
const mongoose = require("mongoose");

// Définition d'un schéma (structure) pour les messages dans la base de données
const messageSchema = new mongoose.Schema({
// Champ "chatroom" représente l'identifiant de la salle de discussion à laquelle le message est associé
chatroom: {
type: mongoose.Schema.Types.ObjectId, // Type de données : identifiant unique généré par MongoDB
required: "Chatroom is required!", // Message d'erreur si le champ est manquant
ref: "Chatroom", // Référence à la collection "Chatroom" dans la base de données
},
// Champ "user" représente l'identifiant de l'utilisateur qui a envoyé le message
user: {
type: mongoose.Schema.Types.ObjectId, // Type de données : identifiant unique généré par MongoDB
required: "User is required!", // Message d'erreur si le champ est manquant
ref: "User", // Référence à la collection "User" dans la base de données
},
// Champ "message" représente le contenu du message
message: {
type: String, // Type de données : chaîne de caractères
required: "Message is required!", // Message d'erreur si le champ est manquant
},
});

// Exportation du modèle (basé sur le schéma) pour être utilisé dans d'autres parties de l'application
module.exports = mongoose.model("Message", messageSchema);

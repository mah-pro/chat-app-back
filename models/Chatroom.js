// Importation du module mongoose
const mongoose = require("mongoose");

// Définition du schéma de la salle de discussion
const chatroomSchema = new mongoose.Schema({
// Champ "name" de type chaîne de caractères (String)
name: {
type: String,
// Le champ est requis, un message d'erreur est spécifié s'il est absent
required: "Name is required!",
},
});

// Exportation du modèle de salle de discussion basé sur le schéma défini
module.exports = mongoose.model("Chatroom", chatroomSchema);

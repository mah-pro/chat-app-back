// Importation de la bibliothèque Mongoose
const mongoose = require("mongoose");

// Définition du schéma pour le modèle d'utilisateur (User)
const userSchema = new mongoose.Schema(
{
// Champ "name" de type String, requis (required) avec un message d'erreur personnalisé
name: 
    {
        type: String,
        required: "Name is required!",
    },
// Champ "email" de type String, requis (required) avec un message d'erreur personnalisé
email: {
type: String,
required: "Email is required!",
},
// Champ "password" de type String, requis (required) avec un message d'erreur personnalisé
password: {
type: String,
required: "Password is required!",
},
},
{
// Ajout de champs de timestamp (timestamps) pour enregistrer automatiquement les dates de création et de mise à jour
timestamps: true,
}
);

// Exportation du modèle créé à partir du schéma en tant que module
module.exports = mongoose.model("User", userSchema);

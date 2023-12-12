// Importation des modules nécessaires
const express = require("express");
const cors = require("cors");

// Initialisation d'une application Express
const app = express();

// Middleware pour parser les requêtes au format JSON
app.use(express.json());

// Middleware pour parser les requêtes avec des données encodées dans l'URL
app.use(express.urlencoded({ extended: true }));

// Configuration pour autoriser les requêtes cross-origin (CORS)
app.use(cors());

// Importation des routes définies dans les fichiers user.js et chatroom.js
const userRoutes = require("./routes/user");
const chatroomRoutes = require("./routes/chatroom");

// Utilisation des routes définies
app.use("/user", userRoutes);
app.use("/chatroom", chatroomRoutes);

// Configuration des gestionnaires d'erreurs
const errorHandlers = require("./handlers/errorHandlers");

// Middleware pour gérer les erreurs liées aux routes non trouvées (404)
app.use(errorHandlers.notFound);

// Middleware pour gérer les erreurs liées à Mongoose (base de données)
app.use(errorHandlers.mongooseErrors);

// Configuration des gestionnaires d'erreurs en fonction de l'environnement
if (process.env.NODE_ENV === "development") {
// Environnement de développement : affiche les erreurs détaillées
app.use(errorHandlers.developmentErrors);
} else {
// Environnement de production : affiche des erreurs plus génériques
app.use(errorHandlers.productionErrors);
}

// Exportation de l'application configurée
module.exports = app;

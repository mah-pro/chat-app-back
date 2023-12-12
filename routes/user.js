// Importation du module Router d'Express
const router = require("express").Router();

// Importation de la fonction catchErrors depuis le gestionnaire d'erreurs
const { catchErrors } = require("../handlers/errorHandlers");

// Importation du contrôleur des utilisateurs
const userController = require("../controllers/userController");

// Définition de la route pour la connexion d'un utilisateur
router.post("http://localhost:8000/user/login", catchErrors(userController.login));

// Définition de la route pour l'inscription d'un utilisateur
router.post("http://localhost:8000/user/register", catchErrors(userController.register));

// Exportation du routeur configuré
module.exports = router;

// Importation du module Router depuis Express
const router = require("express").Router();

// Importation de la fonction catchErrors depuis le fichier errorHandlers
const { catchErrors } = require("../handlers/errorHandlers");

// Importation du contrôleur chatroomController depuis le fichier chatroomController
const chatroomController = require("../controllers/chatroomController");

// Importation du middleware auth depuis le fichier auth
const auth = require("../middlewares/auth");

// Définition des routes avec les méthodes HTTP correspondantes et les fonctions de contrôleur associées

// Route GET pour récupérer toutes les salles de chat
// Le middleware auth est utilisé pour vérifier l'authentification de l'utilisateur
// La fonction catchErrors est utilisée pour gérer les erreurs potentielles
router.get("/", auth, catchErrors(chatroomController.getAllChatrooms));

// Route POST pour créer une nouvelle salle de chat
// Le middleware auth est utilisé pour vérifier l'authentification de l'utilisateur
// La fonction catchErrors est utilisée pour gérer les erreurs potentielles
router.post("/", auth, catchErrors(chatroomController.createChatroom));

// Route DELETE pour supprimer une salle de chat en fonction de son identifiant (id)
// Aucun middleware d'authentification n'est utilisé ici, ce qui signifie que la suppression n'est pas restreinte par l'authentification
// La fonction catchErrors est utilisée pour gérer les erreurs potentielles
router.delete("/:id", catchErrors(chatroomController.deleteChatroom));

// Exportation du module router pour être utilisé dans d'autres fichiers
module.exports = router;

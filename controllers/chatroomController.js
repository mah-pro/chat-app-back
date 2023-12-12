// Importation du module mongoose pour interagir avec MongoDB
const mongoose = require("mongoose");

// Importation du modèle "Chatroom" créé avec mongoose
const Chatroom = mongoose.model("Chatroom");

// Fonction pour supprimer une salle de chat en fonction de son ID
exports.deleteChatroom = async (req, res) => {
    try {
        // Récupération de l'ID de la salle de chat depuis les paramètres de la requête
        const chatroomId = req.params.id;

        // Utilisation de la méthode findByIdAndRemove de Mongoose pour supprimer la salle de chat
        const deletedChatroom = await Chatroom.findByIdAndRemove(chatroomId);

        // Vérification si la salle de chat a été trouvée et supprimée avec succès
        if (!deletedChatroom) {
            return res.status(404).json({ message: "Chatroom not found." });
        }

        // Réponse JSON indiquant que la salle de chat a été supprimée avec succès
        res.json({ message: "Chatroom deleted successfully." });
    } catch (err) {
        // Gestion des erreurs en cas d'échec de la suppression de la salle de chat
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Fonction pour créer une nouvelle salle de chat
exports.createChatroom = async (req, res) => {
    try {
        // Récupération du nom de la salle de chat à partir du corps de la requête
        const { name } = req.body;

        // Expression régulière pour vérifier que le nom de la salle de chat ne contient que des lettres alphabétiques
        const nameRegex = /^[A-Za-z\s]+$/;

        // Vérification de la validité du nom de la salle de chat
        if (!nameRegex.test(name)) {
            throw new Error("Chatroom name can contain only alphabets.");
        }

        // Vérification si une salle de chat avec le même nom existe déjà
        const chatroomExists = await Chatroom.findOne({ name });

        if (chatroomExists) {
            throw new Error("Chatroom with that name already exists!");
        }

        // Création d'une nouvelle instance de la salle de chat et enregistrement dans la base de données
        const chatroom = new Chatroom({
            name,
        });

        await chatroom.save();

        // Réponse JSON indiquant que la salle de chat a été créée avec succès
        res.json({
            message: "Chatroom created!",
        });
    } catch (err) {
        // Gestion des erreurs en cas d'échec de la création de la salle de chat
        console.error(err);
        res.status(400).json({ message: err.message || "Bad Request" });
    }
};

// Fonction pour récupérer toutes les salles de chat
exports.getAllChatrooms = async (req, res) => {
    try {
        // Récupération de toutes les salles de chat depuis la base de données
        const chatrooms = await Chatroom.find({});

        // Réponse JSON avec la liste de toutes les salles de chat
        res.json(chatrooms);
    } catch (err) {
        // Gestion des erreurs en cas d'échec de la récupération des salles de chat
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

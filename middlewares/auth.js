// Importation du module jwt-then pour la gestion des JSON Web Tokens (JWT)
const jwt = require("jwt-then");

// Exportation d'une fonction middleware asynchrone qui vérifie la présence et la validité du token JWT dans les en-têtes de la requête
module.exports = async (req, res, next) => {
    try {
        // Vérification de la présence de l'en-tête "Authorization" dans la requête
        if (!req.headers.authorization) throw "Forbidden!!";

        // Extraction du token à partir de l'en-tête "Authorization" en supposant qu'il soit au format "Bearer <token>"
        const token = req.headers.authorization.split(" ")[1];

        // Vérification et décodage du token à l'aide de la clé secrète définie dans la variable d'environnement process.env.SECRET
        const payload = await jwt.verify(token, process.env.SECRET);

        // Ajout du contenu décodé du token (payload) à l'objet "req" pour qu'il soit accessible dans les fonctions middleware suivantes
        req.payload = payload;

        // Appel à la fonction middleware suivante dans la chaîne de traitement
        next();
    } catch (err) {
        // Gestion des erreurs : En cas d'erreur (par exemple, token non valide), renvoie une réponse avec un statut 401 (Non autorisé) et un message indiquant l'interdiction
        res.status(401).json({
            message: "Forbidden 🚫🚫🚫",
        });
    }
};

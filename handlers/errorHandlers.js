/*
Gestionnaire d'erreurs Catch
*/

// Cette fonction prend une fonction asynchrone (fn) en paramètre
exports.catchErrors = (fn) => {
    // Elle retourne une fonction middleware Express avec les paramètres req, res, et next
    return function (req, res, next) {
        // Appelle la fonction asynchrone avec les paramètres req, res, et next
        fn(req, res, next).catch((err) => {
            // Erreurs de validation
            if (typeof err === "string") {
                res.status(400).json({
                    message: err,
                });
            } else {
                next(err);
            }
        });
    };
};

/*
Gestionnaire d'erreurs de validation MongoDB

Détecte s'il y a des erreurs de validation MongoDB et les renvoie de manière lisible.
*/

exports.mongoseErrors = (err, req, res, next) => {
    // Si l'erreur ne contient pas d'attribut 'errors', passe à l'erreur suivante
    if (!err.errors) return next(err);
    // Récupère les clés d'erreur
    const errorKeys = Object.keys(err.errors);
    let message = "";
    // Pour chaque clé d'erreur, concatène le message dans 'message'
    errorKeys.forEach((key) => (message += err.errors[key].message + ", "));
    // Supprime la virgule et l'espace à la fin de 'message'
    message = message.substr(0, message.length - 2);

    // Envoie une réponse JSON avec le message d'erreur
    res.status(400).json({
        message,
    });
};

/*
Gestionnaire d'erreurs en développement

En développement, affiche de bons messages d'erreur pour les erreurs non gérées précédemment.
*/
exports.developmentErrors = (err, req, res, next) => {
    // Assure qu'il y a une pile d'erreurs
    err.stack = err.stack || "";
    // Détails de l'erreur
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack,
    };

    // Envoie une réponse JSON avec les détails de l'erreur
    res.status(err.status || 500).json(errorDetails);
};

/*
Gestionnaire d'erreurs en production

Pas de traces de la pile et les détails de l'erreur ne sont pas divulgués à l'utilisateur.
*/
exports.productionErrors = (err, req, res, next) => {
    // Envoie une réponse JSON avec un message générique pour les erreurs internes du serveur
    res.status(err.status || 500).json({
        error: "Internal Server Error",
    });
};

/*
Erreur 404 Page
*/

// Gestionnaire pour les routes

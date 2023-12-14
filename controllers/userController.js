// Importation des modules nécessaires
const mongoose = require("mongoose");
const User = require("../models/User");
const sha256 = require("js-sha256");
const jwt = require("jwt-then");

// Fonction d'inscription
exports.register = async (req, res) => {
try {
    console.log(req.body);
// Extraction des données du corps de la requête
const { name, email, password } = req.body;

// Expression régulière pour vérifier le domaine de l'email
const emailRegex = /@gmail\.com$|@yahoo\.com$|@hotmail\.com$|@live\.com$/;

// Vérification du domaine de l'email
if (!emailRegex.test(email)) {
    throw "Email is not supported from your domain.";
}

// Vérification de la longueur du mot de passe
if (password.length < 6) {
    throw "Password must be at least 6 characters long.";
}

// Vérification de l'existence de l'utilisateur avec le même email
const userExists = await User.findOne({ email });

if (userExists) {
    throw "User with the same email already exists.";
}

// Hachage du mot de passe avec un sel (SALT) stocké dans une variable d'environnement
const hashedPassword = sha256(password + process.env.SALT);

// Création d'un nouvel utilisateur
const user = new User({
    name,
    email,
    password: hashedPassword,
});

// Sauvegarde de l'utilisateur dans la base de données MongoDB
await user.save();

// Réponse JSON en cas de succès
res.json({
    message: `User [${name}] registered successfully!`, user
});
} catch (error) {
// Réponse JSON en cas d'erreur avec le statut 400 (Bad Request)
res.status(400).json({
    error: error.toString(),
});
}
};

// Fonction de connexion
exports.login = async (req, res) => {
try {
// Extraction des données du corps de la requête
const { email, password } = req.body;

// Hachage du mot de passe avec le même sel (SALT)
const hashedPassword = sha256(password + process.env.SALT);

// Recherche de l'utilisateur dans la base de données
const user = await User.findOne({ email, password: hashedPassword });

// Vérification de l'existence de l'utilisateur
if (!user) {
    throw "Email and Password did not match.";
}

// Création d'un jeton JWT contenant l'ID de l'utilisateur
const token = await jwt.sign({ id: user.id }, process.env.SECRET);

// Réponse JSON en cas de succès avec le jeton JWT
res.json({
    message: "User logged in successfully!",
    token,
});
} catch (error) {
// Réponse JSON en cas d'erreur d'authentification avec le statut 401 (Unauthorized)
res.status(401).json({
    error: error.toString(),
});
}
};

const AuthModel = require("../model/Auth.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '132547698';

module.exports = {

    // Fonction pour l'inscription d'un utilisateur
    register: async (req, res) => {
        try {
            const { fname, name, email, password, age, location } = req.body;
            // Vérifier si un utilisateur avec la même adresse e-mail existe déjà
            const existingUser = await AuthModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Cet e-mail est déjà utilisé.' });
            }
            // Hacher le mot de passe avant de l'enregistrer dans la base de données
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new AuthModel({
                fname,
                name,
                email,
                password: hashedPassword,
                age,
                location
            });
            // Enregistrer le nouvel utilisateur dans la base de données
            await newUser.save();
            res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
        }
    },

    // Fonction pour la connexion d'un utilisateur
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            // Rechercher l'utilisateur par adresse e-mail
            const user = await AuthModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'E-mail ou mot de passe incorrect.' });
            }

            // Vérifier si le mot de passe est valide en comparant les hachages
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'E-mail ou mot de passe incorrect.' });
            }
            
            // Générer un jeton JWT pour l'utilisateur authentifié
            const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            
            // Stocker le jeton JWT dans un cookie HTTP
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            res.status(200).json({ user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
        }
    },

    // Fonction pour la déconnexion de l'utilisateur
    logout: (req, res) => {
        // Effacer le cookie du jeton JWT
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    },

    // Fonction pour récupérer le profil de l'utilisateur actuellement authentifié
    getProfil: async (req, res) => {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        
        // Vérifier et décoder le jeton JWT
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            const { email } = decodedToken;
            try {
                // Rechercher l'utilisateur par adresse e-mail
                const user = await AuthModel.findOne({ email });
                if (!user) {
                    return res.status(401).json({ message: 'User not found' });
                }
                res.status(200).json(user);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'An error occurred while fetching user data' });
            }
        });
    },

    // Fonction pour la modification du mot de passe de l'utilisateur
    passwordModif: async (req, res) => {
        const id = req.body._id;
        AuthModel.findByIdAndUpdate(
            id,
            {
                id: req.body.id,
                fname: req.body.fname,
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                age: req.body.age,
                location: req.body.location
            },
        )
            .then((updatedUser) => {
                if (!updatedUser) {
                    return res.status(404).send({ error: 'User non trouvé' });
                }
                res.send('User mis à jour avec succès');
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            })
    },
}

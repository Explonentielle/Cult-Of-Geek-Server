const AuthModel = require("../model/Auth.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = '132547698';

module.exports = {

    register: async (req, res) => {
        try {
            const { fname, name, email, password, age, location } = req.body;
            const existingUser = await AuthModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Cet e-mail est déjà utilisé.' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new AuthModel({
                fname,
                name,
                email,
                password: hashedPassword,
                age,
                location
            });
            await newUser.save();
            res.status(201).json({ message: 'Utilisateur enregistré avec succès.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await AuthModel.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'E-mail ou mot de passe incorrect.' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'E-mail ou mot de passe incorrect.' });
            }
            const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
            // res.status(200).json({ token, user });
            // res.cookie('token', token).json(user)
            res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
            res.status(200).json({ user, token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
        }
    },

    logout: (req, res) => {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logout successful' });
    },

    getProfil: async (req, res) => {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            const { email } = decodedToken;
            try {
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
                    return res.status(404).send({ error: 'User non trouvee' });
                }
                res.send('User mise à jour avec succes');
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            })
    },

}
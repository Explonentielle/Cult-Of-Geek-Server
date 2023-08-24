const AuthModel = require("../model/Auth.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            // const passwordUser = await AuthModel.findOne({ password });
            
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'E-mail ou mot de passe incorrect.' });
            }
            const token = jwt.sign({ userId: user.id }, 'votre_clé_secrète', { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
        }
    },



    
    getAll(req, res) {
        AuthModel.find().then(user => {
            res.send(user)
        }).catch(err => {
            res.status(404).send({ error: "user non trouvé" })
        })
    },
    get(req, res) {
        const email = req.params.email
        AuthModel.findById(email).then(user => {
            if (user) {
                res.send(user)
            }
            else {
                res.status(404).send({ error: "user non trouvé" })
            }
        }).catch(err => {
            res.status(500).send({ error: err.message })
        })
    },
    create(req, res) {
        const user = new AuthModel({
            id: req.body.id,
            fname: req.body.fname,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            location: req.body.location
        })

        user.save().then(() => res.send("user ajouté avec succés")).catch(err => {
            res.status(404).send({ error: err.message })
        })
    },
    modif(req, res) {
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
                    return res.status(404).send({ error: 'User non trouvée' });
                }
                res.send('User mise à jour avec succès');
            })
            .catch((err) => {
                res.status(500).send({ error: err.message });
            })
    },
    delete(req, res) {
        const email = req.params.email
        AuthModel.findByIdAndDelete(email).then(user => res.send(
            `supression de l'utilisateur' ${user.email}`)).catch(err => {
                res.status(500).send({ error: err.message })
            })
    }
}
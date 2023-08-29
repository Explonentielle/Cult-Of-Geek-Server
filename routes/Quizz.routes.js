const QuizzController = require("../controller/Quizz.controller")

module.exports = server => {

    // const monMiddleware = (req, res, next) => {
    //     if (req.body === undefined) {
    //         return res.status(400).json({ error: 'Tous les champs sont requis.' });
    //     }
    //     next();
    // };
    
    server.post("api/Quizz/create", (req, res) => {
        QuizzController.create(req, res)
        res.send('Requête POST traitée avec succès !');
    });
}
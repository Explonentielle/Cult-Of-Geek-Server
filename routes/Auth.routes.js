const AuthController = require("../controller/Auth.controller")
const QuizzController = require("../controller/Quizz.controller")

module.exports = server => {
    server.post('/api/Auth/register', AuthController.register);

    server.post('/api/Auth/login', (req, res) => {
        AuthController.login(req, res)
    })

    server.get('/api/Auth/profile', AuthController.getProfile);

    //////////////////////////////////////////

    server.post("/api/Quizz/create", (req, res) => {
        QuizzController.create(req, res)
        res.send('Requête POST traitée avec succès !');
    });

    server.get('/api/Quizz', (req, res) => {
        QuizzController.getAll(req, res)
    })
}

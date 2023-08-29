const AuthController = require("../controller/Auth.controller")
const QuizzController = require("../controller/Quizz.controller")

module.exports = server => {
    server.post("/Data", (req, res) => {
        AuthController.create(req, res)
    })

    server.post('/api/Auth/register', AuthController.register);

    server.post('/api/Auth/login', (req, res) => {
        AuthController.login(req, res)
    })

    server.post("/api/Quizz/create", (req, res) => {
        QuizzController.create(req, res)
        res.send('Requête POST traitée avec succès !');
    });
}

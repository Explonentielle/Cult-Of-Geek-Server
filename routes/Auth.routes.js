const AuthController = require("../controller/Auth.controller")
const QuizzController = require("../controller/Quizz.controller")

module.exports = server => {
    // route Auth 
    server.post('/api/Auth/register', AuthController.register);

    server.post('/api/Auth/login', (req, res) => {
        AuthController.login(req, res)
    })

    server.post('/api/Auth/logout', AuthController.logout);

    server.get('/api/Auth/getProfil', AuthController.getProfil);

    // route Quizz 

    server.post("/api/Quizz/create", (req, res) => {
        QuizzController.create(req, res)
    });

    server.get('/api/Quizz', (req, res) => {
        QuizzController.getAll(req, res)
    })
}

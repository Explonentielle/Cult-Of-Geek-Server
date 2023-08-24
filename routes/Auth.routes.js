const AuthController = require("../controller/Auth.controller")

module.exports = server => {
    server.get("/Auth", (req, res) =>
        AuthController.getAll(req, res))

    server.get("/Auth/:email", (req, res) =>
        AuthController.get(req, res))

    server.post("/Auth", (req, res) => {
        AuthController.create(req, res)
    })

    server.delete("/Auth/:email", (req, res) => {
        AuthController.delete(req, res)
    })

    server.put("/Auth", (req, res) => {
        AuthController.modif(req, res)
    })

    server.get("*", (req, res) => {
        res.status(404).send("rien a faire ici")
    })

    server.post('/register', AuthController.register);

    server.post('/api/Auth/login', (req, res) => {
        AuthController.login(req, res)})
}

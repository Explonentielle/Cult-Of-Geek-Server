const express = require("express");
const dotenv = require('dotenv').config()
const mongoose = require("mongoose");
const cors = require('cors');
const server = express();
const routes = require("./routes/Auth.routes")
server.use(express.json())
const cookieParser = require('cookie-parser');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
server.use(cors(corsOptions));
server.use(cookieParser())



server.listen(5500, () => {
    console.log("serveur lancer et a l'ecoute du port 5500")
    mongoose.connect(process.env.MONGO_URL)

    const db = mongoose.connection;

    db.once("open", () =>
        console.log("connexion a la db reussi")).on("error", error => console.error("probleme de connexion a la base de donné", error))
})

server.get("/", (req, res) => {
    console.log("coucou")
    res.send("bienvenue")
})

routes(server)
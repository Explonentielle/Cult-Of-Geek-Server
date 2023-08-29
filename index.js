const express = require("express");
const dotenv = require('dotenv').config()
const mongoose = require("mongoose");
const cors = require('cors');
const server = express();
const routes = require("./routes/Auth.routes")
server.use(express.json())
server.use(cors()); 


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
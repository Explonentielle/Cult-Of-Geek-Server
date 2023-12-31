const QuizzModel = require("../model/Quizz.model")

module.exports = {

    // Fonction pour créer un nouveau quiz
    create: async (req, res) => {
        // Créer une instance de QuizzModel en utilisant les données de la requête req.body
        const quizz = new QuizzModel({
            title: req.body.title,
            theme: req.body.theme,
            isPrivate:  req.body.isPrivate,
            content: req.body.content.map(content => ({
                question: content.question,
                answers: content.answers.map(answer => ({
                    id: answer.id,
                    text: answer.text,
                    correct: answer.correct
                }))
            }))
        });

        // Enregistrer le quiz dans la base de données

        await quizz.save()
            .then(() => res.send({ message: "Quizz ajouté avec succès" }))
            .catch(err => {
                res.status(404).send({ message: err.message });
            });
    },

    // Fonction pour récupérer tous les quiz existants
    getAll(req, res) {
        // Rechercher tous les quiz dans la base de données
        QuizzModel.find().then(quizz => {
            // Renvoyer la liste des quiz en réponse
            res.send(quizz)
        }).catch(err => {
            // Gérer les erreurs, renvoyer une erreur 404 si aucun quiz n'est trouvé
            res.status(404).send({ error: "Quizz non trouvé" })
        })
    },
}

const QuizzModel = require("../model/Quizz.model")

module.exports = {

    create(req, res) {
        const quizz = new QuizzModel({
            title: req.body.title,
            theme: req.body.theme,
            content: req.body.content.map(content => ({
                question: content.question,
                answers: content.answers.map(answer => ({
                    id: answer.id,
                    text: answer.text,
                    correct: answer.correct
                }))
            }))
        });

        quizz.save()
            .then(() => res.send("Quizz ajouté avec succès"))
            .catch(err => {
                res.status(404).send({ error: err.message });
            });
    }
}
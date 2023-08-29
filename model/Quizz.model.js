const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const QuizzSchema = new Schema({
    title: String,
    theme: String,
    content: [
        {
            question: String,
            answers: [
                { id: Number, text: String, correct: Boolean },
                { id: Number, text: String, correct: Boolean },
                { id: Number, text: String, correct: Boolean },
                { id: Number, text: String, correct: Boolean }
            ]
        }
    ]
})

const QuizzModel = mongoose.model("Quizz", QuizzSchema)

module.exports = QuizzModel
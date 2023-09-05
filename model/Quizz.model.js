const mongoose = require("mongoose")

// Importer le module mongoose pour la création du modèle

const Schema = mongoose.Schema;

// Créer un schéma (ou modèle) pour les quiz
const QuizzSchema = new Schema({
    title: String,   // Champ pour le titre du quiz
    theme: String, 
    isPrivate: Boolean,  // Champ pour le thème du quiz
    content: [       // Champ pour le contenu du quiz, qui est un tableau d'objets
        {
            question: String,   // Champ pour la question du quiz
            answers: [          // Champ pour les réponses possibles, qui est un tableau d'objets
                { 
                    id: Number,    // Champ pour l'identifiant de la réponse
                    text: String,  // Champ pour le texte de la réponse
                    correct: Boolean // Champ pour indiquer si la réponse est correcte ou non
                },
                // Les autres réponses possibles sont également définies de la même manière
            ]
        }
    ]
})

// Créer un modèle Mongoose à partir du schéma, nommé "Quizz" qui sera utilisé pour interagir avec la base de données
const QuizzModel = mongoose.model("Quizz", QuizzSchema)

// Exporter le modèle pour pouvoir l'utiliser dans d'autres parties de l'application
module.exports = QuizzModel

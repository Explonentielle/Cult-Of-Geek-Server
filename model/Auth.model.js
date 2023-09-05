// Importer le module mongoose pour la création du modèle
const mongoose = require("mongoose")

// Créer un schéma (ou modèle) pour les utilisateurs
const Schema = mongoose.Schema;

// Définir le schéma pour les utilisateurs
const AuthSchema = new Schema({
    id: Number,         // Champ pour l'identifiant de l'utilisateur (peut-être redondant avec _id généré par MongoDB)
    fname: String,      // Champ pour le prénom de l'utilisateur
    name: String,      // Champ pour le nom de l'utilisateur
    email: {
        type: String,
        unique: true,   // Assure que l'adresse e-mail est unique dans la base de données
    },
    password: String,   // Champ pour le mot de passe haché de l'utilisateur
    age: Number,        // Champ pour l'âge de l'utilisateur
    location: String, 
    quizzes: [
        {
          title: String,   // Champ pour le titre du quizgit add
          theme: String,   // Champ pour le thème du quiz
          isPrivate: Boolean,  // Champ la visibilité du quizz
          content: [       // Champ pour le contenu du quiz, qui est un tableau d'objets
            {
              question: String,   // Champ pour la question du quiz
              answers: [          // Champ pour les réponses possibles, qui est un tableau d'objets
                {
                  id: Number,      // Champ pour l'identifiant de la réponse
                  text: String,    // Champ pour le texte de la réponse
                  correct: Boolean // Champ pour indiquer si la réponse est correcte ou non
                },
                // Les autres réponses possibles sont également définies de la même manière
              ]
            }
          ]
        }
      ],  // Champ pour l'emplacement de l'utilisateur
})

// Créer un modèle Mongoose à partir du schéma, nommé "Auth" qui sera utilisé pour interagir avec la base de données
const AuthModel = mongoose.model("Auth", AuthSchema)

// Exporter le modèle pour pouvoir l'utiliser dans d'autres parties de l'application
module.exports = AuthModel

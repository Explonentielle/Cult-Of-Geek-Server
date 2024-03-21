# Cult of Geek - Serveur

Ce projet serveur "Cult of Geek" a été réalisé dans le cadre d'une formation, fournissant une API pour le projet global. Il utilise différentes technologies pour offrir des fonctionnalités telles que l'authentification, la gestion des utilisateurs, et l'accès aux données.

## Fonctionnalités

1. **Express.js** :
   - Le serveur est construit avec Express.js, un framework web Node.js flexible et minimaliste. Il est utilisé pour la gestion des routes, des requêtes HTTP, et la construction de l'API.

2. **MongoDB** et **Mongoose** :
   - MongoDB est utilisé comme base de données NoSQL pour stocker les données. Mongoose est une bibliothèque de modélisation d'objets MongoDB pour Node.js, facilitant l'interaction avec la base de données.

3. **Bcrypt** :
   - Bcrypt est utilisé pour le hachage sécurisé des mots de passe des utilisateurs, assurant la sécurité des données sensibles.

4. **JSON Web Token (JWT)** :
   - JSON Web Token est utilisé pour l'authentification des utilisateurs. Les JWT sont générés lors de la connexion et sont utilisés pour vérifier les autorisations d'accès aux routes protégées de l'API.

5. **Cors** :
   - Cors est utilisé pour gérer les requêtes CORS (Cross-Origin Resource Sharing), permettant à l'API d'être accessible depuis différents domaines.

6. **Cookie-Parser** :
   - Cookie-Parser est utilisé pour analyser les cookies des requêtes entrantes, offrant une gestion facile des cookies dans l'API.

7. **Dotenv** :
   - Dotenv est utilisé pour charger les variables d'environnement à partir d'un fichier .env, permettant de stocker les configurations sensibles de manière sécurisée.

8. **Nodemon** :
   - Nodemon est utilisé en tant qu'outil de développement pour surveiller les changements dans les fichiers et redémarrer automatiquement le serveur lorsqu'un changement est détecté.

## Technologies Utilisées

- Express.js
- MongoDB
- Mongoose
- Bcrypt
- JSON Web Token (JWT)
- Cors
- Cookie-Parser
- Dotenv
- Nodemon

## Pour Commencer

Pour démarrer avec ce projet serveur :

1. Clonez le dépôt.
2. Installez les dépendances avec `npm install`.
3. Démarrez le serveur avec `npm start`.
4. L'API sera accessible à l'adresse [http://localhost:PORT](http://localhost:PORT).

N'hésitez pas à explorer le code source et à l'adapter selon vos besoins pour votre projet "Cult of Geek". Bon développement ! 🚀

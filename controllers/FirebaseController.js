const {initializeApp } = require("firebase/app")
const {getFirestore } = require("firebase/firestore")
const firebaseConfig = {
    apiKey: "AIzaSyAqXqyg085VPxP-9f6KD3MXuZT44cyeIW8",
    authDomain: "chat-app-bec32.firebaseapp.com",
    projectId: "chat-app-bec32",
    storageBucket: "chat-app-bec32.appspot.com",
    messagingSenderId: "1076214043371",
    appId: "1:1076214043371:web:54b58743621839c309a4ae"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

module.exports = db

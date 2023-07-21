const { hashPassword } = require("../controllers/Auth");
const db = require("../controllers/FirebaseController")
const { collection, addDoc } = require("firebase/firestore"); 

async function createUser(username, password) {
    try {
        const docRef = await addDoc(collection(db, "users"), {
          username: username,
          password: await hashPassword(password)
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      
}

module.exports = createUser
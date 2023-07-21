const { Configuration, OpenAIApi } = require("openai");
const db = require("../controllers/FirebaseController");
const { collection, query, where, getDocs } = require("firebase/firestore");
// import  { userMessagesSnapshot, AiMessagesSnapshot} from "../App"

const apiKey = "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";

const configuration = new Configuration({
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

async function runConversation(msg, username) {
  
  function Message(role, content) {
    this.role = role;
    this.content = content;
  }

  function addMessage(role, content) {
    const message = new Message(role, content);
    messages.push(message);
  }

  function addMessage(role, content) {
    const message = new Message(role, content);
    messages.push(message);
  }
  
  let messages = [];
  
  const userMessagesQuery = query(collection(db, "UserMessages"), where("author", "==", username));
  const AiMessagesQuery = query(collection(db, "AiMessages"), where("author", "==", username));
  
  const userMessagesSnapshot = await getDocs(userMessagesQuery);
  const AiMessagesSnapshot = await getDocs(AiMessagesQuery);
  
  const userMessagesArray = userMessagesSnapshot.docs.map((doc) => doc.data());
  const aiMessagesArray = AiMessagesSnapshot.docs.map((doc) => doc.data());
  
  const maxLength = Math.max(userMessagesArray.length, aiMessagesArray.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (i < userMessagesArray.length) {
      const userMessage = userMessagesArray[i];
      addMessage("user", userMessage.content);
    }
    if (i < aiMessagesArray.length) {
      const aiMessage = aiMessagesArray[i];
      addMessage("assistant", aiMessage.content);
    }
  }
  
  messages.push(new Message("user", msg));

  const chat_completion = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
    })
    .catch((e) => {
      console.log(e);
    });

    console.log(messages)
  return chat_completion.data.choices[0].message.content;
}

module.exports = runConversation;

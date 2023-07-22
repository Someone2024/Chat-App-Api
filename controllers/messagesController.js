const db = require("./FirebaseController");
const runConversation = require("../lib/OpenAi");
const { collection, query, where, getDocs,getDoc, addDoc, orderBy, limit } = require("firebase/firestore");

exports.sendMessage = async (req, res) => {
  const { messageContent } = req.body;
  try {
    const newUserMessage = await addDoc(collection(db, "UserMessages"), {
      role: "user",
      content: messageContent,
      author: req.username,
      createdAt: new Date(),
      isAi: false,
    });
    runConversation(messageContent, `${req.username}`).then(async (result) => {
      const newAiMessage = await addDoc(collection(db, "AiMessages"), {
        role: "assistant",
        content: result,
        author: req.username,
        createdAt: new Date(),
        isAi: true,
      });
      const userMessagesSnapshot = await getDoc(newUserMessage);
      const AiMessagesSnapshot = await getDoc(newAiMessage);
      res.json([
        userMessagesSnapshot.data(),
        AiMessagesSnapshot.data()
      ]);
    });
  } catch (err) {
    console.error(err);
  }
};

exports.displayMessages = async (req, res) => {
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

  const userMessagesQuery = query(
    collection(db, "UserMessages"),
    where("author", "==", req.username)
  ,orderBy("createdAt"));
  const AiMessagesQuery = query(
    collection(db, "AiMessages"),
    where("author", "==", req.username),
    orderBy("createdAt"));

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

  res.json(messages)
};

# AI Chat App API

The AI Chat App API provides a backend service that allows clients to interact with ChatGPT, a powerful language model, through a set of API endpoints.

## Endpoints

1. **Login Endpoint** - `/login` - Allows users to authenticate and log into the chat app.

2. **Display Messages Endpoint** - `/messages` - Retrieves the chat history for display on the client app. Authentication is required to access this endpoint.

3. **Send Message Endpoint** - `/messages/send-message` - Enables clients to send messages to ChatGPT and receive dynamic responses. User authentication is required to use this endpoint.
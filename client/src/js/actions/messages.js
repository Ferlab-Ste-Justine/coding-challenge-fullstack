// For the sake of simplicity, we'll always get ALL the messages.
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES';
export function updateMessages(messages) {
  return {
    type: UPDATE_MESSAGES,
    messages
  };
}

// This action updates a users message. Won't work (backend check) if the user does not have a valid JWT
export function updateMessage(text) {
  return (_, __, socket) => {
    socket.send('updateMessage', { text });
  };
};



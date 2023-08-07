// Replace these with your Firebase config details
const firebaseConfig = {
    apiKey: "AIzaSyBxIuLMsYk8LUQFREMiOyfC8wqoZAUrI5Q",
    authDomain: "techigator-chatapp.firebaseapp.com",
    projectId: "techigator-chatapp",
    storageBucket: "techigator-chatapp.appspot.com",
    messagingSenderId: "826014176833",
    appId: "1:826014176833:web:b2ae22789a9fad001e18c0"
  };
  
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the database
  const database = firebase.database();
  
  // Get references to the chat container and input elements
  const chatContainer = document.querySelector('.chat-messages');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  
  // Function to display messages in the chat container
  function displayMessage(name, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${name}:</strong> ${text}`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
  }
  
  // Send button click event listener
  sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
      // Push the message to the database with a timestamp and role "admin"
      database.ref('messages').push({
        name: 'Admin',
        text: message,
        role: 'admin',
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      messageInput.value = ''; // Clear the input field after sending
    }
  });
  
  // Firebase listener for new messages
  database.ref('messages').on('child_added', snapshot => {
    const message = snapshot.val();
    if (message.role === 'user') {
      // Display user messages
      displayMessage('User', message.text);
    }
  });
  
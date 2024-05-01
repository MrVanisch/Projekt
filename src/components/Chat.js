import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, onSnapshot, orderBy, addDoc } from 'firebase/firestore';

const Chat = ({ matchId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Pobieranie istniejących wiadomości
  useEffect(() => {
    if (matchId) {
      const messagesRef = collection(db, "chats", matchId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "asc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loadedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(loadedMessages);
      });

      return () => unsubscribe();
    }
  }, [matchId]);

  // Funkcja do wysyłania nowych wiadomości
  const sendMessage = async () => {
    if (newMessage.trim() !== "" && matchId) {
      const messagesRef = collection(db, "chats", matchId, "messages");
      try {
        await addDoc(messagesRef, {
          text: newMessage,
          timestamp: new Date(),
        });
        setNewMessage('');
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <div>
      <div>
        {messages.map(message => (
          <div key={message.id}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;

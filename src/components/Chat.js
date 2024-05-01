import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase-config';
import { collection, query, onSnapshot, orderBy, addDoc } from 'firebase/firestore';

const Chat = () => {
  const { matchId } = useParams(); // Using useParams to get matchId from the route.
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

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

      return () => unsubscribe(); // Clean up on unmount
    }
  }, [matchId]);

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
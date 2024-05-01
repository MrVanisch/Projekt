import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import LogoutButton from './components/LogoutButton'; // Import przycisku wylogowania
import { auth } from './firebase-config';
import MatchesPage from './pages/MatchesPage';
import Chat from './components/Chat';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log('Zalogowany użytkownik:', currentUser);
        setUser(currentUser);
      } else {
        console.log('Użytkownik jest wylogowany');
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <Header user={user} />
        {user && <LogoutButton />}
        <Routes>
          <Route path="/chat/:userId" element={<Chat />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
          <Route path="/matches" element={user ? <MatchesPage /> : <LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { auth, db } from '../firebase-config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Funkcja dodająca użytkownika do Firestore
const addUserToFirestore = async (user) => {
  const userRef = doc(db, "users", user.uid);
  try {
    await setDoc(userRef, {
      uid: user.uid,
      displayName: user.displayName || 'Anonim',
      email: user.email,
      photoURL: user.photoURL,
      createdAt: new Date(),
    }, { merge: true });
    console.log("User added to Firestore with ID:", user.uid);
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

function GoogleSignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Obsługa logowania użytkownika
        console.log('User signed in: ', result.user);
        // Dodaj użytkownika do Firestore po pomyślnym zalogowaniu
        addUserToFirestore(result.user);
      })
      .catch((error) => {
        // Obsługa błędów
        console.error('Error signing in: ', error);
      });
  };

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

export default GoogleSignIn;
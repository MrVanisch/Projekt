import { db } from '../firebase-config';
import { doc, setDoc } from 'firebase/firestore';

export const saveOrUpdateUserProfile = async (userProfile, userId) => {
  const userRef = doc(db, "users", userId);
  try {
    await setDoc(userRef, userProfile, { merge: true });
    console.log("Profil zaktualizowany pomyślnie.");
  } catch (error) {
    console.error("Błąd przy aktualizacji profilu:", error);
  }
};
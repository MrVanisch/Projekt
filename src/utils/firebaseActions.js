import { db } from '../firebase-config';
import { doc, setDoc, getDoc, addDoc, collection } from 'firebase/firestore';

// Funkcja zapisująca informacje o lajku lub nie-lubieniu
export const saveLikeOrDislike = async (likerId, likedId, action) => {
  const likeRef = doc(db, "matches", `${likerId}_${likedId}`);
  try {
    await setDoc(likeRef, {
      likerId,
      likedId,
      action,  // true for like, false for dislike
      timestamp: new Date()
    });
    console.log(`Action '${action ? 'like' : 'dislike'}' saved from ${likerId} to ${likedId}`);
  } catch (error) {
    console.error("Failed to save action:", error);
  }
};

// Funkcja sprawdzająca, czy istnieje wzajemne polubienie
export const checkForMatch = async (likerId, likedId) => {
  const likesRef = doc(db, "matches", `${likedId}_${likerId}`);
  const docSnap = await getDoc(likesRef);

  console.log(`Looking for like from ${likedId} to ${likerId}`);
  if (docSnap.exists() && docSnap.data().action) {
    console.log("Match found between", likerId, "and", likedId);
    // Save the match in a separate collection
    const matchRef = collection(db, "likes");
    await addDoc(matchRef, {
      userId1: likerId,
      userId2: likedId,
      timestamp: new Date()
    });
    console.log("Match saved in matches collection.");
    return true;
  } else {
    console.log("No match found between", likerId, "and", likedId);
  }
  return false;
};
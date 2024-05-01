import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { saveLikeOrDislike, checkForMatch } from '../utils/firebaseActions';

const SwipeCards = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProfiles = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const profileData = [];
      querySnapshot.forEach((doc) => {
        if (doc.id !== auth.currentUser?.uid) {
          profileData.push({ ...doc.data(), id: doc.id });
        }
      });
      setProfiles(profileData);
    };

    fetchProfiles();
  }, []);

  const handleSwipe = async (direction) => {
    const user = auth.currentUser;
    const currentProfile = profiles[currentIndex];
    if (!user || !currentProfile) return;

    if (direction === 'right') {
      await saveLikeOrDislike(user.uid, currentProfile.id, true);
      const isMatch = await checkForMatch(user.uid, currentProfile.id);
      if (isMatch) {
        console.log('You have a new match!');
      }
    } else {
      await saveLikeOrDislike(user.uid, currentProfile.id, false);
    }

    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div>
      {currentIndex < profiles.length ? (
        <div>
          <h2>{profiles[currentIndex].name}</h2>
          <p>{profiles[currentIndex].description}</p>
          <button onClick={() => handleSwipe('left')}>Nie lubię</button>
          <button onClick={() => handleSwipe('right')}>Lubię</button>
        </div>
      ) : (
        <p>Brak więcej profili.</p>
      )}
    </div>
  );
};

export default SwipeCards;
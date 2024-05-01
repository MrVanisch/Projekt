import { db, auth } from '../firebase-config';
import { collection, query, where, getDocs } from 'firebase/firestore';

const fetchProfiles = async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) return;

  // Utwórz zapytanie z wykluczeniem profilu aktualnie zalogowanego użytkownika
  const q = query(collection(db, "users"), where("userId", "!=", currentUser.uid));

  const querySnapshot = await getDocs(q);
  const profiles = [];

  querySnapshot.forEach((doc) => {
    profiles.push({ id: doc.id, ...doc.data() });
  });

  return profiles;
};
import React, { useState } from 'react';
import { storage, db } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const UploadMusic = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Przesyłanie pliku:', selectedFile.name);
      setFile(selectedFile);
      uploadFile(selectedFile);
    }
  };

  const uploadFile = async (file) => {
    const fileRef = ref(storage, `music/${file.name}`);
    setUploading(true);
    try {
      // Przesyłanie pliku do Firebase Storage
      const snapshot = await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      // Zapisywanie metadanych w Firestore
      await addDoc(collection(db, "music"), {
        name: file.name,
        url: downloadUrl,
        createdAt: new Date()
      });

      console.log('Plik przesłany i metadane zapisane:', downloadUrl);
    } catch (error) {
      console.error('Wystąpił błąd przy przesyłaniu pliku:', error);
    }
    setUploading(false);
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleFileChange} disabled={uploading} />
      {uploading ? <p>Przesyłanie...</p> : (file && <p>Wybrany plik: {file.name}</p>)}
    </div>
  );
};

export default UploadMusic;
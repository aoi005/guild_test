import React, { useState } from 'react';
import { useFirestoreUpload } from './useFirestoreUpload';

interface FirestoreData {
    id: string;
    title: string;
    author: string;
    price: number;
  }

export default function UploadForm() {
  const { uploadData, uploadStatus } = useFirestoreUpload();
  const [formData, setFormData] = useState<FirestoreData>({
    id: '',
    title: '',
    author: '',
    price: 0,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData(formData);
  };

  return (
    <div>
      <h1>Data Upload</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          placeholder="Document ID"
        />
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder="Author"
        />
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          placeholder="Price"
        />
        <button type="submit">データを追加/更新</button>
      </form>
      {uploadStatus === 'Success' && <p>Upload successful!</p>}
      {uploadStatus === 'Error' && <p>Upload failed!</p>}
    </div>
  );
}
import React, { useState } from 'react';
import { useFirestoreUpload } from './Dataupload';

interface FirestoreData {
    id: string;
    title: string;
    name: string;
    tag: string;
    detail: string;
  }

export default function UploadForm() {
  const { uploadData, uploadStatus } =  useFirestoreUpload();
  const [formData, setFormData] = useState<FirestoreData>({
    id: '',
    title: '',
    name: '',
    tag: '',
    detail: "",
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
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="name"
        />
        <input
          type="text"
          value={formData.tag}
          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          placeholder="tag"
        />
        <input
          type="text"
          value={formData.detail}
          onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
          placeholder="detail"
        />
        <button type="submit">データを追加/更新</button>
      </form>
      {uploadStatus === 'Success' && <p>Upload successful!</p>}
      {uploadStatus === 'Error' && <p>Upload failed!</p>}
    </div>
  );
}
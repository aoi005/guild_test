import styles from "./index.module.scss";
import Modal from 'react-modal';
import { useState } from 'react';
import React from "react";
import Select from 'react-select'
import firebase from "firebase/app";
import "firebase/database";

function Form() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    tags: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Firebaseへデータを送信する処理
    const sendDataToFirebase = async () => {
      try {
        const response = await firebase
          .database()
          .ref("articles")
          .push(formValues);
        console.log("Data sent to Firebase:", response);
        // 送信完了後にフォームの値をリセットする
        setFormValues({
          title: "",
          description: "",
          tags: "",
        });
        // モーダルを閉じる
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error sending data to Firebase:", error);
      }
    };

    sendDataToFirebase();
  };

  return (
    <section className={styles.container}>
      <header className={styles.header}>
      
        
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

        {isModalOpen && (
          <div className={styles.modal}>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formValues.title}
                onChange={handleChange}
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formValues.description}
                onChange={handleChange}
              />
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma-separated)"
                value={formValues.tags}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}

       
      </header>
    </section>
  );
}

export default Form;
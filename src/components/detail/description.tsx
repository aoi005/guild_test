import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from "./index.module.scss";


// const [replies, setReplies] = useState([]);

function Description( { detail }: { detail: string } ) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal} className={styles.detailbtn}>詳細を表示</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.modalback}>
        <h2>詳細</h2>
        <p className={styles.detailbox}>{detail}</p>
        <button onClick={closeModal} className={styles.detailbtn}>閉じる</button>
      </Modal>
    </div>
  );
}

export default Description;
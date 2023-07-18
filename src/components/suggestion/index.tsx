import styles from "./index.module.scss";
import Modal from 'react-modal';
import { useState } from 'react';
import React from "react";

function SuggestForm() {
  let subtitle ="";
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
}


  return (
    <div>
      <div className={styles.formbox}>
        <button onClick={openModal} className={styles.formbtn}>ご意見箱</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className={styles.formarea}
        overlayClassName={styles.modalOverlay} // 追加
        contentLabel="Example Modal"
      >
        <h2>ご意見はこちらから</h2>
        <button onClick={closeModal} className={styles.detailbtn}>閉じる</button>

        
        
      </Modal>
    </div>
  );
}

export default SuggestForm;
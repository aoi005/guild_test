import React, { useState } from 'react';
import Modal from 'react-modal';


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
      <button onClick={openModal}>詳細を表示</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>詳細</h2>
        <p>{detail}</p>
        <button onClick={closeModal}>閉じる</button>
      </Modal>
    </div>
  );
}

export default Description;
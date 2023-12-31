import styles from "./index.module.scss";
import Modal from 'react-modal';
import { useState } from 'react';
import React from "react";
import NewPost from "../firedetabox/NewPost";

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

function Popupsearch() {
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
  <div >
    
      <button onClick={openModal} className={styles.searchbtn}>
        検索
      </button>
    
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={{ letterSpacing: "20px", textAlign: "center" }}
        contentLabel="Example Modal"
        className={styles.formarea}
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button  style={{ letterSpacing: "20px", textAlign: "center" }}　onClick={closeModal}>×</button>


      <div>
        <p>
          投稿検索
        </p>
      </div>
        
        
        {/* <NewPost/> */}
      </Modal>
    </div>
  );
}

export default Popupsearch;
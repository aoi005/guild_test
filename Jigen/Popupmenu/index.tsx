import styles from "./index.module.scss";
import Modal from 'react-modal';
import { useState } from 'react';
import React from "react";
import Select from 'react-select'
import UploadForm from "../Firebase/returnup";



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


Modal.setAppElement('#__next');////////バグ修正

function Popup() {
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
       <div style={{  overflowY: 'auto' }} className={styles.formbox}>
      <button onClick={openModal} className={styles.formbtn}>投稿</button>
    
    
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // ariaHideApp={false}
          // style={{ letterSpacing: "20px", textAlign: "center" }}
          contentLabel="Example Modal"
          className={styles.formarea}
        >
       
 
        <button onClick={closeModal}>閉じる</button>

     
      
        
        <div className={styles.modalContent}> 

        <UploadForm />

        </div>
        


      </Modal>
      </div>

    </div>

 
  );
}

export default Popup;

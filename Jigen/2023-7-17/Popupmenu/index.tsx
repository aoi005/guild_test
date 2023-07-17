import styles from "./index.module.scss";
import Modal from 'react-modal';
import { useState } from 'react';
import React from "react";
import Select from 'react-select'
//import UploadForm from "../Firebase/returnup";
import UploadForm from "../BBSbase/returnup";

//import UploadFormsolicit from "../BBSsolicit/returnup";
//import UploadFormFight from "../BBSfight/returnup";
//import UploadFormquestion from "../BBSquestion/returnup";


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



function Popup() {
  let subtitle ="";
  const [modalIsOpen, setIsOpen] = useState(false);
  const [Memberform, setMemberform] = useState(false);
  const [solicitform, setSolicitform] = useState(false);
  const [fihgtform, setFihgtform] = useState(false);
  const [questionform, setQuestionform] = useState(false);

  function openModal() {
    setIsOpen(true);
    setMemberform(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
    setMemberform(false);
    setSolicitform(false);
    setFihgtform(false);
    setQuestionform(false);
  }

  function MemberOpen(){
    setMemberform(true);
    setSolicitform(false);
    setFihgtform(false);
    setQuestionform(false);
  }
  function SolicitOpen(){
    setMemberform(false);
    setSolicitform(true);
    setFihgtform(false);
    setQuestionform(false);
  }
  function FightOpen(){
    setMemberform(false);
    setSolicitform(false);
    setFihgtform(true);
    setQuestionform(false);
  }
  function QuestionOpen(){
    setMemberform(false);
    setSolicitform(false);
    setFihgtform(false);
    setQuestionform(true);
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
        
        <div>
          <button onClick={MemberOpen}>メンバー募集投稿</button>
          <button onClick={SolicitOpen}>勧誘募集投稿</button>
          <button onClick={FightOpen}>固定募集投稿</button>
          <button onClick={QuestionOpen}>質問募集投稿</button>
        </div>

        <div>

          {Memberform ? (
            <div className={styles.modalContent}> 
              <UploadForm collectionId='posts' />

            </div>

          ) : null}

          {solicitform ? (

            <div className={styles.modalContent}> 

              {/*<UploadFormsolicit/>*/}
              <UploadForm collectionId='solicit' />


            </div>
            
          ) : null}

          {fihgtform ? (

            <div className={styles.modalContent}> 

              {/*<UploadFormFight/>*/}
              <UploadForm collectionId='fight' />

            </div>
  
          ) : null}

          {questionform ? (

            <div className={styles.modalContent}> 

              {/*<UploadFormquestion/>*/}
              <UploadForm collectionId='question' />

            </div>
  
          ) : null}

        </div>


        <button onClick={closeModal} className={styles.detailbtn}>
          閉じる
        </button>

     
      
        
    


      </Modal>
      </div>

    </div>

 
  );
}

export default Popup;
import styles from "./index.module.scss";
import Modal from 'react-modal';
import { useState } from 'react';
import React from "react";
import Select from 'react-select'
import UploadForm from "../Firebase/returnup";
import UploadFormsolicit from "../BBSsolicit/returnup";
import UploadFormFight from "../BBSfight/returnup";
import UploadFormquestion from "../BBSquestion/returnup";

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
      <div className={styles.formbox}>
        <button onClick={openModal} className={styles.formbtn}>投稿</button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className={styles.formarea}
        overlayClassName={styles.modalOverlay} // 追加
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className={styles.detailbtn}>閉じる</button>

        <div className={styles.buttonGroup}>
          <button onClick={MemberOpen} className={styles.detailbtn}>メンバー募集投稿</button>
          <button onClick={SolicitOpen} className={styles.detailbtn}>勧誘募集投稿</button>
          <button onClick={FightOpen} className={styles.detailbtn}>固定募集投稿</button>
          <button onClick={QuestionOpen} className={styles.detailbtn}>質問募集投稿</button>
        </div>

        <div>
          {Memberform ? (
            <div className={styles.modalContent}>
              <UploadForm />
            </div>
          ) : null}

          {solicitform ? (
            <div className={styles.modalContent}>
              <UploadFormsolicit/>
            </div>
          ) : null}

          {fihgtform ? (
            <div className={styles.modalContent}>
              <UploadFormFight/>
            </div>
          ) : null}

          {questionform ? (
            <div className={styles.modalContent}>
              <UploadFormquestion/>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}

export default Popup;

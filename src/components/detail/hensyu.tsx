import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./index.module.scss";
import ChangeForm from "../Firebase/change";
import { Timestamp } from "firebase/firestore";
// const [replies, setReplies] = useState([]);

interface FirestoreData {
  id: string;
  title: string;
  name: string;
  detail: string;
  strT:number;
  time: Date;
  limit:Date;
  tag: TagFields;
  reply: { [repid: string]: rep };
}

interface rep {
  name: string;
  msg: string;
}

interface TagFields {
  [key: string]: boolean;
}

function Hensyu({ id, title, name, detail, strT, time, limit, tag, reply }: FirestoreData) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal} className={styles.detailbtn}>
        編集
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className={styles.detailarea}
      >
        <h2>編集</h2>
        <div>
          <ChangeForm
            id={id}
            title={title}
            name={name}
            detail={detail}
            strT={strT}
            time={time}
            limit={limit}
            tag={tag}
          />
        </div>
        <button onClick={closeModal} className={styles.detailbtn}>
          閉じる
        </button>
      </Modal>
    </div>
  );
}

export default Hensyu;
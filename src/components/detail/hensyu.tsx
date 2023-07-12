import React, { useState } from "react";
import Modal from "react-modal";
import styles from "./index.module.scss";
import ChangeForm from "../Firebase/change";
import { Timestamp } from "firebase/firestore";
// const [replies, setReplies] = useState([]);

interface FirestoreData {
  id: string;
  pas:string;
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

function Hensyu({ id,pas, title, name, detail, strT, time, limit, tag, reply }: FirestoreData) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [authentication, setAuthentication] = useState(false);
  const [different, setDifferent] = useState(false);

  function openModal() {
    setIsOpen(true);
   
  }

  function closeModal() {
    setIsOpen(false);
    setPassword("");
    setAuthentication(false);
    setDifferent(false);
  }

  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }

  function handleAuthentication() {
    if (password === pas) {
      setPassword("");
      setAuthentication(true);
      // パスワードが一致した場合にChangeFormを実行する処理を追加
    } else {
      setAuthentication(false);
      setDifferent(true);
    }
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
        <div>
          {!authentication ? (
            <>
              <h2>編集</h2>
              {different ? <p>パスワードが違います</p> : null}
              <label>
                パスワード:
                <input
                  type="text"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </label>
              <button onClick={handleAuthentication}>認証</button>
            </>
          ) : null}

          {authentication ? (
            <>
              <p>認証しました。編集を行ってください。</p>
              <ChangeForm
                id={id}
                pas={pas}
                title={title}
                name={name}
                detail={detail}
                strT={strT}
                time={time}
                limit={limit}
                tag={tag}
              />
            </>
          ) : null}
        </div>
        <button onClick={closeModal} className={styles.detailbtn}>
          閉じる
        </button>
      </Modal>
    </div>
  );
}

export default Hensyu;
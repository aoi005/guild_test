import styles from "./index.module.scss";
import Modal from 'react-modal';
import { useState } from 'react';
import React from "react";
import Select from 'react-select';
import {addData} from './addData';

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

const data = {
    name: "name",
    detail: "detail",
    title: "title",
    tags: ["tag1","tag2","tag3"],

  };

  

const options = [
  {value: 1, label: "初心者"},
  {value: 2, label: "中級者"},
  {value: 3, label: "上級者"},
  {value: 4, label: "エンジョイ"},
  {value: 5, label: "ガチ"}
]

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
       <div className={styles.formbox}>
      <button onClick={openModal} className={styles.formbtn}>投稿</button>
    
    
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          // style={{ letterSpacing: "20px", textAlign: "center" }}
          contentLabel="Example Modal"
        >
       
 
        <button onClick={closeModal}>×</button>

     
      
        <h4>メンバー募集</h4>
        <div>
          ギルド名<input></input>
        </div>
        <div>
          詳細<input></input>
        </div>

        <div style={{width: "500px", marginTop: "20px"}}>
          タグ
        <Select options={options} isMulti={true} />
         </div>


         <button  onClick={(event) => {addData("posts",data)}}>投稿する（仮）</button>
         <button onClick={closeModal}>投稿する（仮）２</button>





      </Modal>
      </div>

    </div>

 
  );
}

export default Popup;

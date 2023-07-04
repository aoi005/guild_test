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
import { useEffect} from 'react';
import {GetData} from '@/MyFunction/GetData';
import {MyType} from '@/MyFunction/GetData';

import { AddData } from '@/MyFunction/AddData';
import { SetData } from '@/MyFunction/SetData';
import { SetNewData } from '@/MyFunction/SetNewData';



const CId = "users";
const aaa = "newa";
const bbb = "newb";
const ccc = "newc";
const tagString =["tag1","tag2","tag3"] ;


function Popup() {

  
  const [data, setData] = useState<MyType[]>([]);

  useEffect(() => {
    GetData("users","123").then(gotData => {
      setData(gotData);
    }).catch(error => {
      console.error("Error fetching data: ", error);
    });
  }, []);

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
          // ariaHideApp={false}
          // style={{ letterSpacing: "20px", textAlign: "center" }}
          contentLabel="Example Modal"
        >
       
 
        <button onClick={closeModal}>×</button>

     
      
        <h4>メンバー募集</h4>

        <UploadForm />
        <div>
          
       
            <div >
              <p>{CId}</p>
              <p>{aaa}</p> 
              <p>{bbb}</p>
              <p>{ccc}</p>
              
            </div>
        
        </div>
        <button onClick={async () => {SetNewData("users",aaa,bbb,ccc,tagString)}}>
            Add Data
        </button>
        


      </Modal>
      </div>

    </div>

 
  );
}

export default Popup;
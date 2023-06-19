// import styles from "./index.module.scss";
import Modal from 'react-modal';
import { useState } from 'react';
import React from "react";

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
      <a onClick={openModal}>投稿</a>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={{ letterSpacing: "20px", textAlign: "center" }}
        contentLabel="Example Modal"
      >
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
        <button  style={{ letterSpacing: "20px", textAlign: "center" }}　onClick={closeModal}>×</button>


      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-base lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:fixed left-0 top-0 lg:static  lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
          メンバー募集&nbsp;
        </p>
      </div>
        
        
      <div className="mx-auto max-w-2xl px-4 my-10 ">
        <form>
          <div className="flex-col">
            <label htmlFor="name">ギルド名</label>
            <input
              className="w-full"
              type="text"
              autoComplete="off"
              id="neme"
            />
          </div>
          <div className="flex-col">
            <label htmlFor="detail">詳細</label>
            <textarea
              rows={6}
              className="w-full"
              required
              name="detail"
            ></textarea>
          </div>
          <div className="grid grid-cols-12 md:grid-cols-8">
            <div className="block">
              <label>aa</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>bb</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>cc</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>dd</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>ee</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>ff</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>gg</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>hh</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>ii</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>jj</label>
              <input type="checkbox"></input>
            </div>
          </div>
        </form>
        <button
          className="my-2 border-2 border-blue-400 rounded-md bg-blue-200
                           hover:bg-blue-400"
        >
          投稿
        </button>
      </div>

        
        
        <form>
          <input />
        </form>
      </Modal>
    </div>
  );
}

export default Popup;
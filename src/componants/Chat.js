import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import React, { useState } from "react";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "../firebase";
import Chatbox from "./Chatbox";
const auth = getAuth(app);

function Chat(props) {
  const [text, setText] = useState("");
  const db = getFirestore(app);

  // const handleSignout = async () => {
  //   const signout = await signOut(auth);
  // };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    try {
      await setDoc(doc(collection(db, "user")), {
        message: text,
        uid,
        photoURL,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
    setText("");
  };
  return (
    <div>
      {/* {console.log(text)} */}

      <div style={{ background: "white" }}>
        <form onSubmit={handlesubmit} className="form-controls">
          <input
            className="form-control"
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <button type="submit" disabled={!text} className="btn-primary btn">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;

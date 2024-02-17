import react, { useEffect, useRef, useState } from "react";
import { query, orderBy, limit } from "firebase/firestore";
import React from "react";
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
import Chat from "./Chat";
import Logout from "./Logout";
import "./chatbox.css";
import { auth } from "./Login";
const db = getFirestore(app);

export default function Chatbox() {
  const [message, setmessage] = useState(undefined);
  const [dummy, setdummy] = useState();
  const dummy2 = [];
  const refContainer = useRef();
  const scrollToBottom = () => {
    refContainer?.current?.scrollIntoView({ behavior: "smooth" });
    console.log(refContainer);
  };
  useEffect(async () => {
    try{
    const q = query(collection(db, "user"), orderBy("createdAt"), limit(50));
    console.log(q)
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    querySnapshot.forEach((snapShot) => {
      // doc.data() is never undefined for query doc snapshots

      //   const dummy = [];
      dummy2.push(snapShot.data());

      //   setmessage(([snapShot.id] = snapShot.data()));
    });
  }catch(e){
    console.log(e)
  }
    // console.log(dummy2);
    console.log(message,dummy2)
    setmessage(dummy2);
    scrollToBottom();
    // setdummy(querySnapshot.doc.data());
    // console.log(querySnapshot.data());
    // setmessage(...message, querySnapshot);
  }, []);

  return (
    <div className="container-fluid">
      <div className="fixed-top " style={{ background: "white" }}>
        <h1 className="w-100 " style={{ background: "red ", color: "yellow" }}>CHITCHAT...</h1>
        <Logout photo={auth.currentUser.photoURL} name={auth.currentUser.providerData[0].displayName}/>
      </div>
      {/* {console.log(message, "jggtjk")} */}
      <div className="chatmain ">
        {message &&
          message.map((data, index) => {
            return (
              <div
                key={index}
                className={`chat
                 ${auth.currentUser.uid === data.uid ? "sender" : "receiver"}`}
                ref={refContainer}
              >
                {/* console.log(data.message, "fhg"); */}
                <img src={data.photoURL} className="rounded-circle p-3" alt="img" />
                <p>{data.message}</p>
              </div>
            );
          })}
      </div>

      <div className="fixed-bottom">
        <Chat />
      </div>
      <div></div>
    </div>
  );
}

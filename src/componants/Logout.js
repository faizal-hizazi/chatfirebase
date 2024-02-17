import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { app } from "../firebase";
const auth = getAuth(app);
function Logout(props) {
  const handleSignout = async () => {
    const signout = await signOut(auth);
  };
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center flex px-5">
       
        <span style={{height:"20px",display:"flex", alignItems:"center"}}>{props.name}</span>
        <img style={{height:"55px"}} src={props.photo} className="rounded-circle " />
        
        
      <button onClick={handleSignout} className="btn btn-primary">
        sign out
      </button>
      </div>
    </div>
  );
}

export default Logout;

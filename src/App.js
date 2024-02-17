import logo from "./logo.svg";
import react from "react";
import "./App.css";
import { auth } from "./componants/Login";
import Chat from "./componants/Chat";
import Login from "./componants/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import Chatbox from "./componants/Chatbox";

function App() {
  const [user] = useAuthState(auth);
  return <div className="App">{user ? <Chatbox /> : <Login />}</div>;
}

export default App;

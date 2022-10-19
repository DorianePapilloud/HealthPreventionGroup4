import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./initFirebase";
import { useEffect, useState } from "react";
import Logout from "./pages/Logout";
import { userUIDInfo } from "./services/getCurrentUserUid"
import AvatarCreation from "./pages/AvatarCreation";

//test

export default function App() {
  /* Current user state */
  const [currentUser, setCurrentUser] = useState(undefined);

  /* Watch for authentication state changes */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if(!currentUser === undefined){
        userUIDInfo.setUID = user.uid ;
      }
      else{
        userUIDInfo.setUID = "Guest";
      }
    });

    // Unsubscribe from changes when App is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  if (currentUser === undefined) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Loading...</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/avatar" element={<AvatarCreation />} />
        </Routes>
      </header>
    </div>
  );
}

import "./App.css";
import "./Questionnaire"
import { Route, Routes, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { onAuthStateChanged } from "firebase/auth";
import {auth, db} from "./initFirebase";
import React, { useEffect, useState } from "react";
import Logout from "./pages/Logout";
import Questionnaire from "./Questionnaire";
import AvatarCreation from "./pages/AvatarCreation";
import NavBar from "./pages/NavBar/indexNB";
import Results from "./pages/Results"
import AdminPage from "./pages/AdminPage";
import UserContext from "./UserContext";
import Error404 from "./pages/Error404";
import About from "./pages/About";
import {doc, getDoc} from "firebase/firestore";
import {userConverter} from "./objects/user";

//test

export default function App() {
  /* Current user state */
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentHead, setCurrentHead] = useState(0);
  const [currentBody, setCurrentBody] = useState(0);
  const [currentFace, setCurrentFace] = useState(0);
  const [currentAdmin, setCurrentAdmin] = useState(false);

  /* Watch for authentication state changes */
  useEffect(() => {
    const getObject = async () => {
      let userUID = "Guest";
      if (currentUser !== null) {
        userUID = currentUser.uid;
      }
      else{
        setCurrentAdmin(false);
      }
      const ref = doc(db, "users", userUID).withConverter(userConverter);
      const docSnap = await getDoc(ref);

      if (docSnap.exists()) {
        // Convert to User object
        const user = docSnap.data();
        if(user.role === "Admin"){
          setCurrentAdmin(true);
        }else{
          setCurrentAdmin(false);
        }
      } else {

        console.log("No user found!");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User is", user);
      setCurrentUser(user);
    });

    getObject().then(() => {
    });
    // Unsubscribe from changes when App is unmounted
    return () => {
      unsubscribe();
    };
  },[currentUser] );

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
    <UserContext.Provider value={{currentUser, setCurrentUser, currentHead, setCurrentHead, currentBody, setCurrentBody,currentFace, setCurrentFace, currentAdmin, setCurrentAdmin }}>
    <div className="App">
      <div>
        <NavBar/>
      </div>
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/avatar" element={<AvatarCreation />} />
          <Route path="/questionnaire" element={<Questionnaire />} />
          <Route path="/results" element={<Results />} />
          {!currentAdmin ? (
              <Route path="/error404" element={<AdminPage />} />
          ) : (
              <Route path="/admin" element={<AdminPage />}  />
          )}
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </header>
    </div>
    </UserContext.Provider>
  );
}

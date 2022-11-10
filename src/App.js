import "./App.css";
import "./Questionnaire"
import { Route, Routes, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./initFirebase";
import { useEffect, useState } from "react";
import Logout from "./pages/Logout";
import Questionnaire from "./Questionnaire";
import AvatarCreation from "./pages/AvatarCreation";
import NavBar from "./pages/NavBar/indexNB";
import {DiabetesAlgorithm} from "./algorithms/DiabetesAlgorithm";
import {InfarctAlgorithm} from "./algorithms/InfarctAlgorithm";
import {NoInfarctAlgorithm} from "./algorithms/NoInfarctAlgorithm";
import {CancerAlgorithm} from "./algorithms/CancerAlgorithm";
import Results from "./pages/Results"
import AdminPage from "./pages/AdminPage";
import Error404 from "./pages/Error404";
import About from "./pages/About";

//test

export default function App() {
  /* Current user state */
  const [currentUser, setCurrentUser] = useState(undefined);

  /* Watch for authentication state changes */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User is", user);
      setCurrentUser(user);
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
      <div>
        <NavBar currentUser={currentUser}></NavBar>
      </div>
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/register" element={<Register currentUser={currentUser}/>} />
          <Route path="/login" element={<Login currentUser={currentUser}/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/questionnaire" element={<Questionnaire currentUser={currentUser} />} />
          <Route path="/avatar" element={<AvatarCreation currentUser={currentUser}/>} />
          <Route path="/results" element={<Results currentUser={currentUser}/>} />
          <Route path="/cancer" element={<CancerAlgorithm />} />
          <Route path="/infarct" element={<InfarctAlgorithm />} />
          <Route path="/noinfarct" element={<NoInfarctAlgorithm />} />
          <Route path="/diabete" element={<DiabetesAlgorithm />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </header>
    </div>
  );
}

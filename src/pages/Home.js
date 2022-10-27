import { Link } from "react-router-dom";
import {useState, useEffect, Component} from "react";
import { db } from "../initFirebase";
import { collection, getDoc, getDocs, doc } from 'firebase/firestore'
import { userUIDInfo } from "../services/getCurrentUserUid"
import { userConverter } from "../objects/user";
import Header from "./Header";


// export default function Home({ currentUser }) {

export default function Home() {


  // const [users, setUsers] = useState([]) ;
  // const [speech, setSpeech] = useState("");
  // let uName = "";
  // let uSurname = "";
  // let base = "";

  // useEffect(() => {
  //     let userUID = userUIDInfo.getUID;
  //
  //     const getObject = async () => {
  //         const ref = doc(db, "users", userUID).withConverter(userConverter);
  //         const docSnap = await getDoc(ref);
  //
  //         if (docSnap.exists()) {
  //             // Convert to User object
  //             const user = docSnap.data();
  //             // set the text to display
  //             uName = await user.getName();
  //             uSurname = await user.getSurname();
  //             base = "Welcome back ";
  //         } else {
  //             console.log("No user found!");
  //         }
  //     }
  //     getObject().then(() => {
  //         setSpeech(base + uName + " " + uSurname);
  //     });
      // get all docs
      // const userCollectionRef = collection(db, "users")
      // const getUsers = async () => {
      //
      //     const data = await getDocs(userCollectionRef);
      //     setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      // };
      //getUsers();
  // }, []);

  return (
    <div>
        <Header/>
    </div> )
        {/*<p>{speech}</p>*/}
      {/*<h1></h1>*/}
      {/*  {users.map((user) => {*/}
      {/*      return (*/}
      {/*          <div>*/}
      {/*              <h1>Name: {user.name}</h1>*/}
      {/*              <p>Surname: {user.surname}</p>*/}
      {/*          </div>*/}
      {/*      );*/}
      {/*  })}*/}
      {/*{!currentUser ? (*/}
  {/*      <>*/}
  {/*        <Link to="/register" className="App-link">*/}
  {/*          Register*/}
  {/*        </Link>*/}
  {/*        <span> / </span>*/}
  {/*        <Link to="/login" className="App-link">*/}
  {/*          Login*/}
  {/*        </Link>*/}
  {/*      </>*/}
  {/*    ) : (*/}
  {/*      <Link to="/logout" className="App-link">*/}
  {/*        Logout*/}
  {/*      </Link>*/}
  {/*    )}*/}
  {/*  </div>*/}
  {/*);*/}

}

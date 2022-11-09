import UserRegisterForm from "../components/UserRegisterForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import {Link, useNavigate} from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../initFirebase";
import { userUIDInfo } from "../services/getCurrentUserUid"
import "../css/Register.scss"
import React from "react";
import logo from "../images/loginRegister/LogoHealthCareApp.png"
import registerImage from "../images/loginRegister/OnlineDoctor.gif"
import UserContext from "../UserContext";


export default function Register() {
  const navigate = useNavigate();
  const userContext = React.useContext(UserContext);
  const currentUser = userContext.currentUser;

  const handleRegister = async (e, email, password, name, surname, country, gender) => {
    e.preventDefault();

    try {
      let data = await createUserWithEmailAndPassword(auth, email, password);
      let userUID = "Guest";
      if(currentUser !== null){
        userUID = currentUser.uid;
      }

      // TODO : pass the name, surname, role and answers as handleregister inputs
      await setDoc(doc(db, "users", userUID), {
        name: name,
        surname: surname,
        email: email,
        country: country,
        gender: gender,
        role: "Client",
        avatarID: "",
        questionnaire: [],
      });
      navigate("/avatar");
    } catch (e) {
      console.error(e);
    }
  };
  return (
      <div className='main-register'>
        <div className="login-contain">
          <div className="left-side">
            <UserRegisterForm handleSubmit={handleRegister} submitButtonLabel="Register" />
            <div className="footer">
              <h6>Already have an account ?
                <Link className='link' to='/login'> Login </Link>
              </h6>
            </div>
          </div>
          <div className="right-side">
            <div className="welcome_note">
              <h3>Create account</h3>
            </div>
            <div className="welcomeImg">
              <img id="welcome_doctors" src={registerImage} />
            </div>
          </div>
        </div>
      </div>
  );
}
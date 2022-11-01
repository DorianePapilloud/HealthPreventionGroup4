import UserRegisterForm from "../components/UserRegisterForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import {Link, useNavigate} from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../initFirebase";
import "../css/Register.scss"
import logo from "../images/loginRegister/LogoHealthCareApp.png"
import registerImage from "../images/loginRegister/RegisterWhiteBG.gif"


export default function Register({ currentUser }) {
  const navigate = useNavigate();

  const handleRegister = async (e, email, password, name, surname, country, gender) => {
    e.preventDefault();

    try {
      let data = await createUserWithEmailAndPassword(auth, email, password);
      let userUID = data.user.uid;
      // userUIDInfo.setUID = userUID;

      // TODO : pass the name, surname, role and answers as handleregister inputs
      await setDoc(doc(db, "users", userUID), {
        name: name,
        surname: surname,
        email: email,
        country: country,
        gender: gender,
        role: "Client",
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

{/*<div className="left-side">*/}
{/*  <div className="header">*/}
{/*    <img id="img_logo" src={logo} alt="" />*/}
{/*  </div>*/}
{/*  <div className="body">*/}
{/*    <img id="img_register" src={registerImage} alt="" />*/}
{/*  </div>*/}
{/*  <p>The information you will enter are not going to be visible for anyone else other than you.*/}
{/*    We respect your privacy by not keeping any personal information into your questionnaire. </p>*/}
{/*</div>*/}
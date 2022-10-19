import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import UserForm from "../components/UserForm";
import {Link, useNavigate} from "react-router-dom";
import "../Login.scss";
import logo from "./LogoHealthCareApp.png"
import welcomeImg from "./DoctorsBG1.gif"
// import Questionnaire from "./Questionnaire";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (e, email, password) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='main-login'>
        <h1></h1>
      <div className="login-contain">
          <div className="left-side">
              <div className="img-class">
                  <img id="img_id" src={logo} alt="" />
              </div>
              <UserForm handleSubmit={handleLogin} submitButtonLabel="Login"/>
              <div className="footer">
                  <h6>Don't have an account yet ?
                      <Link className='link' to='/register'> Register Now </Link>
                  </h6>
              </div>
          </div>
          <div className="right-side">
              <div className="welcome_note">
                  <h3>Welcome back !</h3>
              </div>
              <div className="welcomeImg">
                  <img id="welcome_doctors" src={welcomeImg} />
              </div>
          </div>
      </div>
    </div>
  );
}

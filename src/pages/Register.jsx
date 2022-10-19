import UserForm from "../components/UserForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import "../Register.scss";
import {Link} from "react-router-dom";
import logo from "./LogoHealthCareApp.png"
import registerImage from "./RegisterWhiteBG.gif"

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e, email, password) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="main-register">
      <div className="left-side">
          <div className="header">
              <img id="img_logo" src={logo} alt="" />
          </div>
          <div className="body">
              <img id="img_register" src={registerImage} alt="" />
          </div>
          <p>The information you will enter are not going to be visible for anyone else other than you.
          We respect your privacy by not keeping any personal information into your questionnaire. </p>
      </div>
      <div className="right-side">
          <div className="top-right">
              {/*<UserForm handleSubmit={handleRegister} submitButtonLabel="Register" />*/}
              <h6>Already have an account ?
                  <Link id='link-login' to='/login'> Log in </Link>
              </h6>
          </div>
          <div className="body-right">
              <div className="container">
                  <h1>Create account</h1>
                  <form>
                  <div className="input-group">
                    <h5>First Name</h5>
                    <input type="text" name="Fname" id="fname"/>
                  </div>
                  <div className="input-group">
                      <h5>Last Name</h5>
                      <input type="text" name="Fname" id="fname"/>
                  </div>
                  <div className="input-group">
                      <h5>Email</h5>
                      <input type="Email" name="email" id="email1"/>
                  </div>
                  <div className="input-group">
                      <h5>Password</h5>
                      <input type="password" name="pwd" id="pwd1"/>
                  </div>
                  <div className="input-group">
                      <h5>Confirm password</h5>
                      <input type="password" name="pwd" id="pwd2"/>
                  </div>
                      <input type="submit" id='submit_button' value="Submit"/>
                  </form>
              </div>
          </div>
      </div>

    </div>
  );
}

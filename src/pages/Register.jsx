import UserRegisterForm from "../components/UserRegisterForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../initFirebase";
import { userUIDInfo } from "../services/getCurrentUserUid"
import "../css/Register.scss"

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e, email, password, name, surname, country, gender) => {
    e.preventDefault();

    try {
      let data = await createUserWithEmailAndPassword(auth, email, password);
      let userUID = data.user.uid;
      userUIDInfo.setUID = userUID;

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
      <div>
        <h1>Register</h1>
        <UserRegisterForm handleSubmit={handleRegister} submitButtonLabel="Register" />
      </div>
  );
}
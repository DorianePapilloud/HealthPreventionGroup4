import UserForm from "../components/UserForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "../initFirebase";
import { userUIDInfo } from "../services/getCurrentUserUid"

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (e, email, password) => {
    e.preventDefault();

    try {
      let data = await createUserWithEmailAndPassword(auth, email, password);
      let userUID = data.user.uid;
      userUIDInfo.setUID = userUID;

      // TODO : pass the name, surname, role and answers as handleregister inputs
      await setDoc(doc(db, "users", userUID), {
        name: "Marie",
        surname: "Curie",
        role: "PNJ",
        answers: [5, true, "hello"],
      });
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
      <div>      <h1>Register</h1>      <UserForm handleSubmit={handleRegister} submitButtonLabel="Register" />    </div>  );
}
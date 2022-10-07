import UserForm from "../components/UserForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../initFirebase";
export default function Register() {
  const navigate = useNavigate();
  let userUID;
  const handleRegister = async (e, email, password) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(data => {
        console.log("Je suis laaaa");
        userUID = data.user.uid;
        db.collection("user").doc(userUID).set({
          Role: "PNJ"
        });
      });
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };
  return (
      <div>      <h1>Register</h1>      <UserForm handleSubmit={handleRegister} submitButtonLabel="Register" />    </div>  );
}

import {useContext, useEffect} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Logout() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  useEffect(() => {
    async function logout() {
      await signOut(auth);
      navigate("/");
    }

    logout();
  }, [navigate]);

  return <h1>Logging out...</h1>;
}

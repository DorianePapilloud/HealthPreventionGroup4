import {useNavigate} from "react-router-dom";
import AvatarForm from "../components/AvatarForm";
import {db} from "../initFirebase";
import {doc, setDoc} from "firebase/firestore";
import {avatarInfo} from "../services/getCurrentAvatar";
import avatarCreation from "../css/avatarCreation.module.scss"
import UserContext from "../UserContext";
import React from "react";

export default function AvatarCreation() {
    const navigate = useNavigate();
    const userContext = React.useContext(UserContext);
    const user = userContext.currentUser;

    // set the data
    const face = avatarInfo.getFace
    const head = avatarInfo.getHead;
    const body = avatarInfo.getBody;
    console.log(user.uid);
    const handleAvatarCreation = async () => {
        let userUID = "Guest";
        if(user !== null){
            userUID = user.uid;
        }

        console.log("Avatar UID test : " + user.uid);

        try {
            // create avatar in DB with the data set
            await setDoc(doc(db, "avatars", userUID), {
                face: face,
                body: body,
                head: head,
            });
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <h1>Avatar</h1>
            <br/>
            <AvatarForm/>
            <br/>
            <button id={avatarCreation.create_btn} onClick={handleAvatarCreation}>Create</button>
        </div>
    );
}

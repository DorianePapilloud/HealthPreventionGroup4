import {useNavigate} from "react-router-dom";
import AvatarForm from "../components/AvatarForm";
import {db} from "../initFirebase";
import {doc, setDoc} from "firebase/firestore";
import {avatarInfo} from "../services/getCurrentAvatar";

export default function AvatarCreation({ currentUser }) {
    const navigate = useNavigate();

    // set the data
    const face = avatarInfo.getFace
    const head = avatarInfo.getHead;
    const body = avatarInfo.getBody;
    console.log(currentUser.uid);
    const handleAvatarCreation = async () => {
        console.log("Avatar UID test : " + currentUser.uid);
        let userUID = currentUser.uid;

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
            <button onClick={handleAvatarCreation}>Create</button>
        </div>
    );
}

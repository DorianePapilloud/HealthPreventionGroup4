import {useNavigate} from "react-router-dom";
import AvatarForm from "../components/AvatarForm";
import {db} from "../initFirebase";
import {userUIDInfo} from "../services/getCurrentUserUid";
import {doc, setDoc} from "firebase/firestore";
import {avatarInfo} from "../services/getCurrentAvatar";

export default function AvatarCreation() {
    const navigate = useNavigate();

    // set the data
    const face = avatarInfo.getFace
    const head = avatarInfo.getHead;
    const body = avatarInfo.getBody;

    const handleAvatarCreation = async () => {
        let userUID = userUIDInfo.getUID;

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

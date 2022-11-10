import {useState} from "react";
import {HeadImageData} from "../images/avatar/heads/head";
import {BodyImageData} from "../images/avatar/body/body";
import {FaceImageData} from "../images/avatar/faces/face";
import avatarCreation from "../css/avatarCreation.module.scss"
import {avatarInfo} from "../services/getCurrentAvatar";

export default function AvatarForm() {
    const [currentHead, setCurrentHead] = useState(0);
    const [currentBody, setCurrentBody] = useState(0);
    const [currentFace, setCurrentFace] = useState(0);

    const Avatar = () => {
        const headLength = HeadImageData.length;
        function nextHead() {
            setCurrentHead( currentHead === headLength - 1 ? 0 : currentHead + 1 );
            avatarInfo.setHead = currentHead;
        }
        function prevHead() {
            setCurrentHead( currentHead === 0 ? headLength - 1 : currentHead - 1 );
            avatarInfo.setHead = currentHead;
        }

        const bodyLength = BodyImageData.length;
        function nextBody() {
            setCurrentBody( currentBody === bodyLength - 1 ? 0 : currentBody + 1 );
            avatarInfo.setBody = currentBody;
        }
        function prevBody() {
            setCurrentBody( currentBody === 0 ? bodyLength - 1 : currentBody - 1 );
            avatarInfo.setBody = currentBody;
        }

        const faceLength = FaceImageData.length;
        function nextFace() {
            setCurrentFace( currentFace === faceLength - 1 ? 0 : currentFace + 1 );
            avatarInfo.setFace = currentFace;
        }
        function prevFace() {
            setCurrentFace( currentFace === 0 ? faceLength - 1 : currentFace - 1 );
            avatarInfo.setFace = currentFace;
        }
        return (
            <>
                <div className={avatarCreation.main_div}>
                {HeadImageData.map( (head,index) => {
                    return (
                        <div>
                            { index === currentHead && <img className={avatarCreation.head} src={head.image} alt="images" />}
                        </div>
                )
                })}

                    {FaceImageData.map( (face,index) => {
                        return (
                            <div>
                                { index === currentFace && <img className={avatarCreation.face} src={face.image} alt="images" />}
                            </div>
                        )
                    })}

                    {BodyImageData.map( (body,index) => {
                        return (
                            <div>
                                { index === currentBody && <img className={avatarCreation.body} src={body.image} alt="images" />}
                            </div>
                        )
                    })}
                </div>

                <div className={avatarCreation.change_buttons}>
                <button onClick={prevHead}>&lt;</button>
                <text className={avatarCreation.info}>Head</text>
                <button onClick={nextHead}>&gt;</button>
                <br></br>
                <button onClick={prevBody}>&lt;</button>
                <text className={avatarCreation.info}>Body</text>
                <button onClick={nextBody}>&gt;</button>
                <br></br>
                <button onClick={prevFace}>&lt;</button>
                <text className={avatarCreation.info}>Face</text>
                <button onClick={nextFace}>&gt;</button>
                </div>
            </>
        )
    }

    return (
        <>
            <Avatar></Avatar>
            <br></br>
        </>
    );
}
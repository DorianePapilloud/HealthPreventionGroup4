import {useState} from "react";
import {HeadImageData} from "../images/avatar/heads/head";
import {BodyImageData} from "../images/avatar/body/body";
import {FaceImageData} from "../images/avatar/faces/face";
import avatarCreation from "../css/avatarCreation.module.css"
import {avatarInfo} from "../services/getCurrentAvatar";

export default function AvatarForm() {
    const [currentHead, setCurrentHead] = useState(0);
    const [currentBody, setCurrentBody] = useState(0);
    const [currentFace, setCurrentFace] = useState(0);

    const Head = () => {
        const headLength = HeadImageData.length;
        function nextHead() {
            setCurrentHead( currentHead === headLength - 1 ? 0 : currentHead + 1 );
            avatarInfo.setHead = currentHead;
        }
        function prevHead() {
            setCurrentHead( currentHead === 0 ? headLength - 1 : currentHead - 1 );
            avatarInfo.setHead = currentHead;
        }
        return (
            <>
                {HeadImageData.map( (head,index) => {
                    return (
                        <div>
                            { index === currentHead && <img className={avatarCreation.head} src={head.image} alt="images" />}
                        </div>
                )
                })}
                <br/><br/><br/><br/><br/>
                <button onClick={prevHead}>+</button>
                <text className={avatarCreation.info}>Head</text>
                <button onClick={nextHead}>-</button>
            </>
        )
    }

    const Body = () => {
        const bodyLength = BodyImageData.length;
        function nextBody() {
            setCurrentBody( currentBody === bodyLength - 1 ? 0 : currentBody + 1 );
            avatarInfo.setBody = currentBody;
        }
        function prevBody() {
            setCurrentBody( currentBody === 0 ? bodyLength - 1 : currentBody - 1 );
            avatarInfo.setBody = currentBody;
        }
        return (
            <>
                {BodyImageData.map( (body,index) => {
                    return (
                        <div>
                            { index === currentBody && <img className={avatarCreation.body} src={body.image} alt="images" />}
                        </div>
                    )
                })}
                <button onClick={prevBody}>+</button>
                <text className={avatarCreation.info}>Body</text>
                <button onClick={nextBody}>-</button>
            </>
        )
    }

    const Face = () => {
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
                {FaceImageData.map( (face,index) => {
                    return (
                        <div>
                            { index === currentFace && <img className={avatarCreation.face} src={face.image} alt="images" />}
                        </div>
                    )
                })}
                <button onClick={prevFace}>+</button>
                <text className={avatarCreation.info}>Face</text>
                <button onClick={nextFace}>-</button>
            </>
        )
    }

    return (
        <>
            <Head></Head>
            <Face></Face>
            <Body></Body>
            <br></br>
        </>
    );
}
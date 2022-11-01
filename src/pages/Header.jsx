import "../css/Header.scss"
import headerImg from "../images/loginRegister/Wave.jpg"


export default function Header(){
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSmall">Health Prevention</span>
                <span className="headerTitleLarge">WeCare</span>
            </div>
            <div className="img_container">
                <img className="header_img" src={headerImg}/>
                <button className="start_button"><span>Start questionnaire</span></button>
            </div>

        </div>
    )
}
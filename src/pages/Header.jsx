import "../css/Header.scss"
import headerImg from "../images/loginRegister/Wave.jpg"
import {NavLinks} from "./NavBar/NavBar";
import React from "react";


export default function Header(){
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSmall">Health Prevention</span>
                <span className="headerTitleLarge">WeCare</span>
            </div>
            <div className="img_container">
                <img className="header_img" src={headerImg}/>
                <NavLinks to='/questionnaire'><button className="start_button"><span>Start questionnaire</span></button></NavLinks>
            </div>

        </div>
    )
}
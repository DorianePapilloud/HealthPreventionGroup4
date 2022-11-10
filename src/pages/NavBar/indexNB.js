import React, {useEffect, useState} from 'react';
import {Nav, NavBarContainer, NavLinks, NavCenter, NavLeft, NavRight, User, LogoWeCare} from "./NavBar";
import userImg from "../../images/loginRegister/user.jpg";
import logoImg from "../../images/loginRegister/LogoHealthCareApp.png";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../initFirebase";
import {userConverter} from "../../objects/user";
import UserContext from "../../UserContext";
import {useNavigate} from "react-router-dom";

export default function NavBar() {

    const [users, setUsers] = useState([]) ;
    const userContext = React.useContext(UserContext);
    const currentUser = userContext.currentUser;
    const [role, setRole] = useState("");

    useEffect( () => {
        let userUID = "Guest";
        if (currentUser !== null) {
            userUID = currentUser.uid;
        }
        else{
            userContext.setCurrentAdmin(false);
        }

        const getObject = async () => {
            const ref = doc(db, "users", userUID).withConverter(userConverter);
            const docSnap = await getDoc(ref);

            if (docSnap.exists()) {
                // Convert to User object
                const user = docSnap.data();
                if(user.role === "Admin"){
                    userContext.setCurrentAdmin(true);
                }else{
                    userContext.setCurrentAdmin(false);
                }
            } else {

                console.log("No user found!");
            }
        }

        console.log(role);

        getObject().then(() => {
        });

    }, [currentUser]);

    return (
        <>
            <Nav>
                <NavBarContainer>
                    <NavLeft>
                        <LogoWeCare src={logoImg}></LogoWeCare>
                        <NavLinks to='/'>WeCare</NavLinks>
                    </NavLeft>
                    <NavCenter>
                        <NavLinks to='/'>Home</NavLinks>
                        |
                        <NavLinks to='/about'>About</NavLinks>
                        |
                        {!userContext.currentAdmin ? (
                                <NavLinks to="/register">
                                   Register
                                </NavLinks>
                        ) : (
                            <NavLinks to="/admin">
                                Normal Values
                            </NavLinks>
                        )}
                    </NavCenter>
                    <NavRight>
                        <User src={userImg}></User>
                        {users.map((user) => {
                            return (
                                <div>
                                    <h1>Name: {user.name}</h1>
                                    <p>Surname: {user.surname}</p>
                                </div>
                            );
                        })}
                        {!currentUser ? (
                            <>
                                <NavLinks to="/login">
                                    Login
                                </NavLinks>
                            </>
                        ) : (
                            <NavLinks to="/logout">
                                Logout
                            </NavLinks>
                        )}

                    </NavRight>
                </NavBarContainer>
            </Nav>

        </>
    );
};


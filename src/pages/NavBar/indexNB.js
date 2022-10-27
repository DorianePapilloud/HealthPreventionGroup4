import React, {useEffect, useState} from 'react';
import {Nav, NavBarContainer, NavLinks, NavCenter, NavLeft, NavRight, User} from "./NavBar";
import userImg from "../../images/loginRegister/user.jpg";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../../initFirebase";
import {userConverter} from "../../objects/user";


export default function NavBar({ currentUser }) {

    const [users, setUsers] = useState([]) ;
    let userUID = "Guest";

    useEffect(() => {
        if(currentUser){
            userUID = currentUser.uid;
        }

        const getObject = async () => {
            const ref = doc(db, "users", userUID).withConverter(userConverter);
            const docSnap = await getDoc(ref);

            if (docSnap.exists()) {
                // Convert to User object
                const user = docSnap.data();
            } else {
                console.log("No user found!");
            }
        }
        getObject().then(() => {
        });
    }, []);


    return (
        <>
            <Nav>
                <NavBarContainer>
                    <NavLeft>
                        <NavLinks to='/'>WeCare</NavLinks>
                    </NavLeft>
                    <NavCenter>
                            <NavLinks to='/'>Home</NavLinks>
                            <NavLinks to='/'>About</NavLinks>
                            <NavLinks to='/register'>Sign in</NavLinks>
                    </NavCenter>
                    <NavRight>
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
                        <User src={userImg}></User>
                    </NavRight>
                </NavBarContainer>
            </Nav>

        </>
    );
};


import {useNavigate} from "react-router-dom";
import React from "react";
import {useEffect, useState} from "react";
import ReactSlider from "react-slider";
import Slider from '../components/Slider';
import '../css/Results.scss';
import {DiabetesAlgorithm} from "../algorithms/DiabetesAlgorithm";
import {render} from "@testing-library/react";
import {NoInfarctAlgorithm} from "../algorithms/NoInfarctAlgorithm";
import {CancerAlgorithm} from "../algorithms/CancerAlgorithm"
import {InfarctAlgorithm} from "../algorithms/InfarctAlgorithm";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../initFirebase";
import {userConverter} from "../objects/user";
import {questionnaireConverter} from "../objects/questionnaireOBJ";
import UserContext from "../UserContext";
import {avatarConverter} from "../objects/avatar";
import {FaceImageData} from "../images/avatar/faces/face";
import {HeadImageData} from "../images/avatar/heads/head";
import {BodyImageData} from "../images/avatar/body/body";
import {NavLinks} from "./NavBar/NavBar";
export default class Results extends React.Component {
    static contextType = UserContext;
    constructor(props){
        super(props);

        this.diabetAlgo = React.createRef();
        this.noInfarctAlgo = React.createRef();
        this.cancerAlgo = React.createRef();
        this.infarctAlgo = React.createRef();

        this.state = {
            // avatar
            head: 0,
            face: 0,
            body: 0,
            nameUser: '',
            surnameUser: '',

            // diabetes
            gender: 1,
            age: 35,
            height: 180,
            weight: 100,
            highBloodGlucose: 0,
            sport: 1,
            alim: 1,

            // infarct
            smoke: 0,
            bloodPressure: 1,
            diabetes: 0,
            infarct: 1,
            chol1: 1,
            hdl: 1,

            // noInfarct
            afinf: 0,

            // cancer
            afcancer : 1,
            alcohol: 1,

            // display
            value: 1
        }

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.handleSmokeRadio = this.handleSmokeRadio.bind(this);
        this.handleSportChange = this.handleSportChange.bind(this);
        this.handleAlimChange = this.handleAlimChange.bind(this);
        this.handleAlcoholChange = this.handleAlcoholChange.bind(this);
    }

    async componentDidMount() {

        let userUID = "Guest";
        const userContext = this.context;

        if(userContext.currentUser !== null){
            userUID = userContext.currentUser.uid;
        }
        console.log("User UID :" + userUID);
        // get the responses inside the database
        let ref = doc(db, "users", userUID).withConverter(userConverter);
        let docSnap = await getDoc(ref);

        // Convert to User object
        let user = docSnap.data();
        // set the text to display
        const questID = await user.getQuestionnaire();
        let userName = await user.getName();
        let userSurname = await user.getSurname();
        let refQuest = doc(db, "questionnaire", questID[questID.length-1]).withConverter(questionnaireConverter);
        let docSnapQuest = await getDoc(refQuest);
        let questOBJ = docSnapQuest.data();
        let answers = await questOBJ.getAnswers();
        console.log(answers[1].name);

        this.setState({
            nameUser: userName,
            surnameUser: userSurname,
            gender: answers[0].value,
            age: answers[1].value,
            weight: answers[2].value,
            height: answers[3].value,
            bloodPressure: answers[4].value,
            highBloodGlucose: answers[5].value,
            chol1: answers[6].value,
            diabetes: answers[7].value,
            infarct: answers[8].value,
            afcancer: answers[10].value,
            afinf: answers[11].value,
            smoke: answers[12].value,
            alim: answers[13].value,
            sport: answers[14].value,
            alcohol: answers[15].value,
            value: answers[2].value,
        });

        // display or not the infarct
        if(answers[8].value == 1){
            // hide noInfarct
            const box = document.getElementsByClassName('algo-section-noInfarct')[0];
            box.style.display = 'none';
        }else {
            // hide infarct
            const box = document.getElementsByClassName('algo-section-infarct')[0];
            box.style.display = 'none';
        }

        // set the avatar
        let refAvatar = doc(db, "avatars", userUID).withConverter(avatarConverter);
        let docSnapAvatar = await getDoc(refAvatar);
        let avatarOBJ = docSnapAvatar.data();
        let avatarHead = avatarOBJ.getHead();
        let avatarFace = avatarOBJ.getFace();
        let avatarBody = avatarOBJ.getBody();
        this.setState({
            head: avatarHead,
            body: avatarBody,
            face: avatarFace
        });

        this.onClick();
    }

    onClick = () => {
        // diabetes
        this.diabetAlgo.current.setState({
            gender: this.state.gender,
            age: this.state.age,
            height: this.state.height,
            weight: this.state.weight,
            hypertension: this.state.bloodPressure,
            highBloodGlucose: this.state.highBloodGlucose,
            sport: this.state.sport,
            alim: this.state.alim,
        });
        this.diabetAlgo.current.calculateDiabetesRisk();

        // infarct
        this.infarctAlgo.current.setState({
            age: this.state.age,
            gender: this.state.gender,
            smoke: this.state.smoke,
            bloodPressure: this.state.bloodPressure,
            diabetes: this.state.diabetes,
            infarct: this.state.infarct,
            chol1: this.state.chol1,
            hdl: this.state.chol1,
        });

        // noInfarct
        this.noInfarctAlgo.current.setState({
            age: this.state.age,
            gender: this.state.gender,
            smoke: this.state.smoke,
            bloodPressure: this.state.bloodPressure,
            chol: this.state.chol1,
            hdl: this.state.chol1,
            afinf: this.state.afinf,
        });
        this.noInfarctAlgo.current.finalResult();

        // cancer
        console.log("state before cancer + " + this.state.alim)
        this.cancerAlgo.current.setState({
            afcancer : this.state.afcancer,
            smoke: this.state.smoke,
            height: this.state.height,
            weight: this.state.weight,
            sport: this.state.sport,
            alcohol: this.state.alcohol,
            alim: this.state.alim,
        }, () => this.cancerAlgo.current.getCancerRisk())
    }

    increment() {
        this.setState(prevState => {
            return {value: prevState.value < 150? prevState.value+1 : 150,
                weight: prevState.value < 150? prevState.value+1 : 150}
        });
    }

    componentDidUpdate() {
        this.onClick();
    }

    decrement() {
        this.setState(prevState => {
            return {value: prevState.value > 30? prevState.value-1 : 30,
                weight: prevState.value > 30? prevState.value-1 : 30}
        });
    }

    handleSmokeRadio(event) {
        this.setState({
            smoke: event.target.value
        });
    }

    handleSportChange(event) {
        this.setState({
            sport: event.target.value
        });
    }

    handleAlimChange(event) {
        this.setState({
            alim: event.target.value
        });
    }

    handleAlcoholChange(event) {
        this.setState({
            alcohol: event.target.value
        });
    }

render()
{

    return (
        <div className="results-page">
            <div className={"top-section"}>
                <div className={"avatar-section"}>
                    <div className={"result-avatar"}>
                        {/*avatar goes here*/}
                        {this.state.name} {this.state.surname}
                        <div className={"avatar"}>
                            {FaceImageData.map( (face,index) => {
                                return (
                                    <div>
                                        { index === this.state.face && <img className={"face"} src={face.image} alt="images" />}
                                    </div>
                                )
                            })}
                            {HeadImageData.map( (head,index) => {
                                return (
                                    <div>
                                        { index === this.state.head && <img className={"head"} src={head.image} alt="images" />}
                                    </div>
                                )
                            })}
                            {BodyImageData.map( (body,index) => {
                                return (
                                    <div>
                                        { index === this.state.body && <img className={"body"} src={body.image} alt="images" />}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className={"result-avatar-description"}>
                        {/*title under avatar goes here*/}
                    </div>
                    <NavLinks to='/avatar'><button id="edit_button">Edit</button></NavLinks>

                </div>
                <div className={"algo"}>
                    <div className={"algo-section"}>
                        {/*Diabetes*/}
                        <div className={"algo-description"}>
                            <div className={"algo-description-text"}>
                                <h2 className="h2_results">Diabetes</h2>
                                <p>Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy.
                                    Your body breaks down most of the food you eat into sugar (glucose) and releases it into your bloodstream.
                                    When your blood sugar goes up, it signals your pancreas to release insulin. Insulin acts like a key to let
                                    the blood sugar into your body???s cells for use as energy.
                                    Losing weight, eating healthy food, and being active can really help reducing your diabetes risk.</p>
                            </div>
                            <div className={"algo-description-graph"}>
                                <DiabetesAlgorithm ref={this.diabetAlgo}/>
                            </div>
                        </div>
                        <div className={"algo-details-link"} >
                            <a className={"link2"} href="https://en.wikipedia.org/wiki/Diabetes" target="_blank" >Details</a>
                        </div>
                    </div>

                    <div className={"algo-section"}>
                        {/*Cancer*/}
                        <div className={"algo-description"}>
                            <div className={"algo-description-text"}>
                                <h2 className="h2_results">Cancer</h2>
                                <p>Cancer is a condition where cells in a specific part of the body grow and reproduce uncontrollably. The cancerous cells
                                    can invade and destroy surrounding healthy tissue, including organs.
                                    Cancer sometimes begins in one part of the body before spreading to other areas. This process is known as metastasis.
                                    You can reduce your risk of getting cancer by keeping a healthy weight, avoiding tobacco, limiting the amount of alcohol you drink, and protecting your skin.</p>
                            </div>
                            <div className={"algo-description-graph"}>
                                <CancerAlgorithm ref={this.cancerAlgo}/>
                            </div>
                        </div>
                        <div className={"algo-details-link"}>
                            <a className={"link2"} href="https://en.wikipedia.org/wiki/Cancer" target="_blank" >Details</a>
                        </div>
                    </div>


                    <div className={"algo-section-infarct"}>
                        {/*Infarct*/}
                        <div className={"algo-description"}>
                            <div className={"algo-description-text"}>
                                <h2 className="h2_results">Infarct</h2>
                            <p>An infarct can occur when an area of necrosis occurs in a tissue or organ resulting from obstruction of the local circulation by a thrombus or embolus.
                                This can eventually cause a heart attack to occur.
                                You can reduce your risk of getting a heart attack by keeping a healthy weight, avoiding tobacco,
                            limiting the amount of alcohol you drink, being physically active, keeping your stress level low.</p>
                            </div>
                            <div className={"algo-description-graph"}>
                                <InfarctAlgorithm ref={this.infarctAlgo}/>
                            </div>
                        </div>
                        <div className={"algo-details-link"}>
                            <a className={"link2"} href="https://en.wikipedia.org/wiki/Infarction" target="_blank" >Details</a>
                        </div>
                    </div>

                    <div className={"algo-section-noInfarct"}>
                        {/*No Infarctus*/}
                        <div className={"algo-description"}>
                            <div className={"algo-description-text"}>
                                <h2 className="h2_results">No Infarct</h2>
                            <p>You can reduce your risk of getting a heart attack by keeping a healthy weight, avoiding tobacco,
                                limiting the amount of alcohol you drink, being physically active, keeping your stress level low.</p>
                            </div>
                            <div className={"algo-description-graph"}>
                                <NoInfarctAlgorithm ref={this.noInfarctAlgo}/>
                            </div>
                        </div>
                        <div className={"algo-details-link"}>
                            <a className={"link2"} href="https://en.wikipedia.org/wiki/Infarction" target="_blank" >Details</a>
                        </div>
                    </div>
                </div>
                <div>
                    <div>Try to modify some values !</div>
                    <div className="regroup_div">
                        <div className="result-question">
                            <h4 className="h4_results">Weight (kg):</h4>
                            <button className="button_change" onClick={this.decrement}>
                                &lt;
                            </button>
                            <input className="input_change" type="text" value={this.state.value} readOnly/>
                            <button className="button_change" onClick={this.increment}>
                                &gt;
                            </button>
                        </div>
                        <div className="result-question">
                            <h4 className="h4_results">Smoke</h4>
                            <input type="radio" className="radio_button" value={0} checked={this.state.smoke == 0} onChange={this.handleSmokeRadio}/>
                            <text className="text_choices"> No </text>
                            <br/>
                            <input type="radio" className="radio_button" value={1} checked={this.state.smoke == 1} onChange={this.handleSmokeRadio}/>
                            <text className="text_choices"> Yes </text>
                        </div>
                        <div className="result-question">
                            <h4 className="h4_results">Physical Activity</h4>
                            <input type="radio" className="radio_button" value={0} checked={this.state.sport == 0} onChange={this.handleSportChange}/>
                            <text className="text_choices"> I don't do any </text>
                            <br/>
                            <input type="radio" className="radio_button" value={1} checked={this.state.sport == 1} onChange={this.handleSportChange}/>
                            <text className="text_choices"> 30 minutes, 2-3 days a week </text>
                            <br/>
                            <input type="radio" className="radio_button" value={2} checked={this.state.sport == 2} onChange={this.handleSportChange}/>
                            <text className="text_choices"> 30 minutes, 5 days a week </text>
                            <br/>
                            <input type="radio" className="radio_button" value={3} checked={this.state.sport == 3} onChange={this.handleSportChange}/>
                            <text className="text_choices"> More than 2 hours per week </text>
                            <br/>
                        </div>
                        <div className="result-question">
                            <h4 className="h4_results">Healthy Food</h4>
                            <input type="radio" className="radio_button" value={0} checked={this.state.alim == 0} onChange={this.handleAlimChange}/>
                            <text className="text_choices"> Never </text>
                            <br/>
                            <input type="radio" className="radio_button" value={1} checked={this.state.alim == 1} onChange={this.handleAlimChange}/>
                            <text className="text_choices"> Times to times </text>
                            <br/>
                            <input type="radio" className="radio_button" value={2} checked={this.state.alim == 2} onChange={this.handleAlimChange}/>
                            <text className="text_choices"> Frequently </text><br/>
                            <input type="radio" className="radio_button" value={3} checked={this.state.alim == 3} onChange={this.handleAlimChange}/>
                            <text className="text_choices"> Always </text>
                        </div>
                        <div className="result-question">
                            <h4 className="h4_results">Alcohol</h4>
                            <input type="radio" className="radio_button" value={0} checked={this.state.alcohol == 0} onChange={this.handleAlcoholChange}/>
                            <text className="text_choices"> Every day </text>
                            <br/>
                            <input type="radio" className="radio_button" value={1} checked={this.state.alcohol == 1} onChange={this.handleAlcoholChange}/>
                            <text className="text_choices"> 3 to 6 days a week </text>
                            <br/>
                            <input type="radio" className="radio_button" value={2} checked={this.state.alcohol == 2} onChange={this.handleAlcoholChange}/>
                            <text className="text_choices"> 1 to 2 days a week </text>
                            <br/>
                            <input type="radio" className="radio_button" value={3} checked={this.state.alcohol == 3} onChange={this.handleAlcoholChange}/>
                            <text className="text_choices"> Less than a day a week </text>
                            <br/>
                            <input type="radio" className="radio_button" value={4} checked={this.state.alcohol == 4} onChange={this.handleAlcoholChange}/>
                            <text className="text_choices"> I never drink alcohol </text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
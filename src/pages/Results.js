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
        let refQuest = doc(db, "questionnaire", questID[questID.length-1]).withConverter(questionnaireConverter);
        let docSnapQuest = await getDoc(refQuest);
        let questOBJ = docSnapQuest.data();
        let answers = await questOBJ.getAnswers();
        console.log(answers[1].name);

        this.setState({
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
            value: answers[1].value,
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
            return {value: prevState.value < 70? prevState.value+1 : 70,
                age: prevState.value < 70? prevState.value+1 : 70}
        });
    }

    componentDidUpdate() {
        this.onClick();
    }

    decrement() {
        this.setState(prevState => {
            return {value: prevState.value > 20? prevState.value-1 : 20,
                age: prevState.value > 20? prevState.value-1 : 20}
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
                        Avatar
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
                        <p>{this.state.age}</p>
                    </div>
                    <div className={"result-avatar-description"}>
                        {/*title under avatar goes here*/}
                    </div>
                </div>

                <div className={"algo"}>
                    <div className={"algo-section"}>
                        {/*Diabetes*/}
                        <div className={"algo-description"}>
                            <div className={"algo-description-text"}>
                                <h2>Diabetes</h2>
                                <p>Diabetes is a chronic (long-lasting) health condition that affects how your body turns food into energy.
                                    Your body breaks down most of the food you eat into sugar (glucose) and releases it into your bloodstream.
                                    When your blood sugar goes up, it signals your pancreas to release insulin. Insulin acts like a key to let
                                    the blood sugar into your body’s cells for use as energy.
                                    Losing weight, eating healthy food, and being active can really help reducing your diabetes risk.</p>
                            </div>
                            <div className={"algo-description-graph"}>
                                <DiabetesAlgorithm ref={this.diabetAlgo}/>
                            </div>
                        </div>
                        <div className={"algo-details-link"}>
                            Details
                            {/*link to bottom page*/}
                        </div>
                    </div>

                    <div className={"algo-section"}>
                        {/*Cancer*/}
                        <div className={"algo-description"}>
                            <div className={"algo-description-text"}>
                                <h2>Cancer</h2>
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
                            Details
                            {/*link to bottom page*/}
                        </div>
                    </div>


                    <div className={"algo-section-infarct"}>
                        {/*Infarct*/}
                        <div className={"algo-description"}>
                            <div className={"algo-description-text"}>
                                <h2>Infarct</h2>
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
                            Details
                            {/*link to bottom page*/}
                        </div>
                    </div>

                    <div className={"algo-section-noInfarct"}>
                        {/*No Infarctus*/}
                        <div className={"algo-description"}>
                            <div className={"algo-description-text"}>
                                <h2>No Infarct</h2>
                            <p>You can reduce your risk of getting a heart attack by keeping a healthy weight, avoiding tobacco,
                                limiting the amount of alcohol you drink, being physically active, keeping your stress level low.</p>
                            </div>
                            <div className={"algo-description-graph"}>
                                <NoInfarctAlgorithm ref={this.noInfarctAlgo}/>
                            </div>
                        </div>
                        <div className={"algo-details-link"}>
                            Details
                            {/*link to bottom page*/}
                        </div>
                    </div>
                </div>
                <div className={"bottom-section"}>
                    <div className="result-title">Parameters that can be modified :</div>
                    <div className="result-question">Weight value in kg:
                        <div className="quantity-input">
                            <button className="quantity-input__modifier quantity-input__modifier--left" onClick={this.decrement}>
                                &mdash;
                            </button>
                            <input className="quantity-input__screen" type="text" value={this.state.value} readOnly/>
                            <button className="quantity-input__modifier quantity-input__modifier--right" onClick={this.increment}>
                                &#xff0b;
                            </button>
                        </div>
                    </div>
                    <div className="result-question">Do you smoke ?
                        <input type="radio" id="smokeNo" value={0} checked={this.state.smoke == 0} onChange={this.handleSmokeRadio}/>
                        <label htmlFor="smokeNo">No</label>
                        <input type="radio" id="smokeYes" value={1} checked={this.state.smoke == 1} onChange={this.handleSmokeRadio}/>
                        <label htmlFor="smokeYes">Yes</label>
                    </div>
                    <div className="result-question">Physical Activity
                        <input type="radio" id="physical1" value={0} checked={this.state.sport == 0} onChange={this.handleSportChange}/>
                        <label htmlFor="physical1">I don't do any</label>
                        <input type="radio" id="physical2" value={1} checked={this.state.sport == 1} onChange={this.handleSportChange}/>
                        <label htmlFor="physical2">30 minutes, 2-3 days a week</label>
                        <input type="radio" id="physical3" value={2} checked={this.state.sport == 2} onChange={this.handleSportChange}/>
                        <label htmlFor="physical3">30 minutes, 5 days a week</label>
                        <input type="radio" id="physical4" value={3} checked={this.state.sport == 3} onChange={this.handleSportChange}/>
                        <label htmlFor="physical4">More than 2 hours per week</label>
                    </div>
                    <div className="result-question">Healthy Food
                        <input type="radio" id="healthy1" value={0} checked={this.state.alim == 0} onChange={this.handleAlimChange}/>
                        <label htmlFor="healthy1">Never</label>
                        <input type="radio" id="healthy2" value={1} checked={this.state.alim == 1} onChange={this.handleAlimChange}/>
                        <label htmlFor="healthy2">Times to times</label>
                        <input type="radio" id="healthy3" value={2} checked={this.state.alim == 2} onChange={this.handleAlimChange}/>
                        <label htmlFor="healthy3">Frequently</label>
                        <input type="radio" id="healthy4" value={3} checked={this.state.alim == 3} onChange={this.handleAlimChange}/>
                        <label htmlFor="healthy4">Always</label>
                    </div>
                    <div className="result-question">Alcohol
                        <input type="radio" id="alcohol1" value={0} checked={this.state.alcohol == 0} onChange={this.handleAlcoholChange}/>
                        <label htmlFor="alcohol1">Every day</label>
                        <input type="radio" id="alcohol2" value={1} checked={this.state.alcohol == 1} onChange={this.handleAlcoholChange}/>
                        <label htmlFor="alcohol2">3 to 6 days a week</label>
                        <input type="radio" id="alcohol3" value={2} checked={this.state.alcohol == 2} onChange={this.handleAlcoholChange}/>
                        <label htmlFor="alcohol3">1 to 2 days a week</label>
                        <input type="radio" id="alcohol4" value={3} checked={this.state.alcohol == 3} onChange={this.handleAlcoholChange}/>
                        <label htmlFor="alcohol4">less than a day a week</label>
                        <input type="radio" id="alcohol5" value={4} checked={this.state.alcohol == 4} onChange={this.handleAlcoholChange}/>
                        <label htmlFor="alcohol5">I never drink alcohol</label>
                    </div>
                </div>
            </div>
        </div>
    )
}
}
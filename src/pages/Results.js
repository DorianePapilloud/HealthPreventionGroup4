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

export default class Results extends React.Component {
    constructor(props){
        super(props);

        this.diabetAlgo = React.createRef();
        this.noInfarctAlgo = React.createRef();
        this.cancerAlgo = React.createRef();
        this.infarctAlgo = React.createRef();

        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);

        this.state = {
            uid: this.props.cuid,
            questionnaire: [],
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
            chol2 : 0,
            eGRF : 120,
            hsCRP : 0.1,

            // noInfarct
            afinf: 0,

            // cancer
            afcancer : 1,
            alcohol: 1,

            // display
            value: 1
        }
    }

    async componentDidMount() {
        console.log(this.state.uid);
        // get the responses inside the database
        let ref = doc(db, "users", this.state.uid).withConverter(userConverter);
        let docSnap = await getDoc(ref);

        if (!docSnap.exists()) {
            ref = doc(db, "users", "Guest").withConverter(userConverter);
            docSnap = await getDoc(ref);
        }

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
            hypertension: answers[4].value,
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
            chol2 : this.state.chol1,
            eGRF : this.state.eGRF,
            hsCRP : this.state.hsCRP
        });

        // noInfarct
        this.noInfarctAlgo.current.setState({
            age: this.state.age,
            gender: this.state.gender,
            smoke: this.state.smoke,
            bloodPressure: this.state.bloodPressure,
            chol: this.state.chol1,
            hdl: this.state.hdl,
            afinf: this.state.afinf,
        });
        this.noInfarctAlgo.current.finalResult();

        // cancer
        this.cancerAlgo.current.setState({
            afcancer : this.state.afcancer,
            smoke: this.state.smoke,
            height: this.state.height,
            weight: this.state.weight,
            sport: this.state.sport,
            alcohol: this.state.alcohol,
            alim: this.state.alim,
        });
        this.cancerAlgo.current.getCancerRisk();
    }

    increment() {
        this.setState(prevState => {
            return {value: prevState.value + 1}
        })
    }

    decrement() {
        this.setState(prevState => {
            return {value: prevState.value > 0? --prevState.value : 0}
        })
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
                                <p>Lunettes teintées Phares xénon, vitres teintées (Bando bando) J'partais au charbon Pied d'biche, portes blindées J'ai encore la dalle, j'suis pas gavé
                                    Charbonne toujours les mains gantées Charbonne toujours les mains gantées J'volais le goûter des enfants gâtés Elle prend par l'cul Elle veut pas s'faire éclater le clito
                                    (Bando na bando)</p>
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
                        {/*Infarct*/}
                        <div className={"algo-description"}>
                            <div className={"algo-description-text"}>
                                <h2>Infarct</h2>
                                <p>Lunettes teintées Phares xénon, vitres teintées (Bando bando) J'partais au charbon Pied d'biche, portes blindées J'ai encore la dalle, j'suis pas gavé
                                    Charbonne toujours les mains gantées Charbonne toujours les mains gantées J'volais le goûter des enfants gâtés Elle prend par l'cul Elle veut pas s'faire éclater le clito
                                    (Bando na bando)</p>
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

                    <div className={"algo-section"}>
                        {/*Cancer*/}
                        <div className={"algo-description"}>
                            <div className={"algo-description-text"}>
                                <h2>Cancer</h2>
                                <p>Lunettes teintées Phares xénon, vitres teintées (Bando bando) J'partais au charbon Pied d'biche, portes blindées J'ai encore la dalle, j'suis pas gavé
                                    Charbonne toujours les mains gantées Charbonne toujours les mains gantées J'volais le goûter des enfants gâtés Elle prend par l'cul Elle veut pas s'faire éclater le clito
                                    (Bando na bando)</p>
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

                    <div className={"algo-section"}>
                        {/*No Infarctus*/}
                        <div className={"algo-description"}>
                            <div className={"algo-description-text"}>
                                <h2>No Infarct</h2>
                                <p>Lunettes teintées Phares xénon, vitres teintées (Bando bando) J'partais au charbon Pied d'biche, portes blindées J'ai encore la dalle, j'suis pas gavé
                                    Charbonne toujours les mains gantées Charbonne toujours les mains gantées J'volais le goûter des enfants gâtés Elle prend par l'cul Elle veut pas s'faire éclater le clito
                                    (Bando na bando)</p>
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
                    <div className="result-question">Weight value in kg:</div>
                    <div className="result-question">Do you smoke ? </div>
                    <div className="result-question">Physical Activity</div>
                    <div className="result-question">Healthy Food</div>
                    <div className="result-question">Alcohol</div>
                </div>
            </div>

            {/*<div className="quantity-input">*/}
            {/*    <button className="quantity-input__modifier quantity-input__modifier--left" onClick={this.decrement}>*/}
            {/*        &mdash;*/}
            {/*    </button>*/}
            {/*    <input className="quantity-input__screen" type="text" value={this.state.value} readOnly/>*/}
            {/*    <button className="quantity-input__modifier quantity-input__modifier--right" onClick={this.increment}>*/}
            {/*        &#xff0b;*/}
            {/*    </button>*/}
            {/*</div>*/}
            <button onClick={this.onClick}>refresh</button>
        </div>
    )
}
}
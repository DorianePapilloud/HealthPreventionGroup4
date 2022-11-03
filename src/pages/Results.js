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

export default class Results extends React.Component {

    constructor(props){
        super(props);
        this.diabetAlgo = React.createRef();
        this.noInfarctAlgo = React.createRef();
        this.cancerAlgo = React.createRef();
        this.infarctAlgo = React.createRef();
        this.state = {
            // diabetes
            gender: 1,
            age: 35,
            height: 180,
            weight: 100,
            hypertension: 0,
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
            chol2 : 1,
            eGRF : 1,
            hsCRP : 1,

            // noInfarct
            chol: 1,
            afinf: 0,

            // cancer
            afcancer : 1,
            alcohol: 1,
            alcScore: 1,
            sportScore: 1,
            alimScore: 1
        }
    }

    componentDidMount() {
        this.onClick();
    }

    onClick = () => {
        // diabetes
        this.diabetAlgo.current.setState({
            gender: this.state.gender,
            age: this.state.age,
            height: this.state.height,
            weight: this.state.weight,
            hypertension: this.state.hypertension,
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
            hdl: this.state.hdl,
            chol2 : this.state.chol2,
            eGRF : this.state.eGRF,
            hsCRP : this.state.hsCRP
        });

        // noInfarct
        this.noInfarctAlgo.current.setState({
            age: this.state.age,
            gender: this.state.gender,
            smoke: this.state.smoke,
            bloodPressure: this.state.bloodPressure,
            chol: this.state.chol,
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
            alcScore: this.state.alcScore,
            sportScore: this.state.sportScore,
            alimScore: this.state.alimScore
        });
        this.cancerAlgo.current.getCancerRisk();
    }


render()
{
    return (
        <div>
            <h2>Parameters that can be modified :</h2>
            <div>Weight value in kg: <Slider normalValue={80} initialState={50} title={"weight"}></Slider></div>
            <p>Do you smoke ? </p>
            <p>Physical Activity</p>
            <p>Healthy Food</p>
            <p>Alcohol</p>

            <DiabetesAlgorithm ref={this.diabetAlgo}/>
            <br/>
            -----------------------------------------------------------------------
            <br/>
            <InfarctAlgorithm ref={this.infarctAlgo}/>
            <br/>
            -----------------------------------------------------------------------
            <br/>
            <NoInfarctAlgorithm ref={this.noInfarctAlgo}/>
            <br/>
            -----------------------------------------------------------------------
            <br/>
            <CancerAlgorithm ref={this.cancerAlgo}/>
            <button onClick={this.onClick}>refresh</button>
        </div>
    )
}
}
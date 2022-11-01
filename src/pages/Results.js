import {useNavigate} from "react-router-dom";
import React from "react";
import {useEffect, useState} from "react";
import ReactSlider from "react-slider";
import Slider from '../components/Slider';
import '../css/Results.scss';
import {CancerAlgorithm} from "../algorithms/CancerAlgorithm";
import {DiabetesAlgorithm} from "../algorithms/DiabetesAlgorithm";
import {render} from "@testing-library/react";

export default class Results extends React.Component {

    constructor(props){
        super(props);
        this.diabetAlgo = React.createRef();
        this.state = {
            age : 8
        }
    }

    onClick = () => {
        console.log(this.state.age);
        this.diabetAlgo.current.setState({
            age: this.state.age
        });
        this.diabetAlgo.current.calculateDiabetesRisk();
    }


render()
{
    return (
        <div>
            <DiabetesAlgorithm ref={this.diabetAlgo}/>
            <button onClick={this.onClick}>refresh</button>
            <h2>Parameters that can be modified :</h2>
            <div>Weight value in kg: <Slider normalValue={80} initialState={50} title={"weight"}></Slider></div>
            <p>Do you smoke ? </p>
            <p>Physical Activity</p>
            <p>Healthy Food</p>
            <p>Alcohol</p>
        </div>
    )
}
}
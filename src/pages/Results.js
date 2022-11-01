import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactSlider from "react-slider";
import Slider from '../components/Slider';
import '../css/Results.scss';
import {CancerAlgorithm} from "../algorithms/CancerAlgorithm";
import {DiabetesAlgorithm} from "../algorithms/DiabetesAlgorithm";

export default function Register({ currentUser }) {
    const navigate = useNavigate();
    const [currentSmoke, setCurrentSmoke] = useState("yes");

    function smoke(event) {
        setCurrentSmoke(event.target.value);
        console.log(currentSmoke);
    }


    useEffect(() => {
        // set the currentUser values
    }, [currentUser]);


    return (
        <div>
            <DiabetesAlgorithm gender={0}/>
            <h2>Parameters that can be modified :</h2>
            <div>Weight value in kg: <Slider normalValue={80} initialState={50} title={"weight"}></Slider></div>
            <p>Do you smoke ? </p>
            <div onChange={smoke}>
                <input type="radio" value="no" name="smoke" /> Yes
                <input type="radio" value="yes" name="smoke" /> No
            </div>
            <p>Physical Activity</p>
            <p>Healthy Food</p>
            <p>Alcohol</p>
        </div>
    );
}
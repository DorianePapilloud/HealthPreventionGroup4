import React from "react";
import "../css/CircularProgressBar.scss"
import {CircularProgressBar} from "../components/CircularProgressBar";

export class CancerAlgorithm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            afcancer : props.afcancer,
            smoke: props.smoke,
            height: props.height,
            weight: props.weight,
            sport: props.sport,
            alcohol: props.alcohol,
            alim: props.alim,
        }
    }

    getAfCancerPercent() {
        if(this.state.afcancer === 1)
        {
            return 25
        }
        return 0
    }

    getSmokePercent() {
        if(this.state.smoke === 1)
        {
            return 25;
        }else{
            return 0;
        }
    }

    getBMIPercent() {
        let bmi = Math.round(this.state.weight / Math.pow(this.state.height/100, 2));
        let percent = ((((bmi-25)/10)*0.5)/4)*100;
        return percent;
    }

    getSportPercent() {
        let score = -1;
        if (this.state.sport == 0) {
            score = 3 ;
        }else if (this.state.sport == 1) {
            score = 2 ;
        }else if (this.state.sport == 2) {
            score = 1 ;
        }else if (this.state.sport == 3) {
            score = 0 ;
        }
        let percent = (((score/3)*0.5)/4)*100;
        return percent;
    }


    getAlcoholPercent() {
        let score = -1;
        if (this.state.alcohol == 0) {
            score = 4 ;
        }else if (this.state.alcohol == 1) {
            score = 3 ;
        }else if (this.state.alcohol == 2) {
            score = 2 ;
        }else if (this.state.alcohol == 3) {
            score = 1 ;
        }else if (this.state.alcohol == 4) {
            score = 0 ;
        }
        let percent = (((score/4)*0.5)/4)*100;
        return percent;
    }



    getAlimPercent() {
        let score = -1;
        if (this.state.alim == 1) {
            score = 2 ;
        }else if (this.state.alim == 0) {
            score = 3 ;
        }else if (this.state.alim == 2) {
            score = 1 ;
        }else if (this.state.alim == 3) {
            score = 0 ;
        }
        let percent = (((score/3)*0.5)/4)*100;
        return percent;
    }



    getCancerRisk() {
        let risk = Math.round(this.getAfCancerPercent() + this.getSmokePercent() + this.getBMIPercent() +
            this.getSportPercent() + this.getAlcoholPercent() + this.getAlimPercent() + 9);
        if(Math.round(risk) > 100){
            return 100;
        }else{
            return Math.round(risk);
        }
    }

    //test
    render() {
        return (
            <div>
                <CircularProgressBar
                    strokeWidth="5"
                    sqSize="100"
                    percentage={this.getCancerRisk()}/>
            </div>
        )
    }
}

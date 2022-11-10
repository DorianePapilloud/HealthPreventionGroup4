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

    getAlcoholScore() {
        switch(this.state.alcohol){
            case(0): return 4;
                break;
            case(1): return 3;
                break;
            case(2): return 2;
                break;
            case(3): return 1;
                break;
            case(4): return 0;
                break;
        }
    }

    getSportScore() {
        switch(this.state.sport){
            case(0): return 3;
                break;
            case(1): return 2;
                break;
            case(2): return 1;
                break;
            case(3): return 0;
                break;
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
            return 25
        }
        return 0
    }



    getBMIPercent() {
        let bmi = Math.round(this.state.weight / Math.pow(this.state.height/100, 2));
        let percent = ((((bmi-25)/10)*0.5)/4)*100;
        return percent;
    }



    getSportPercent() {
        let score = this.getSportScore();
        let percent = (((score/3)*0.5)/4)*100;
        return percent;
    }


    getAlcoholPercent() {
        let score = this.getAlcoholScore();
        let percent = (((score/4)*0.5)/4)*100;
        return percent;
    }



    getAlimPercent() {
        let score = -1;
        console.log("Alim state : " + this.state.alim);
        if (this.state.alim == 1) {
            score = 2 ;
        }else if (this.state.alim == 0) {
            score = 3 ;
        }else if (this.state.alim == 2) {
            score = 1 ;
        }else if (this.state.alim == 3) {
            score = 0 ;
        }else {
            console.log("error at getAlimPercent")
        }
        let percent = (((score/3)*0.5)/4)*100;
        return percent;
    }



    getCancerRisk() {
        let risk = Math.round(this.getAfCancerPercent() + this.getSmokePercent() + this.getBMIPercent() +
            this.getSportPercent() + this.getAlcoholPercent() + this.getAlimPercent() + 9);
        return Math.round(risk);
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

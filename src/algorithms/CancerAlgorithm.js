import React from "react";

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
            alcScore: props.alcScore,
            sportScore: props.sportScore,
            alimScore: props.alimScore
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

    getAlimScore() {
        switch(this.state.alim){
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
        let score = this.getAlimScore();
        let percent = (((score/3)*0.5)/4)*100;
        return percent;
    }



    getCancerRisk() {
        let risk = Math.round(this.getAfCancerPercent() + this.getSmokePercent() + this.getBMIPercent() +
            this.getSportPercent() + this.getAlcoholPercent() + this.getAlimPercent() + 9);
        return risk;
    }

    //test
    render() {
        return (
            <div>
                <p>AfCancer: {this.getAfCancerPercent()}%</p>
                <p>Smoke: {this.getSmokePercent()}%</p>
                <p>BMI: {this.getBMIPercent()}%</p>
                <p>Sport: {this.getSportPercent()}%</p>
                <p>Alcohol: {this.getAlcoholPercent()}%</p>
                <p>Alim: {this.getAlimPercent()}%</p>
                <p><strong>Risk: {this.getCancerRisk()}%</strong></p>
            </div>
        )
    }
}

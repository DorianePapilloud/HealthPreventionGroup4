import React from "react";

export class CancerAlgorithm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            afcancer : 0,
            smoke: 0,
            height: 170,
            weight: 64,
            sport: 1,
            alcohol: 3,
            alim: 2,
            alcScore: 0,
            sportScore: 0,
            alimScore: 0
        }
    }

    getAlcoholScore() {
        switch(this.state.alcohol){
            case(0): this.setState({ alcScore : 4 });
                break;
            case(1): this.setState({ alcScore : 3 });
                break;
            case(2): this.setState({ alcScore : 2 });
                break;
            case(3): this.setState({ alcScore : 1 });
                break;
            case(4): this.setState({ alcScore : 0 });
                break;
        }
    }

    getAlimScore() {
        switch(this.state.alim){
            case(0): this.setState({ alimScore : 3 });
                break;
            case(1): this.setState({ alimScore : 2 });
                break;
            case(2): this.setState({ alimScore : 1 });
                break;
            case(3): this.setState({ alimScore : 0 });
                break;
        }
    }

    getSportScore() {
        switch(this.state.sport){
            case(0): this.setState({ sportScore : 3 });
                break;
            case(1): this.setState({ sportScore : 2 });
                break;
            case(2): this.setState({ sportScore : 1 });
                break;
            case(3): this.setState({ sportScore : 0 });
                break;
        }
    }

    calculateScores() {
        this.getAlimScore();
        this.getAlcoholScore();
        this.getSportScore();
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
        this.getSportScore();
        let score = this.state.sportScore;
        let percent = (((score/3)*0.5)/4)*100;
        return percent;
    }



    getAlcoholPercent() {
        this.getAlcoholScore();
        let score = this.state.alcScore;
        let percent = (((score/4)*0.5)/4)*100;
        return percent;
    }



    getAlimPercent() {
        this.getAlimScore();
        let score = this.state.alimScore;
        let percent = (((score/3)*0.5)/4)*100;
        return percent;
    }



    getCancerRisk() {
        let risk = Math.round(this.getAfCancerPercent() + this.getSmokePercent() + this.getBMIPercent() +
            this.getSportPercent() + this.getAlcoholPercent() + this.getAlimPercent() + 9);
        return risk;
    }

    render() {
        return (
            <div>
                <p>AfCancer: {this.getAfCancerPercent()}%</p>
                <p>Smoke: {this.getSmokePercent()}%</p>
                <p>BMI: {this.getBMIPercent()}%</p>
                <p>Sport: {this.getSportPercent()}%</p>
                <p>Alcohol: {this.getAlcoholPercent()}%</p>
                <p>Alim: {this.getAlimPercent()}%</p>
                <p>Risk: {this.getCancerRisk()}%</p>
            </div>
        )
    }
}

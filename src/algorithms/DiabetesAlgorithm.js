
import React from "react";

export class DiabetesAlgorithm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gender: props.gender,
            age: props.age,
            height: props.height,
            weight: props.weight,
            hypertension: props.hypertension,
            highBloodGlucose: props.highBloodGlucose,
            sport: props.sport,
            alim: props.alim,
        }
    }

    riskMan = [0, 0, 0, 0, 0, 0, 1, 2, 4, 7, 11, 15, 21, 28, 36, 46, 58, 71, 86, 100, 100, 100, 100];
    riskWoman = [0, 1, 1, 1, 1, 1, 1, 2, 3, 5, 7, 11, 15, 21, 28, 36, 46, 58, 71, 86, 100, 100, 100];

    getPointsForAge() {
        if (this.state.age < 45) {
            return 1;
        } else if (this.state.age >= 45 && this.state.age <= 54) {
            return 2;
        } else {
            return 3;
        }
    }

    getPointsForBMI() {
        let bmi;
        bmi = Math.round(this.state.weight / Math.pow(this.state.height / 100, 2));

        if (bmi < 27 && bmi >= 20) {
            return 1;
        } else if (bmi >= 27 && bmi <= 30) {
            return 2;
        } else {
            return 3;
        }
    }

    getPointsForHypertension() {
        if (this.state.hypertension === 1) {
            return 2;
        } else {
            return 0;
        }
    }

    getPointsForHighBloodGlucose() {
        if (this.state.highBloodGlucose === 1) {
            return 5;
        } else {
            return 0;
        }
    }

    getPointsForSport() {
        if (this.state.sport === 0) {
            return 4;
        } else if (this.state.sport === 1) {
            return 3;
        } else if (this.state.sport === 2) {
            return 2;
        } else if (this.state.sport === 3) {
            return 1;
        }
    }

    getPointsForAlim() {
        if (this.state.alim === 0) {
            return 4;
        } else if (this.state.alim === 1) {
            return 3;
        } else if (this.state.alim === 2) {
            return 2;
        } else if (this.state.alim === 3) {
            return 1;
        }
    }

    calculateDiabetesRisk() {
        let points;
        points = this.getPointsForAge() + this.getPointsForBMI() + 3
            + this.getPointsForHypertension() + this.getPointsForHighBloodGlucose()
            + this.getPointsForSport() + this.getPointsForAlim();

        if (this.state.gender === 1) {
            return this.riskMan[points];
        } else {
            return this.riskWoman[points];
        }
    }

    render() {

        //test
        return (
            <div>
                <p>Age: {this.getPointsForAge()}</p>
                <p>BMI: {this.getPointsForBMI()}</p>
                <p>Hypertension: {this.getPointsForHypertension()}</p>
                <p>HighBloodGlucose: {this.getPointsForHighBloodGlucose()}</p>
                <p>Sport: {this.getPointsForSport()}</p>
                <p>Alim: {this.getPointsForAlim()}</p>
                <p>Total: {this.calculateDiabetesRisk()}%</p>
            </div>
        )
    }
}






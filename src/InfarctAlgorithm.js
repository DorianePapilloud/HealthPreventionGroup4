
import React from "react";

export class InfarctAlgorithm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: 45,
            gender: 0,
            smoke: 1,
            hypertension: 100,
            diabetes: 1,
            infarct: 1,
            chol1: 3.2,
            hdl: 1.5,

            chol2 : 0,
            eGRF : 120,
            hsCRP : 0.1,
        }
    }

    coeff = [0.0116, 0.2148, 0.1754, 0.0037, 0.2465, 0.3399, 0.4159, -0.2989, -0.0308, -0.0177, 0.0854 ]

    getValueForAge() {
        let valueAge = this.state.age * this.coeff[0];
        return valueAge
    }

    getValueForGender() {
        let valueGender;
        if (this.state.gender === 1) {
            valueGender = this.state.gender * this.coeff[1];
        } else {
            valueGender = 0;
        }
        return valueGender;
    }

    getValueForSmoke() {
        let valueSmoke;
        if (this.state.smoke === 1) {
            valueSmoke = this.state.smoke * this.coeff[2];
        } else {
            valueSmoke = 0;
        }
        return valueSmoke;
    }

    getValueForHypertension() {
        let valueHypertension = this.state.hypertension * this.coeff[3];
        return valueHypertension;
    }

    getValueForDiabetes() {
        let valueDiabetes;
        if (this.state.diabetes === 1) {
            valueDiabetes = this.state.diabetes * this.coeff[4];
        } else {
            valueDiabetes = 0;
        }
        return valueDiabetes;
    }

    getValueForInfarct() {
        let valueInfarct;
        if (this.state.infarct === 1) {
            valueInfarct = this.state.infarct * this.coeff[5];
        } else {
            valueInfarct = 0;
        }
        return valueInfarct;
    }

    getValueForCHOL1() {
        let valueCHOL1 = this.state.chol1 * this.coeff[6];
        return valueCHOL1;
    }

    getValueForHDL() {
        let valueHDL = this.state.hdl * this.coeff[7];
        return valueHDL;
    }

    getValueForCHOL2() {
        let valueCHOL2 = this.state.chol2 * -this.coeff[8];
        return valueCHOL2;
    }

    getValueForEGRF() {
        let valueTotalEGRF = this.state.eGRF * this.coeff[9];
        return valueTotalEGRF;
    }

    getValueForHsCRP() {
        let valueTotalHSCRP = 10 * (-1 * ((this.state.hsCRP) * this.coeff[10]));
        return valueTotalHSCRP;

    }

    calculateTotal() {
        let total;
        total = this.getValueForAge() + this.getValueForGender() + this.getValueForSmoke()
            + this.getValueForHypertension() + this.getValueForDiabetes() + this.getValueForInfarct()
            + this.getValueForCHOL1() + this.getValueForHDL() + this.getValueForCHOL2()
            + this.getValueForEGRF() + this.getValueForHsCRP();

        return total;
    }

    calculateInfarctRisk() {

        let percentage;
        percentage = ((1-Math.pow(0.61785,Math.exp(this.calculateTotal()-2.0869)))*1000)/10;

        return percentage;
    }

    render() {

        return (
            <div>
                <p>Age: {this.getValueForAge()}</p>
                <p>Gender: {this.getValueForGender()}</p>
                <p>Smoke: {this.getValueForSmoke()}</p>
                <p>Hypertension: {this.getValueForHypertension()}</p>
                <p>Diabetes: {this.getValueForDiabetes()}</p>
                <p>Infarct: {this.getValueForInfarct()}</p>
                <p>total CHOL mmol/1: {this.getValueForCHOL1()} </p>
                <p>total HDL: {this.getValueForHDL()}</p>
                <p>total CHOL mmol/2: {this.getValueForCHOL2()}</p>
                <p>eGRF ml/min: {this.getValueForEGRF()} </p>
                <p>hs CRP mg/l: {this.getValueForHsCRP()} </p>
                <p>Total: {this.calculateTotal()}</p>
                <p>Risk: {this.calculateInfarctRisk()}%</p>
            </div>
        )
    }
}
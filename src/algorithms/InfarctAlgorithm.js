
import React from "react";
import {CircularProgressBar} from "../components/CircularProgressBar";

export class InfarctAlgorithm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: props.age,
            gender: props.gender,
            smoke: props.smoke,
            bloodPressure: props.bloodPressure,
            diabetes: props.diabetes,
            infarct: props.infarct,
            chol1: props.chol1,
            hdl: props.hdl,
            chol2 : 0,
            eGRF : 120,
            hsCRP : 0.1
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

    getValueForBloodPressure() {
        let valueBloodPressure = 0;
        if(this.state.bloodPressure == 0){
            valueBloodPressure = 80;
        }else {
            valueBloodPressure = 200;
        }
        return valueBloodPressure*this.coeff[3];
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
        let valueHDL = 0;
        if(this.state.hdl == 0){
            valueHDL = 0.6;
        }else {
            valueHDL = 2.5;
        }
        return valueHDL*this.coeff[7];
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
            + this.getValueForBloodPressure() + this.getValueForDiabetes() + this.getValueForInfarct()
            + this.getValueForCHOL1() + this.getValueForHDL() + this.getValueForCHOL2()
            + this.getValueForEGRF() + this.getValueForHsCRP();

        return total;
    }

    calculateInfarctRisk() {
        let percentage;
        percentage = ((1-Math.pow(0.61785,Math.exp(this.calculateTotal()-2.0869)))*1000)/10;

        return Math.round(percentage);
    }

    render() {
        //test
        return (
            <div>
                <div>
                    <CircularProgressBar
                        strokeWidth="5"
                        sqSize="100"
                        percentage={this.calculateInfarctRisk()}/>
                </div>
            </div>
        )
    }
}
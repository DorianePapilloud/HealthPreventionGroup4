
import React from "react";
import {CircularProgressBar} from "../components/CircularProgressBar";

export class NoInfarctAlgorithm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            age: props.age,
            gender: props.gender,
            smoke: props.smoke,
            bloodPressure: props.bloodPressure,
            chol: props.chol,
            hdl: props.hdl,
            afinf: props.afinf,
        }
    }

    coeffMan = [0.3742, 0.6012, 0.2777, 0.1458, -0.2698, -0.0755, -0.0255, -0.0281, 0.0426];
    coeffWoman = [0.4648, 0.7744, 0.3131, 0.1002, -0.2606, -0.1088, -0.0277, -0.0226, 0.0613];

    getValueForAge() {
        let valueAge = (this.state.age - 60) / 5;
        return valueAge;
    }

    getValueForBloodPressure() {
        let valueBloodPressure = 0;
        if(this.state.bloodPressure == 0){
            valueBloodPressure = (80 - 120) / 20;
        }else {
            valueBloodPressure = (200 - 120) / 20;
        }
        return valueBloodPressure;
    }

    getValueForCHOL() {
        let valueCHOL = 0;
        if(this.state.chol == 0){
            valueCHOL = (2.5 - 6) / 1;
        }else {
            valueCHOL = (8 - 6) / 1;
        }
        return valueCHOL;
    }

    getValueForHDL() {
        let valueHDL = 0;
        if(this.state.hdl == 0){
            valueHDL = (0.6 - 1.3) / 0.5;
        }else {
            valueHDL = (2.5 - 1.3) / 0.5;
        }
        return valueHDL;
    }

    getValueAgeSmoke() {
        let valueAgeSmoke = this.getValueForAge() * this.state.smoke;
        return valueAgeSmoke;
   }

    getValueAgeBloodPressure() {
        let valueAgeBloodPressure = (this.getValueForAge() * this.getValueForBloodPressure())
        return valueAgeBloodPressure;
    }

    getValueAgeCHOL() {
        let valueAgeCHOL = (this.getValueForAge() * (this.getValueForCHOL()))
        return valueAgeCHOL;
    }

    getValueAgeHDL() {
        let valueAgeHDL = (this.getValueForAge() * (this.getValueForHDL()))
        return valueAgeHDL;
    }

    resultAge() {
        let resultAge;
        if (this.state.gender === 1) {
            resultAge = this.getValueForAge() * this.coeffMan[0];
        } else {
            resultAge = this.getValueForAge() * this.coeffWoman[0];
        }
        return resultAge;
    }

    resultSmoke() {
        let resultSmoke;
        if (this.state.gender === 1) {
            resultSmoke = this.state.smoke * this.coeffMan[1];
        } else {
            resultSmoke = this.state.smoke * this.coeffWoman[1];
        }
        return resultSmoke;
    }

    resultBloodPressure() {
        let resultBloodPressure;
        if (this.state.gender === 1) {
            resultBloodPressure = this.getValueForBloodPressure() * this.coeffMan[2];
        } else {
            resultBloodPressure = this.getValueForBloodPressure() * this.coeffWoman[2];
        }
        return resultBloodPressure;
    }

    resultCHOL() {
        let resultCHOL;
        if (this.state.gender === 1) {
            resultCHOL = this.getValueForCHOL() * this.coeffMan[3];
        } else {
            resultCHOL = this.getValueForCHOL() * this.coeffWoman[3];
        }
        return resultCHOL;
    }

    resultHDL() {
        let resultHDL;
        if (this.state.gender === 1) {
            resultHDL = this.getValueForHDL() * this.coeffMan[4];
        } else {
            resultHDL = this.getValueForHDL() * this.coeffWoman[4];
        }
        return resultHDL;
    }

    resultAgeSmoke() {
        let resultAgeSmoke;
        if (this.state.gender === 1) {
            resultAgeSmoke = this.getValueAgeSmoke() * this.coeffMan[5];
        } else {
            resultAgeSmoke = this.getValueAgeSmoke() * this.coeffWoman[5];
        }
        return resultAgeSmoke;
    }

    resultAgeBloodPressure() {
        let resultAgeBloodPressure;
        if (this.state.gender === 1) {
            resultAgeBloodPressure = this.getValueAgeBloodPressure() * this.coeffMan[6];
        } else {
            resultAgeBloodPressure = this.getValueAgeBloodPressure() * this.coeffWoman[6];
        }
        return resultAgeBloodPressure;
    }

    resultAgeCHOL() {
        let resultAgeCHOL;
        if (this.state.gender === 1) {
            resultAgeCHOL = this.getValueAgeCHOL() * this.coeffMan[7];
        } else {
            resultAgeCHOL = this.getValueAgeCHOL() * this.coeffWoman[7];
        }
        return resultAgeCHOL;
    }

    resultAgeHDL() {
        let resultAgeHDL;
        if (this.state.gender === 1) {
            resultAgeHDL = this.getValueAgeHDL() * this.coeffMan[8];
        } else {
            resultAgeHDL = this.getValueAgeHDL() * this.coeffWoman[8];
        }
        return resultAgeHDL;
    }

    sum() {
        let sum;
        sum = this.resultAge() + this.resultSmoke() + this.resultBloodPressure()+ this.resultCHOL() + this.resultHDL() +
            +this.resultAgeSmoke() + this.resultAgeBloodPressure() + this.resultAgeCHOL()
            + this.resultAgeHDL();
        return sum;
    }


    finalRisk() {
        let formule;
        let finalRisk;
        if (this.state.gender === 1) {
            formule =  (1-Math.pow((0.9605), Math.exp(this.sum())));
            finalRisk = 1 - Math.exp(-Math.exp(-0.5699 + 0.7476 * Math.log(-Math.log(1 - formule))));
        } else {
            formule =  (1 - Math.pow((0.9776), Math.exp(this.sum())));
            formule*=100;
            finalRisk = 1 - Math.exp(-Math.exp(-0.738 + 0.7019 * Math.log(-Math.log(1 - formule))));
        }
        return finalRisk;
    }

    correctionAFINF() {
        let resultAfinf;
        if (this.state.afinf < 1) {
           resultAfinf = 1
        } else {
            resultAfinf = 1.3
        }
        return resultAfinf;
    }

    finalResult() {
        let finalResult = this.finalRisk() * this.correctionAFINF()
        return Math.round(finalResult);
    }

    render() {

        //test
        return (
            <div>
                <CircularProgressBar
                    strokeWidth="5"
                    sqSize="100"
                    percentage={this.finalResult()}/>
            </div>
        )
    }
}


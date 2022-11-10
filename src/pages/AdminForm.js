import {useEffect, useState} from "react";
import { doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../initFirebase";
import "../css/Admin.scss";


function AdminForm() {

    const[normalValuesDiabetes, setNormalValuesDiabetes] = useState({})
    const[normalValuesInfarct, setNormalValuesInfarct] = useState({})
    const[normalValuesNoInfarct, setNormalValuesNoInfarct] = useState({})

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        e.target.setAttribute("value", e.target.value)

        setNormalValuesDiabetes({[name]: value});
        setNormalValuesInfarct({[name]: value});
        setNormalValuesNoInfarct({[name]: value});
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        //diabetes
        await updateDoc(doc(db, "normalValues","Diabetes"), {
            ageMan: e.target[0].value,
            ageWoman: e.target[1].value,
            bmiMan: e.target[2].value,
            bmiWoman: e.target[3].value,
            additionalWaistMan: e.target[4].value,
            additionalWaistWoman: e.target[5].value,
            highBloodPressureMan: e.target[6].value,
            highBloodPressureWoman: e.target[7].value,
            highBloodSugarMan: e.target[8].value,
            highBloodSugarWoman: e.target[9].value,
            sportMan: e.target[10].value,
            sportWoman: e.target[11].value,
            alimMan: e.target[12].value,
            alimWoman: e.target[13].value
        })

        //infarct
            await updateDoc(doc(db, "normalValues","Infarct"), {
                age: e.target[14].value,
                bloodPressure: e.target[15].value,
                chol1: e.target[16].value,
                chol2: e.target[17].value,
                diabetes: e.target[18].value,
                eGRF: e.target[19].value,
                gender: e.target[20].value,
                hdl: e.target[21].value,
                hsCRP: e.target[22].value,
                infarct: e.target[23].value,
                smoke: e.target[24].value
            })

            //NoInfarct
        await updateDoc(doc(db, "normalValues","NoInfarct"), {
            afinf: e.target[25].value,
            age: e.target[26].value,
            bloodPressure: e.target[27].value,
            chol: e.target[28].value,
            hdl: e.target[29].value,
            smoke: e.target[30].value,
        })

    }



    async function fetchValues() {

        try {

            const docRef1 = doc(db, "normalValues","Diabetes");
            const docSnap1 = await getDoc(docRef1);

            const docRef2 = doc(db, "normalValues","Infarct");
            const docSnap2 = await getDoc(docRef2);

            const docRef3= doc(db, "normalValues","NoInfarct");
            const docSnap3 = await getDoc(docRef3);

            setNormalValuesDiabetes(docSnap1.data());
            setNormalValuesInfarct(docSnap2.data());
            setNormalValuesNoInfarct(docSnap3.data());

        } catch (err) {

            console.log("Error occured when fetching")
        }

  }

    useEffect(() => {
             fetchValues()
    }, []);



    return (
        <form onSubmit={onSubmitForm}>
            {/*<div className="row">*/}
                <div className="column">
                    <h1 className="normalValue_title"> Normal values Diabetes </h1>
                    <label> Age Man: <input value={normalValuesDiabetes.ageMan} name="ageMan" onChange={handleChange}/> </label> <br/>
                    <label> Age Woman: <input value={normalValuesDiabetes.ageWoman} name="ageWoman" onChange={handleChange}/> </label> <br/>
                    <label> BMI Man: <input value={normalValuesDiabetes.bmiMan} name="bmiMan" onChange={handleChange}/> </label> <br/>
                    <label> BMI Woman: <input value={normalValuesDiabetes.bmiWoman} name="bmiWoman" onChange={handleChange}/> </label> <br/>
                    <label> Additional Waist Man: <input value={normalValuesDiabetes.additionalWaistMan} name="additionalWaistMan" onChange={handleChange}/> </label> <br/>
                    <label> Additional Waist Woman: <input value={normalValuesDiabetes.additionalWaistWoman} name="additionalWaistWoman" onChange={handleChange}/> </label> <br/>
                    <label> High Blood Pressure Man: <input value={normalValuesDiabetes.highBloodPressureMan} name="highBloodPressureMan" onChange={handleChange}/> </label> <br/>
                    <label> High Blood Pressure Woman: <input value={normalValuesDiabetes.highBloodPressureWoman} name="highBloodPressureWoman" onChange={handleChange}/> </label> <br/>
                    <label> High Blood Sugar Man: <input value={normalValuesDiabetes.highBloodSugarMan} name="highBloodSugarMan" onChange={handleChange}/> </label> <br/>
                    <label> High Blood Sugar Woman: <input value={normalValuesDiabetes.highBloodSugarWoman} name="highBloodSugarWoman" onChange={handleChange}/> </label> <br/>
                    <label> Sport Man: <input value={normalValuesDiabetes.sportMan} name="sportMan" onChange={handleChange}/> </label> <br/>
                    <label> Sport Woman: <input value={normalValuesDiabetes.sportWoman} name="sportWoman" onChange={handleChange}/> </label> <br/>
                    <label> Alim Man: <input value={normalValuesDiabetes.alimMan} name="alimMan" onChange={handleChange}/> </label> <br/>
                    <label> Alim Woman: <input value={normalValuesDiabetes.alimWoman} name="alimWoman" onChange={handleChange}/> </label> <br/>
                </div>

                <div className="column">
                    <h1 className="normalValue_title"> Normal values Infarct </h1>
                    <label> Age: <input value={normalValuesInfarct.age} name="ageInfarct" onChange={handleChange}/> </label> <br/>
                    <label> BloodPressure: <input value={normalValuesInfarct.bloodPressure} name="bloodPressureInfarct" onChange={handleChange}/> </label> <br/>
                    <label> Total CHOL mmol/l 1: <input value={normalValuesInfarct.chol1} name="chol1Infarct" onChange={handleChange}/> </label> <br/>
                    <label> Total CHOL mmil/l 2: <input value={normalValuesInfarct.chol2} name="chol2Infarct" onChange={handleChange}/> </label> <br/>
                    <label> Diabetes: <input value={normalValuesInfarct.diabetes} name="diabetesInfarct" onChange={handleChange}/> </label> <br/>
                    <label> eGRF ml/min: <input value={normalValuesInfarct.eGRF} name="eGRFInfarct" onChange={handleChange}/> </label> <br/>
                    <label> Gender: <input value={normalValuesInfarct.gender} name="genderInfarct" onChange={handleChange}/> </label> <br/>
                    <label> HDL mmol/l: <input value={normalValuesInfarct.hdl} name="hdlInfarct" onChange={handleChange}/> </label> <br/>
                    <label> HS CRP mg/l: <input value={normalValuesInfarct.hsCRP} name="hsCRPInfarct" onChange={handleChange}/> </label> <br/>
                    <label> Infarct: <input value={normalValuesInfarct.infarct} name="infarctInfarct" onChange={handleChange}/> </label> <br/>
                    <label> Smoking: <input value={normalValuesInfarct.smoke} name="smokeInfarct" onChange={handleChange}/> </label> <br/>
                </div>

                <div className="column">
                    <h1 className="normalValue_title"> Normal values NoInfarct </h1>
                    <label> AFINF Correction: <input value={normalValuesNoInfarct.afinf} name="afinfNoInfarct" onChange={handleChange}/> </label> <br/>
                    <label> Age: <input value={normalValuesNoInfarct.age} name="ageNoInfarct" onChange={handleChange}/> </label> <br/>
                    <label> Blood Pressure: <input value={normalValuesNoInfarct.bloodPressure} name="bloodPressureNoInfarct" onChange={handleChange}/> </label> <br/>
                    <label> CHOL mmol/l: <input value={normalValuesNoInfarct.chol} name="cholNoInfarct" onChange={handleChange}/> </label> <br/>
                    <label> HDL mmol/l: <input value={normalValuesNoInfarct.hdl} name="hdlNoInfarct" onChange={handleChange}/> </label> <br/>
                    <label> Smoking: <input value={normalValuesNoInfarct.smoke} name="smokeNoInfarct" onChange={handleChange}/> </label> <br/>
                </div>
            {/*</div>*/}
                <input type="submit" id="save_changes" value="Save Changes"/>
        </form>

    )
}
export default AdminForm;


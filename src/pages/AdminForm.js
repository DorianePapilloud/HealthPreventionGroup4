import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../initFirebase";

function AdminForm() {

    let [docs, setDocs] = useState({});
    let navigate = useNavigate;



    function handleInputChange(docName, fieldName, event) {
        let data = {...docs}
        data[docName][fieldName] = Number(event.target.value);
        setDocs(data)
    }


    async function onSubmitForm(event) {
        event.preventDefault();
        Object.keys(docs).forEach(docName => {
            const docReference = doc(db, "normalValues", docName);
            updateDoc(docReference, docs[docName]);
            console.log(docReference);
        })
    }


    useEffect(() => {

        async function loadNormalValues() {
            try {
                const normalValues = await getDocs(collection(db, "normalValues")).then(queryResult => {
                    let temporaryDocs = {};
                    queryResult.forEach((doc) => {
                        temporaryDocs[doc.id] = doc.data();
                    })
                    setDocs(temporaryDocs);
                })} catch (err) {
                console.log("Error occured when fetching")
             }
            }

            loadNormalValues()
    }, []);


    return (
        <form onSubmit={onSubmitForm}>
            {Object.keys(docs).map((doc, index) => {
                return <div key={index}>
                    <h2>{doc}</h2>


                    {Object.keys(docs[doc]).map((field, index) => {
                        return <div key={index}>

                                <div>
                                    <label>{field}</label>
                                </div>
                                <div>
                                    <input
                                        defaultValue={docs[doc][field]}
                                        onChange={event => handleInputChange(doc, field, event)}
                                    />
                                </div>
                        </div>
                    })}
                </div>
            })}
            <button onClick={onSubmitForm}>
                Save changes
            </button>
        </form>
    )
}
export default AdminForm;


import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {collection, doc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "../initFirebase";
import "../css/Admin.scss"

function AdminForm() {

    let [docs, setDocs] = useState({});
    let navigate = useNavigate;

    function loadNormalValues() {
        getDocs(collection(db, "normalValues")).then(queryResult => {
            let temporaryDocs = {};
            queryResult.forEach((doc) => {
                temporaryDocs[doc.id] = doc.data();
            })
            setDocs(temporaryDocs);
        })
    }

    function handleInputChange(docName, fieldName, event) {
        let data = {...docs}
        data[docName][fieldName] = Number(event.target.value);
        setDocs(data)
    }

    function onSubmitForm(event) {
        Object.keys(docs).forEach(docName => {
            const docReference = doc(db, "normalValues", docName);
            updateDoc(docReference, docs[docName]);
            console.log(docReference)
        })
    }



    useEffect(() => loadNormalValues, []);

    return (
        <form onSubmit={onSubmitForm}>
            {Object.keys(docs).map((doc, index) => {
                return <div className={"index_admin"} key={index}>
                    <h2>{doc}</h2>
                    {Object.keys(docs[doc]).map((field, index) => {
                        return <div key={index}>
                                <p>
                                    <label>{field}</label>
                                </p>
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
            <button id={"save_changes"} onClick={onSubmitForm}>
                Save changes
            </button>
        </form>
    )
}
export default AdminForm;


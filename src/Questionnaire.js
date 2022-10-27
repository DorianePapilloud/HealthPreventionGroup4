import React from "react";
import 'survey-core/defaultV2.min.css';
import {Model, StylesManager} from "survey-core";
import {Survey} from "survey-react-ui";
import {userUIDInfo} from "./services/getCurrentUserUid";
import {doc, addDoc, collection, getDoc, updateDoc, arrayUnion} from "firebase/firestore";
import {db} from "./initFirebase";
import {userConverter} from "./objects/user";

StylesManager.applyTheme("defaultV2");

function Questionnaire({currentUser})  {

    let json = {
        pages: [
            {
                title: "About yourself",
                elements: [
                    {
                        name: "sex",
                        title: "Please specify your sex",
                        type: "radiogroup",
                        isRequired: true,
                        choices: [
                            {
                                "value": 0,
                                "text": "Female"
                            },
                            {
                                "value": 1,
                                "text": "Male"
                            },
                        ],
                        colCount: 2,
                    }, {
                        name: "age",
                        title: "How old are you ?",
                        type: "text",
                        inputType: "number",
                        isRequired: true,
                        validators: [
                            {
                                type: "numeric",
                                minValue: "15",
                                maxValue: "100"
                            }
                        ]
                    }, {
                        name: "weight",
                        isRequired: true,
                        title: "How much do you weigh ?",
                        type: "text",
                        inputType: "number",
                        validators: [
                            {
                                type: "numeric",
                                minValue: "50",
                                maxValue: "180"
                            }
                        ]
                    }, {
                        name: "height",
                        isRequired: true,
                        title: "How tall are you in centimeters ?",
                        type: "text",
                        inputType: "number",
                        validators: [
                            {
                                type: "numeric",
                                minValue: "140",
                                maxValue: "230"
                            }
                        ]
                    }, {
                        name: "syst",
                        isRequired: true,
                        title: "Is your blood pressure specially high ?",
                        type: "radiogroup",
                        choices: [
                            {
                                "value": 0,
                                "text": "No"
                            },
                            {
                                "value": 1,
                                "text": "Yes"
                            },
                        ],
                        colCount: 2,
                    }, {
                        name: "glyc",
                        isRequired: true,
                        title: "Is your blood sugar level specially high ?",
                        type: "radiogroup",
                        choices: [
                            {
                                "value": 0,
                                "text": "No"
                            },
                            {
                                "value": 1,
                                "text": "Yes"
                            },
                        ],
                        colCount: 2,
                    }, {
                        name: "chol",
                        isRequired: true,
                        title: "Is your cholesterol specially high ?",
                        type: "radiogroup",
                        choices: [
                            {
                                "value": 0,
                                "text": "No"
                            },
                            {
                                "value": 1,
                                "text": "Yes"
                            },
                        ],
                        colCount: 2,
                    }, {
                        name: "diab",
                        isRequired: true,
                        title: "Do you have diabetes ?",
                        type: "radiogroup",
                        choices: [
                            {
                                "value": 0,
                                "text": "No"
                            },
                            {
                                "value": 1,
                                "text": "Yes"
                            },
                        ],
                        colCount: 2,
                    }, {
                        name: "inf",
                        isRequired: true,
                        title: "Have you ever had an heart attack ?",
                        type: "radiogroup",
                        choices: [
                            {
                                "value": 0,
                                "text": "No"
                            },
                            {
                                "value": 1,
                                "text": "Yes"
                            },
                        ],
                        colCount: 2,
                    }, {
                        name: "avc",
                        isRequired: true,
                        title: "Have you ever had a stroke ?",
                        type: "radiogroup",
                        choices: [
                            {
                                "value": 0,
                                "text": "No"
                            },
                            {
                                "value": 1,
                                "text": "Yes"
                            },
                        ],
                        colCount: 2,
                    }
                ]
            }, {
                title: "Your family",
                elements: [{
                    name: "afInf",
                    isRequired: true,
                    title: "Has one of your parents (father before 55 years old, mother before 65) ever had a heart attack ?",
                    type: "radiogroup",
                    choices: [
                        {
                            "value": 0,
                            "text": "No"
                        },
                        {
                            "value": 1,
                            "text": "Yes"
                        },
                    ],
                    colCount: 2
                }, {
                    name: "afCancer",
                    isRequired: true,
                    title: "Has one of your close relatives (mother, father, brother or sister ever had cancer ?",
                    type: "radiogroup",
                    choices: [
                        {
                            "value": 0,
                            "text": "No"
                        },
                        {
                            "value": 1,
                            "text": "Yes"
                        },
                    ],
                    colCount: 2
                }]
            }, {
                title: "Your habits",
                elements: [{
                    name: "smoke",
                    isRequired: true,
                    title: "Did you ever smoke regularly at a point in your life ?",
                    type: "radiogroup",
                    choices: [
                        {
                            "value": 0,
                            "text": "No"
                        },
                        {
                            "value": 1,
                            "text": "Yes"
                        },
                    ],
                    colCount: 2
                },{
                    name: "alim",
                    isRequired: true,
                    title: "How often do you eat fruits, vegetables, olive oil, nuts, fatty fishes, and little meat, cream and cold cuts ?",
                    type: "radiogroup",
                    choices: [
                        {
                            "value": 0,
                            "text": "Never"
                        },
                        {
                            "value": 1,
                            "text": "Sometimes"
                        },
                        {
                            "value": 2,
                            "text": "Often"
                        },
                        {
                            "value": 3,
                            "text": "Most of the time"
                        },
                    ],
                    colCount: 1
                }, {
                    name: "sport",
                    isRequired: true,
                    title: "How often do you do physical activities per week ?",
                    type: "radiogroup",
                    choices: [
                        {
                            "value": 0,
                            "text": "I don't do any"
                        },
                        {
                            "value": 1,
                            "text": "30 minutes, 2-3 days a week"
                        },
                        {
                            "value": 2,
                            "text": "30 minutes, 5 days a week"
                        },
                        {
                            "value": 3,
                            "text": "More than 2 hours per week"
                        },
                    ],
                    colCount: 1
                }, {
                    name: "alcohol",
                    isRequired: true,
                    title: "How often do you consume alcohol per week ?",
                    type: "radiogroup",
                    choices: [
                        {
                            "value": 0,
                            "text": "Every day"
                        },
                        {
                            "value": 1,
                            "text": "3 to 6 days a week"
                        },
                        {
                            "value": 2,
                            "text": "1 to 2 days a week"
                        },
                        {
                            "value": 3,
                            "text": "Less than a day per week"
                        },
                        {
                            "value": 4,
                            "text": "I don't drink"
                        },
                    ],
                    colCount: 1
                }]
            }
        ]
    };

    let userQuestionnaires = [];

    let userUID = userUIDInfo.getUID;
    console.log(userUID);

    const survey1 = new Model(json);
    const current = new Date();
    const ref = doc(db, "users", userUID).withConverter(userConverter);

    const answers = [];

    survey1.onComplete.add(async (survey1) => {
        const date = current.getDate() + "." + (current.getMonth() + 1) + "." + current.getFullYear() + " " + current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        for (const key in survey1.data) {
            const question = survey1.getQuestionByName(key);
            if (!!question) {
                const answer = {
                    name: key,
                    value: question.value,
                };
                answers.push(answer);
            }
        }

        try{
            const docRef = await addDoc(collection(db, "questionnaire"), {
                answers: answers,
                date: date,
            });

            const getObject = async () => {

                const docSnap = await getDoc(ref);
                if (docSnap.exists()) {
                    // Convert to User object
                    const user = docSnap.data();
                    userQuestionnaires = user.getQuestionnaire();
                    userQuestionnaires.push(docRef.id);
                    console.log(userQuestionnaires);
                } else {
                    console.log("No user found!");
                }
            }

            await getObject();

            const updateDB = async () => {
                try{
                    await updateDoc(ref, {
                        questionnaire: arrayUnion(...userQuestionnaires)
                    });
                } catch (e){
                    console.log(e);
                }
            }

            await updateDB();

        }catch(e){
            console.error(e);
        }

    });

    return(
        <Survey model={survey1} />
    );
}

export default Questionnaire
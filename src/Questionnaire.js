import React from "react";
import 'survey-core/defaultV2.min.css';
import {Model, StylesManager} from "survey-core";
import {Survey} from "survey-react-ui";

StylesManager.applyTheme("defaultV2");

function Questionnaire()  {

    var json = {
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
                            "Female",
                            "Male"
                        ],
                        colCount: 2,
                    }, {
                        name: "age",
                        title: "How old are you ?",
                        type: "text",
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
                            "Yes",
                            "No"
                        ],
                        colCount: 2,
                    }, {
                        name: "glyc",
                        isRequired: true,
                        title: "Is your blood sugar level specially high ?",
                        type: "radiogroup",
                        choices: [
                            "Yes",
                            "No"
                        ],
                        colCount: 2,
                    }, {
                        name: "chol",
                        isRequired: true,
                        title: "Is your cholesterol specially high ?",
                        type: "radiogroup",
                        choices: [
                            "Yes",
                            "No"
                        ],
                        colCount: 2,
                    }, {
                        name: "diab",
                        isRequired: true,
                        title: "Do you have diabetes ?",
                        type: "radiogroup",
                        choices: [
                            "Yes",
                            "No"
                        ],
                        colCount: 2,
                    }, {
                        name: "inf",
                        isRequired: true,
                        title: "Have you ever had an heart attack ?",
                        type: "radiogroup",
                        choices: [
                            "Yes",
                            "No"
                        ],
                        colCount: 2,
                    }, {
                        name: "avc",
                        isRequired: true,
                        title: "Have you ever had a stroke ?",
                        type: "radiogroup",
                        choices: [
                            "Yes",
                            "No"
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
                        "Yes",
                        "No"
                    ],
                    colCount: 2
                }, {
                    name: "afCancer",
                    isRequired: true,
                    title: "Has one of your close relatives (mother, father, brother or sister ever had cancer ?",
                    type: "radiogroup",
                    choices: [
                        "Yes",
                        "No"
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
                        "Yes",
                        "No"
                    ],
                    colCount: 2
                },{
                    name: "alim",
                    isRequired: true,
                    title: "How often do you eat fruits, vegetables, olive oil, nuts, fatty fishes, and little meat, cream and cold cuts ?",
                    type: "radiogroup",
                    choices: [
                        "Never",
                        "Sometimes",
                        "Often",
                        "Most of the time"
                    ],
                    colCount: 1
                }, {
                    name: "sport",
                    isRequired: true,
                    title: "How often do you do physical activities per week ?",
                    type: "radiogroup",
                    choices: [
                        "I don't do any",
                        "30 minutes, 2-3 days a week",
                        "30 minutes, 5 days a week",
                        "More than 2 hours per week"
                    ],
                    colCount: 1
                }, {
                    name: "alcohol",
                    isRequired: true,
                    title: "How often do you consume alcohol per week ?",
                    type: "radiogroup",
                    choices: [
                        "Every day",
                        "3 to 6 days a week",
                        "1 to 2 days a week",
                        "Less than a day per week",
                        "I don't drink"
                    ],
                    colCount: 1
                }]
            }
        ]
    };

    const survey1 = new Model(json);

    return(
        <Survey model={survey1} />
    );
}

export default Questionnaire
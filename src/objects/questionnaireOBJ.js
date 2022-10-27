class QuestionnaireOBJ {

    constructor(answers, date) {
        this.answers = answers;
        this.date = date;
    }


    get answers() {
        return this.answers;
    }

    set answers(value) {
        this.answers = value;
    }

    get date() {
        return this.date;
    }

    set date(value) {
        this.date = value;
    }
}

    export const questionnaireConverter = {
    toFirestore: (questionnaire) => {
        return {
            answers: questionnaire.answers,
            date: questionnaire.date,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new QuestionnaireOBJ(data.answers, data.date);
    }
};

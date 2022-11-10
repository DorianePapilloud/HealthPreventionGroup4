class QuestionnaireOBJ {
    constructor(answers, date) {
        this.answers=answers;
        this.date=date;
    }

    getAnswers() {
        return this.answers;
    }

    getDate() {
        return this.date;
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

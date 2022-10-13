class User {
    constructor(answer, name, role, surname) {
        this.answer=answer;
        this.name=name;
        this.role=role;
        this.surname=surname;
    }
    toString() {
        return this.name + " " + this.surname + " is connected as a " + this.role;
    }

    // getters
    getName() {
        return this.name;
    }
    getSurname() {
        return this.surname;
    }
    getRole() {
        return this.role;
    }
    getAnswers() {
        return this.answer;
    }
}

// Firestore data converter
export const userConverter = {
    toFirestore: (user) => {
        return {
            answer: user.answer,
            name: user.name,
            role: user.role,
            surname: user.surname
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.answer, data.name, data.role, data.surname);
    }
};

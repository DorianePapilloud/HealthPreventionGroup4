class User {
    constructor(questionnaire, name, role, surname, email, country, gender, avatarID) {
        this.questionnaire=questionnaire;
        this.name=name;
        this.role=role;
        this.email=email;
        this.country=country;
        this.gender=gender;
        this.avatarID=avatarID;
        this.surname=surname;
    }
    toString() {
        return this.name + " " + this.surname + " is connected as a " + this.role;
    }
    getQuestionnaire() {
        return this.questionnaire;
    }
    // getters
    getEmail() {
        return this.email;
    }
    getAvatarID() {
        return this.avatarID;
    }
    getCountry() {
        return this.country;
    }
    getGender() {
        return this.gender;
    }
    getName() {
        return this.name;
    }
    getSurname() {
        return this.surname;
    }
    getRole() {
        return this.role;
    }
}

// Firestore data converter
export const userConverter = {
    toFirestore: (user) => {
        return {
            questionnaire: user.questionnaire,
            email: user.email,
            gender: user.gender,
            country: user.country,
            avatarID: user.avatarID,
            name: user.name,
            role: user.role,
            surname: user.surname
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.questionnaire, data.name, data.role, data.surname, data.gender, data.country, data.email, data.avatarID);
    }
};

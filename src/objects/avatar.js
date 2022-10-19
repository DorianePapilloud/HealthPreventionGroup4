class Avatar {
    constructor(face, body, head) {
        this.face=face;
        this.body=body;
        this.head=head;
    }
    getFace() {
        return this.face;
    }
    getBody() {
        return this.body;
    }
    getHead() {
        return this.head;
    }

}

// Firestore data converter
export const avatarConverter = {
    toFirestore: (avatar) => {
        return {
            face: avatar.face,
            body: avatar.body,
            head: avatar.head,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Avatar(data.face, data.body, data.head);
    }
};
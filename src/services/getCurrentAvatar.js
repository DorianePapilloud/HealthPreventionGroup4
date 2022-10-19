export const avatarInfo = {
    head: 0,
    face: 4,
    body: 0,

    // getters
    get getHead() {
        return this.head;
    },
    get getFace() {
        return this.face;
    },
    get getBody() {
        return this.body;
    },

    // setters
    set setHead(newHead) {
        this.head=newHead;
    },
    set setFace(newFace) {
        this.face=newFace;
    },
    set setBody(newBody) {
        this.body=newBody;
    }
};
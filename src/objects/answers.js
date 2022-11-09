export class Answers {
    constructor(sex, age, height, weight, syst, glyc, chol, diab, inf, avc, afInf, afCancer, smoke, alim, sport, alcohol) {
        this._sex = sex;
        this._age = age;
        this._height = height;
        this._weight = weight;
        this._syst = syst;
        this._glyc = glyc;
        this._chol = chol;
        this._diab = diab;
        this._inf = inf;
        this._avc = avc;
        this._afInf = afInf;
        this._afCancer = afCancer;
        this._smoke = smoke;
        this._alim = alim;
        this._sport = sport;
        this._alcohol = alcohol;
    }

    get sex() {
        return this._sex;
    }

    get age() {
        return this._age;
    }

    get height() {
        return this._height;
    }

    get weight() {
        return this._weight;
    }

    get syst() {
        return this._syst;
    }

    get glyc() {
        return this._glyc;
    }

    get chol() {
        return this._chol;
    }

    get diab() {
        return this._diab;
    }

    get inf() {
        return this._inf;
    }

    get avc() {
        return this._avc;
    }

    get afInf() {
        return this._afInf;
    }

    get afCancer() {
        return this._afCancer;
    }

    get smoke() {
        return this._smoke;
    }

    get alim() {
        return this._alim;
    }

    get sport() {
        return this._sport;
    }

    get alcohol() {
        return this._alcohol;
    }
};
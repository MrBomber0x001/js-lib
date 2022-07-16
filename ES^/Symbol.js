/**
 * Intro to Symbols
 * It's 7th primitive type
 * it help us avoid naming collision for property names, if you wanna ensure that the property keys are not going to be collided
 * they are enumerable
 */

const yousef1 = Symbol("yousef"); //rwekr;kwerl;ekwr;ewkr9534flklfs
const omar2 = Symbol("yousef")
console.log(yousef1 === yousef2) // false

/**
 * An example
 */

const classRoom = {
    [Symbol("olivia")]: { grade: 80, gender: "female" },
    [Symbol("olivia")]: { grade: 80, gender: "female" },
    [Symbol("olivia")]: { grade: 80, gender: "female" },
    [Symbol("yousef")]: { grade: 90, gender: "male" }
}
const syms = Object.getOwnPropertySymbols(classRoom);
console.log(syms); // An array of  Symbol property keys
const data = syms.map(sym => classRoom[sym])
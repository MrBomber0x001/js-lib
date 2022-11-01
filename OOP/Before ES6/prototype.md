```js

/* Prototypes & Prototypical Inheritance */


let animal = {}
animal.name = 'x';
animal.energy = 10;

animal.eat = function (amount) {
 console.log(`${this.name} is eating`);
 this.energy += amount
}

animal.sleep = function (length) {
 console.log(`${this.name} is sleeping`);
 this.energy += length
}

animal.play = function (length) {
 console.log(`${this.name} is playing`);
 this.energy -= length
}

// what if we need to create more than one animal?
// Factory function

function Animal(name, energy) {
 let animal = {}
 animal.name = name
 animal.energy = energy
 animal.eat = animalMethods.eat // reference
 animal.sleep = animalMethods.sleep
 animal.play = animalMethods.play
 //added one
 animal.poop = animal.poop
 return animal
}

const leo = Animal('leo', 10);
const lith = Animal('lith', 12);

// Imagine we are building an online video game, where we need to create more than 10m animal, everytime we use Animal function we are recreating the animal object 
// eat, sleep, play can be share among animals, right!


const animalMethods = {
 eat(amount) {
  console.log(`${this.name} is eating`);
  this.energy += amount
 }

 sleep(length) {
  console.log(`${this.name} is sleeping`);
  this.energy += length
 }

 play(length) {
  console.log(`${this.name} is playing`);
  this.energy -= length
 }
 // new added one
 poop() {
  // code
 }
}


// what are the down sides of using this approach?
// one down side is when we've to add new methods we've to go to Animal function each time we add one inside animalMethods


// using Object.create();
const parent = {
 name: "Stacey"
 age: 35,
 heritage: "Irish"
}
// we need to have child having the same heritage
const child = Object.create(parent) // return brand new object
child.name = 'Ryan';
child.age = 5;

console.log(child); //{name, age} only
console.log(child.heritage); //"Irish"


function Animal(name, energy) {
 let animal = Object.create(animalMethods);
 animal.name = name;
 animal.energy = energy;

 return animal;
}

const leo = Animal('leo', 10);
leo.play(10);


// cool to this moment right!?
// it can get more cooler with prototypes!!! <3 

function imAfunction() {

}
console.log(imAfunction.prototype); // returns an object

// Prototype: every function has a [property] called prototype that points to an object [the constructor => the one who created the function]
// it allows us to share methods across all instances
function Animal(name, energy) {
 let animal = Object.create(Animal.prototype);
 animal.name = name;
 animal.energy = energy;

}

Animal.prototype.eat = function (amound) {
 console.log(`${this.name} is eating`);
 this.energy += amount

}

Animal.prototype.sleep = function (length) {
 console.log(`${this.name} is sleeping`);
 this.energy += length

}

Animal.prototype.play = function (length) {
 console.log(`${this.name} is playing`);
 this.energy -= length

}


// using constructor function is more cooler

function AnimalwithNew(name, energy) {
 this.name = name;
 this.energy = energy
}

const leo = new AnimalwithNew('leo', 10);
// so what's cool about new?
// behind the scenes this what actually happening

function AnimalwithNew(name, energy) {
 let this = Object.create(Animal.prototype); // initially {}
 this.name = name;
 this.energy = energy;
 return this;
}


AnimalwithNew.prototype.eat = function (amound) {
 console.log(`${this.name} is eating`);
 this.energy += amount

}

AnimalwithNew.prototype.sleep = function (length) {
 console.log(`${this.name} is sleeping`);
 this.energy += length

}

AnimalwithNew.prototype.play = function (length) {
 console.log(`${this.name} is playing`);
 this.energy -= length

}


// with prototypes you can extend any constructor methods [functionalitye]

console.log(Array.prototype);
// be aware of overwritting an original functionalites


const leoPrototype = Object.getPrototypeOf(leo);
console.log(leoPrototype);
console.log(leoPrototype === Animal.prototype);


// looping: for in loop over all of the enumerable properties, by default any method or property you add to a prototype is enumerable
for (let key in leo) {
 console.log(`Key: ${key}, Val: ${leo[key]}`);
}

// to avoid this, we use .hasOwnProperty()

for (let key in leo) {
 if (leo.hasOwnProperty(key)) {
  console.log(`Key: ${key}. Value: ${leo[key]}`);
 }
}

console.log(leo instanceof Animal); // true

// arrow functions does not have prototype property
const Animal = () => {

}

const leo = new Animal(); // Uncaught TypeError: Animal is not a constructor, because arrow function does not bind this, so it does has it's own this
```

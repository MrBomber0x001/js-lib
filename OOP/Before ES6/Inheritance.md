
## Inheritance

```js
//object inheritance
let book = {
  title: "The Javascript oop concepts",
};
//is the same as
var bookk = Object.create(Object.prototype, {
  title: {
    configurable: true,
    enumerable: true,
    value: "The Javascript oop concepts",
    writable: true,
  },
});

let person1 = {
  name: "yousef",
  sayName: function () {
    console.log(this.name);
  },
};
let person2 = Object.create(person1, {
  name: {
    configurable: true,
    enumerable: true,
    value: "ahmed",
    writable: true,
  },
});
person1.sayName();
person2.sayName();
console.log(person1.hasOwnProperty("sayName")); //true
console.log(person1.isPrototypeOf(person2)); //true
console.log(person2.hasOwnProperty("sayName")); //false

//create a prototypless object
let nakedObject = Object.create(null); //[[prototype]] = null

//Constructor inhertiance

//You write this
function YourConstructor() {
  //your code
}
//Javscript enginer does this for you behind the scenes
YourConstructor.prototype = Object.create(Object.prototype, {
  constructor: {
    configurable: true,
    enumerable: true,
    writable: true,
    value: YourConstructor,
  },
});
//meaning that any instance of YourConstrcuctor also inherit Object.prototype
//YourConstructor is 'subtype' of Object, and Object is 'supertype' of YourConstructor
/*Because the prototype property is writable, you can change the prototype
  chain by overwriting it. Consider the following example*/
function Rectangle(width, length) {
  this.width = width;
  this.length = length;
}
Rectangle.prototype.getArea = function () {
  return this.width * this.length;
};
function Square(size) {
  this.length = size;
  this.width = size;
}
Square.prototype = Rectangle.prototype; //or new Rectangle();
Square.prototype.constrcutor = Square;
let rect = new Rectangle(5, 6);
let square = new Square(6);
console.log(rect.getArea());
console.log(square.getArea());
console.log(rect instanceof Rectangle); // true
console.log(rect instanceof Object); // true
console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true
console.log(square instanceof Object); // true

//we could simplify the code above using Object.create(), I will instantiate another constructor called Square1
function Square(size) {
  this.length = size;
  this.width = size;
}
Square.prototype = Object.create(Rectangle.prototype, {
  constructor: {
    configurable: true,
    enumerable: true,
    writable: true,
    value: Square,
  },
});

/*Always make sure that you overwrite the prototype before adding properties to it,
  or you will lose the added methods when the overwrite happens.*/

//abstraction: hide the details and expose only the essentials
function Circle(radius) {
  this.radius = radius;
  let defaultLocations = { x: 1, y: 2 };
  // this.getDefaultLocation = function(){
  //   return defaultLocations
  // } old way , the better approah is to use Object.defineProperties
  Object.defineProperty(this, "defaultLocation", {
    get: function () {
      return defaultLocations;
    },
    set: function (value) {
      if (!value.x || !value.y) {
        throw new Error("Invalid locations");
      }
      defaultLocations = value;
    },
  });

  /*this.computeOptimalLocation = function(){
      //some code here
      //here computerOptimalLocation is accessible from outside and we need to prevent this behaviour
      //the solution is to make it a function insde Circle, not a method of an instance, so we can't reach it from outside 

    };*/
  function computeOptimalLocation(factor) {
    //some code
  }
  this.draw = function () {
    //closure determine what variable will be accessbile from inner functions
    computeOptimalLocation(0.1);
    console.log("draw");
  };
}
const circle = new Circle(2);
circle.getDefaultLocation();

/*Constructor stealing:You simply call the supertype constructor
from the subtype constructor using either call() or apply() to
pass in the newly created object*/

function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}
Rectangle.prototype.getArea = function () {
  return this.length * this.width;
};
function Square(size) {
  Rectangle.call(this, size, size);
}
Square.prototype = Object.create(Rectangle.prototype, {
  constructor: {
    writable: true,
    enumerable: true,
    configurable: true,
    value: Square,
  },
});
let square = new Square(6);
console.log(square.getArea());
//this approach called pseudoclassical inheritance

// but you cannot inherit own properties using prototypes.
// To inherit own properties correctly, you can use constructor stealing,
// which is simply calling a constructor function using call() or apply() so
// that any initialization is done on the subtype object
//Accessing SuperType methods
function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}
Rectangle.prototype.getArea = function () {
  return this.length * this.width;
};

function Square(size) {
  Rectangle.call(this, size, size);
}
Square.protototype = Object.create(Rectangle.prototype, {
  constructor: {
    configurable: true,
    enumerable: true,
    writable: true,
    value: Square,
  },
});
//call the supertype method
Square.prototype.toString = function () {
  let text = Rectangle.prototype.toString.call(this);
  return text.replace("Rectangle", "Square");
};

```

--------------------------------------------------------------
/**Inheritance**/
function Animal(name, energy) {
 this.name = name;
 this.energy = energy;
}
Animal.prototype.play = function (argument) {
 // body...
}
Animal.prototype.method_name = function(first_argument) {
 // body...
};

function Dog(name, energy, breed) {
 this.breed = breed;
}

Dog.prototype.method_name = function(first_argument) {
 // body...
};
Dog.prototype.bark = function(){
 console.log(`Woof Woof`);
 this.energy -= .1;
}

const charlie = new Dog('Charlie', 10, 'goldendoodle')

//what if we've 10m classes?
function Cat(){}
function Giraffe(){}
function Lion(){}
// wasteful right!, we can refactor this
// what we need is to call the constructor Animal function inside Dog
// so we need to invoke animal in the context of Dog. remember?
// so when the animal function runs, this inside it will refers to the Dog
function Dog(name, energy, breed){
 // this = Object.create(Dog.prototype); Dog.prototype = Object.create(Animal.prototype);
 Animal.call(this, name, energy);

 this.breed = breed;
}

const charlie = new Dog('Charlie', 10, 'goldendoodle');
console.log(charlie.eat()); //undefined? what ?why?

// we need to share the animal prototype, to do so we'll be using Object.creat();
// what Object.creat() actually does is to delegate to another object on failed lookups, this means the following
// when the Javascript Engine can't see any methods on charlie, he will delegate to further object which is the prototype of Dog which is now pointing to the Animal Prototype

Dog.prototype = Object.create(Animal.prototype);

Dog.prototype.bark = function(){
 console.log('Woof Woof');
 this.energy -= .1
}

console.log(charlie instanceof Animal); //true;
console.log(charlie.constructor) // Animal? why? it should be Dog
// because we've reset the prototype of Dog to the prototype of Animal
// what can we do? we need to reset the constructor property on Dog
Dog.prototype.constructor = Dog;

// we can use a mixin function to prevent the repetitive code
function mixin(parent, child){
 child.prototype = Object.create(parent.prototype);
 child.prototype.constructor = child;
}
function Cat(name, energy, declawed){
 Animal.call(this, name, energy);
 this.declawed = declawed;
}
mixin(Animal, Cat)

// in ES6, we've classes
// class is really [syntactic sugar over constructor function and prototypical inheritance]

class Animal {

 constructor(name, energy) {
  this.name = name;
  this.energy = energy;
 }

 eat(amount) {
  console.log(`${this.name} is eating`);
  this.energy += amount
 }
 sleep(length) {
  console.log(`${this.name} is sleeping`);
  this.energy += length
 }
 play() {
  console.log(`${this.name} is playing`);
  this.energy -= length
 }
}

class Dog extends Animal{
 constructor(name, energy, breed){
  super(name, energy);
  this.breed = breed;
 }

 bark(){
  console.log('Woof Woof');
  this.energy -= .1;
 }
}

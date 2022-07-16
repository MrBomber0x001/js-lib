
## Constructor and Prototype

```js
/* Beginning of chapter 4: constructors and prototypes */
function Person(){
    
}
let person1 = new Person;
//you can check the type of an instance using the constructor property, 
//Every object instance is automatically created with constructor property that contains a reference to the constructor function created it
//for generic object(objects created by literal form or Object constructor), the constructor property is set to Object
//for objects created with custom constructor, a construcor prop points back to the constructor function createed it 

console.log(person1.constructor === Person); //true
let person2 = {
    name: 'yousef', 
    age: 21
}
console.log(person2.constructor);
function Person(name){
  // this.name = name;
  // this.sayName = function(){
  //   console.log(this.name);
  // }
  Object.defineProperty(this, "name", {
    get: function(){
      return name;
    },
    set: function(newName){
      name = newName;
    },
    enumerable: true,
    configurable: true
  });
  this.sayName = function(){
    console.log(this.name);
  }
}
let person = new Person('omar');
person.sayName();
console.log(person.constructor);
/*you are still advised to use instanceof to check the type of an
instance. This is because the constructor property can be overwritten and
therefore may not be completely accurate.*/

//what if we instantiate the object from a function constructor without a new keyword
let person3 = Person('meska');
console.log(person3 instanceof Person); //false
console.log(typeof person3); //undefined
console.log(name); //meska
/*the value of this
inside of the constructor is equal to the global this object. The variable
person1 doesn’t contain a value because the Person constructor relies on
new to supply a return value. Without new, Person is just a function without
a return statement. The assignment to this.name actually creates a global variable called name*/


/* Prototypes */
//contructor allow you to configure object instances with the same properties, but constructors alone doesn't eleminate code redundancy
/*In the example code thus far, each instance has had its own sayName()
method even though sayName() doesn’t change. That means if you have
100 instances of an object, then there are 100 copies of a function that
do the exact same thing, just with different data.
It would be much more efficient if all of the instances shared one
method, and then that method could use this.name to retrieve the appropriate
data. This is where prototypes come in.*/
//identifying the prototype property 
function hasPrototypeProperty(object, name){
  return name in object && !object.hasOwnProperty(name);
}

let person = {};
var prototype = Object.getPrototypeOf(person);
console.log(prototype == Object.prototype);

console.log(Object.prototype.isPrototypeOf(person));
//shadowing 
console.log(person.toString());
person.toString = function(){
  return '[object Custom]'
}
console.log(person.toString());
delete person.toString;
console.log(person.toString());
delete person.toString;

//using  prototypes with constructor
function Person(name){
  this.name = name;
}

Person.prototype.sayName = function(){
  console.log(`hello, ${this.name}`);
}
let person1 = new Person('yousef');
let person2 = new Person('meska');
person1.sayName();

//of course you can add any data type you want as a prototype property, but be carreful when you are dealing with reference type, because one instance can change another instance behaviour, like 
Person.prototype.fruits = []; //Array: reference type
person1.fruits.push('pizza');
console.log(person1.fruits); //['pizza'];
person2.fruits.push('apple');
console.log(person1.fruits); //[ 'pizza', 'apple' ]

//instead of adding one property after another on the prototype, it would be easier to add the properties as an object 
Person.prototype = {
  sayName: function(){
    console.log(this.name);
  },
  toString: function(){
    return `[Person ${this.name} ]`;
  }
}
//altought this code eleminate the need to type Person.prototype, however, there is one side effect to be aware of 
let person4 = new Person('Ali');
console.log(person4 instanceof Person); //true
console.log(person4.constructor === Person); //false
console.log(person4.constructor === Object); //true
//but, why?


//ths solution is to put the constructor inside the prototype 
Person.prototype = {
  constructor: Person,
  sayName: function(){
    ///
  }, 
  toString: function(){
    
  }
}
let person5 = new Person('osama');
console.log(person5.constructor == Person);


//Changing prototypes: 

var person6 = new Person("Nicholas");
var person7 = new Person("Greg");
Object.freeze(person6);
Person.prototype.sayHi = function() {
console.log("Hi");
};
person6.sayHi(); // outputs "Hi"
person7.sayHi(); // outputs "Hi"

//Built-in Object prototype:All built-in objects have constructors, and therefore, they have prototypes that you can change

Array.prototype.sum = function(){
  return this.reduce(function(prev, next){
    return prev + next;
  })
}
var number = [1,2,3,4,5];
var result = number.sum();
console.log(result);

String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.substring(1);
}
let name = 'yousef meska';
let resultt = name.capitalize();
console.log(resultt)



let person = {name: 'yousef'};
let objectBase = Object.getPrototypeOf(person);
let propertyDescriptor = Object.getOwnPropertyDescriptor(objectBase, "toString");


function Circle(){
  this.move = function(){
    this.draw(); //from the prototype
    console.log('move');
  }
}
Circle.prototype.draw = function(){
  console.log('draw');
}
let circle = new Circle();
circle.move(); //draw, move 

//Object.keys only return instance[own] members 
console.log(Object.keys(circle)); //move only

//for in loop returns all the instance[own] and prototype members 

//constructor resetting after prototypcial inheritance 

function Shape(color){
  this.color = color;
}
Shape.prototype.duplicate = function(){
  console.log('duplicate');
}
//Circle.prototype.constructor(1) === new Circle(1)
Circle.prototype = Object.create(Shape.prototype);
//Circle.prototype.constructor(1) === new Shape(1);
//the fix:
Circle.prototype.constructor = Circle;

//Calling the super constructor
function Circle(rdius){
  Shape.call(this, color);
  this.radius = radius;
}


//instead of manually do the prototypical inheritance every time we need to, we can make a function to automate this
//this is called intermediate function inhertia
function extend(Child, Parent){
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}

function Square(){

}
extend(Square, Shape);

//Method overriding:

Circle.prototype.duplicate = function(){
  //calling the duplicate of Shape 
  Shape.prototype.duplicate.call(this);
  console.log('duplicate circle')
}


//Polymorphism: many form 
const shapes = [
  new Circle(),
  new Square()
];

for(let shape of shapes)
  shape.duplicate();



  //Mixinis 

  function mixin(target, ...sources){
    Object.assign(target, ...sources);
  }
  const canEat = {
    eat: function(){
      this.hunger--;
      console.log('eating')
    }
  };
  const canWalk = {
    walk: function(){
      console.log('walking')
    }
  };
  
  const canSwim = {
    swim: function(){
      console.log('swim');
    }
  }
  function Person (){

  }
//Object.assign(); //copy from object to object
//Object.assign({}, canEat, canWalk)
//Object.assign(Person.prototype, canEat, canWalk);
mixin(Person.prototype, canEat, canWalk);
const person = new Person();
console.log(person);
function Goldfish(){

}
//Object.assign(Goldfish.prototype, canEat, canSwim);
mixin.assign(Goldfish.prototype, canEat, canSwim);
const goldfish = new Goldfish();
console.log(goldfish);
```

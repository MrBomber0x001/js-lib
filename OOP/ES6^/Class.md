
## Classes

classes are just sytatic sugar over prototypical inheritance
method that defined on the constructor are not part of the prototype of the object, but own methods

Classes are essentially functions!

```js
class Circle {
  constructor(radius) {
    this.radius = radius;
    this.move = function () {
      //code
      //here are not on the prototype, instead they are on the own properties
    };
  }
  //Instance method
  draw() { 
    //code
    //methods are on the prototype
  }
  //Static method
  static parse(str){
      const radius = JSON.parse(str).radius;
      return new Circle(radius);
  }
}


//Class Declaration 
class Circle {

}
//unlike functions, class [Declarations, Expressions] are not hoisted
//Class Expression
const Square = class {

}

const circle = new Circle.parse('{"radius: 1"}');
console.log(circle);



class Circle {
  constructor(radius){
    this.radius = radius;
    this.move = function(){
      console.log('move')
    }
  }

    draw(){
      console.log('draw');
    }
  static parse(str){
    const radius = JSON.parse(str).radius;
    return new Circle(radius);
  }
  
}
const c1 = new Circle();
c1.draw();
c1.move();
console.log(c1);
console.log(typeof Circle);
const c2 = Circle.parse('{"radius": 1}');
console.log(c2)


//this 
const Square = function(){
  this.draw = function(){
    console.log(this);
  }
}
const sq = new Square();
//notice this behaviour 
//Method call
sq.draw();
//notice also this behaviour 
const draw = sq.draw;
//function call, here 'this' will point to the global object 
//so it ppreferable to use 'use strict' mode to make sure that 'this' will return undefined instead of invoking to the global window
//draw(); //window object 


//by Default, the body of class is excuting on 'strict' mode, to prevent you from modifying the global this accidently 


//private memebers using Symbol


function random(){
  return Math.random().toString(36).slice(-5)
}
const name = 'yousef';
const obj = {
  name,
  [random()]: true
}

console.log(obj);
console.log('----------------------');
const _radius = Symbol();
const _draw = Symbol();
console.log(_radius);
class Triangle {
  constructor(radius){
    this[_radius] = radius;
  }
  [_draw](){
    return 3;
  }
}
const tr = new Triangle(2);
console.log(tr)
console.log(tr._radius);
const key = Object.getOwnPropertySymbols(tr);
console.log(tr[key[0]]);
console.log(key);
console.log('-------------------------------');
//Full private members using WeakMap()

const _diameter = new WeakMap();
const _move = new WeakMap();
const privateProps = new WeakMap();
class Hexa{
  constructor(radius){
    _diameter.set(this, radius);
    //this._diameter = radius ==> under the hood
    // _move.set(this, function(){
    //   console.log('move');
    //   console.log(this); //undefined
    // })
    _move.set(this, _ => {console.log(this)}); //object instance
    //we can define multiple properties instead of individually define it 
    privateProps.set(this, {
      radius: radius,
      start: _ => {
        console.log('starting....');
      }
    });
    //to access 
    privateProp.get(this).radius;
    provateProp.get(this).start()
  }
  
  draw(){
    console.log(_diameter.get(this)); //=> will return the value of this property
    _move.get(this)()
  }
}
const hex = new Hexa(2);
console.log(hex.draw());


//Getters and Setters: in ES6 instead of doing Object.defineProperty(this, 'prop', {get: function(){}}) and so on, we have the set and get keyword that so the same functionalit but simpler , I am gonna copy the code above and try to implement the setter and getter

class Sphinex{
  constructor(radius){
    _diameter.set(this, radius);
    //this._diameter = radius ==> under the hood
    // _move.set(this, function(){
    //   console.log('move');
    //   console.log(this); //undefined
    // })
    _move.set(this, _ => {console.log(this)}); //object instance
    //we can define multiple properties instead of individually define it 
    privateProps.set(this, {
      radius: radius,
      start: _ => {
        console.log('starting....');
      }
    });
    //to access 
    privateProp.get(this).radius;
    provateProp.get(this).start()
  }
  //I am gonna comment out draw that give us access to private properties, and implement get
  /*draw(){
    console.log(_diameter.get(this)); //=> will return the value of this property
    _move.get(this)()
  }*/
  get radius(){
    return _diameter.get(this);
  }
  set radius(value){
    if(value <= 0) throw new Error('invalid radius');
    _diameter.set(this, value);
  }
}
const sp = new Sphinex(2);
console.log(sp.draw());



console.log('-------------------Inheritance------------------');

class Shape{
  constructor(color){
    this.color = color;
  }
  move(){
    console.log('move')
  }
}

class Circle extends Shape{
  constructor(color, radius){
    super(color);
    this.radius = radius;
  }
  draw(){
    console.log('draw');
  }
}

console.log('-------------------Method Overriding------------');
class Shape{
  constructor(color){
    this.color = color;
  }
  move(){
    console.log('move')
  }
}

class Circle extends Shape{
  constructor(color, radius){
    super(color);
    this.radius = radius;
  }
  draw(){
    console.log('draw');
  }
  move(){
    super.move();
    console.log('move circle')
  }
}


```

#### Clutter #########

# Classes

typeof(Circle); //function

```js
class Circle {
  constructor() {
    this.move = function () {};
  }
  //instance method
  draw() {
    console.log("draw");
  }
  //Static method: are not tied to specific object, it's on the class itself, will not be available on object
  static parse(str) {
    const radius = JSON.parse(str);
    return new Circle(radius);
  }
}
const circle = Circle.parse('{"radius": 1}');
```

Classes whether declared of expressioned are not hoisted!

- 'this' keyword

```js
function Circle = function(){
  this.draw = function(){
    console.log(this);
  }
}
const c = new Circle();
//Method call
c.draw(); //Circle {draw: f};
const draw = c.draw;
//Function call
draw(); //Window;
```

we can change this behaviour using 'use strict' -> stop modifying the global object

by default our Classes body are executed using strict mode

- Private members using Symbols
  using primitie type called symbol
  a Symbol is just a unique identifier

```js
const _radius = Symbol();
const _draw = Symbol();
class Circle {
  constructor(radius) {
    this[_radius] = radius;
  }
  //using computer property name
  [_draw]() {
    console.log("supposed to be priavte");
  }
}
const c = new Circle(1);
c._radius; //won't work, however there's a hack around this
const key = Object.getOwnPropertySymbols(c)[0];
console.log(c[key]);
```

- Private members using WeakMaps
  the reason for this to be weak, their keys are weak, if there are no references, they will be garbage collected

```js
const _radius = new WeakMap();
const _movie = new WeakMap();
const priateProps = new WeakMap();
class Circle {
  constructor(radius) {
    privateProps.set(this, {
      property1: () => {},
      property2: value,
    });
    _radius.set(this, radius);
    // _movie.set(this, function () {
    //   console.log("welcome", this);
    // }); because the problem of this rebound to undefined 'strict mode'
    _movie.set(this, () => {
      console.log("welcome", this);
    });
  }
  //to get radius property, we should explicitly do this
  draw() {
    console.log(_radius.get(this));
  }
  anotherDraw() {
    _movie.get(this)();
  }
}
```

we can get access to radius property if we can get access to WeakMap, but when dealing with module we can hide the implementation detail, so we can't get to that WeakMap()

- Getters/Setters

```js
class Circle {
  constructor(radius) {
    _radius.set(this, radius);
  }
  get radius() {
    return _radius.get(this);
  }
  set radius(value) {
    if (value < 0) throw new Error("invalid radius");
    _radius.set(this, value);
  }
}
```

## Books

- Learn Javascript OOP, Nickolas Zakas
- Javascript: The Good parts, Douglas Crockford
- JavaScript Patterns, Stoyan Stefanov
- Effective JavaScript\_ 68 Specific Ways to Harness the Power of JavaScript, David Herman
- Eloquent_JavaScript
- You Don't Know Javascript

-

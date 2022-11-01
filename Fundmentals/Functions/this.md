### Call, apply, bind

```js

// /**
//  * Topic: Arrow functions, this, call, apply, bind
//  */
// const person = {
//     name: "yousef",
//     age: 24,
//     getName: function () {
//         setTimeout(function () {
//             console.log(this); // ??
//             console.dir(arguments)
//         }, 1000, ['welcome', 'hi'], ['meskas']);
//     },
//     getAge: function () {
//         const self = this;
//         setTimeout(function () {
//             console.log(self); // ??

//         })
//     },
//     getSize: function () {
//         setTimeout(() => {
//             console.log(this); // ??
//             console.log(arguments) // ??
//         })
//     },
//     getMe: () => {
//         console.log(this); // ??
//         (function () {
//             console.log(this); // ??
//         })()
//     }
// }


/** Predicting the value of 'this' is not a magic.
 * where the function get executed determine the value of this
 * .getName(); get executed on the person scope.
 * but setTimeout passes a function which that function get exectud on the setTimeout scope [another world for that function]
 * Arrow functions does not create a new scope, neither bind this.
 * so to sum up, what determines the value of this, is where it's being called and how
 */


```

```js
console.log('-----------------this-----------');

function MyFunction(...text: string[]) {
    console.log('Function::', this, text);
}
MyFunction(); // === window.MyFunction() or global.MyFunction(); so this is bind to window.

const obj = {
    func() {
        console.log('Object::', this);
    }
}
obj.func(); //so this is bind to obj.
class MyClass {
    myMethod() {
        console.log(`Class::`, this);
    }
}
const myInstance = new MyClass();
myInstance.myMethod(); // so this is bind to myInstance

// call, apply, bind

MyFunction();

MyFunction.call(obj, 'abc', 'def');
MyFunction.apply(obj, ['abc', 'def'])
MyFunction.call([]);
const bindFunction = MyFunction.bind(obj, 1, 2, 3, 4)
// or bindFunction(1,2,3,4)
bindFunction();

/**

* Call and Apply invokes the function
* Bind does not invoke the function
* Bind return a new brand function with different context
 */

```

---------------------------------------------

```js
// what this allows us to do is to reuse functions with different contexts
// this has 4 rules:
/*
 1. Implicit binding
 2. Explicit binding
 3. new Binding
 4. window binding
*/

// to determine the value of this, ask this question:
// where is this function invoked?
// not where or when it was defined 

let sayName = function (name) { // can you guess the name from here?
 console.log(`hello ${name}`);
}

sayName('omar');

// 1. Implict binding
// when a function is invoked, look at the left of the DOT at Call time
let me = {
 name: "Yousef",
 sayName: function () {
  console.log(this.name);
 }
}

me.sayName();


let sayNameMixin = function (obj) {
 obj.sayName = function () {
  console.log(this.name);
 }
}

let me = {
 name: 'Tyler',
 age: 24
}
let you = {
 name: "Joey",
 age: 21
}

sayNameMixin(me);
sayNameMixin(you);
me.sayName();
you.sayName();

let Person = function (name, age) {
 return {
  name,
  age,
  sayName: function () {
   console.log(this.name);
  },
  mother: {
   name: "stacry",
   sayName: function () {
    console.log(this.name);
   }
  }
 }
}

let jim = Person('jim', 42);
jim.sayName();


// 2. explict binding with [call, apply, binding]
// now sayName is in the global scope
sayName = function (lang1, lang2) {
 console.log('my name is' + this.name + lang1 + lang2);
}

let omar = {
 name: "Omar",
 age: 20
}


let languages = ['Javascript', 'Ruby', 'Python'];
// every function has a .call method that allows to call the function on specific context
sayName.call(omar, languages[0], languages[1]) // now this inside sayName refers to omar
sayName.apply(omar, languages); // instead of passing arguments one by one, you pass it as array of arguments

.bind() // returns us a new function instead of invoking the original function

let newFn = sayName.bind(omar, languages[0], languages[1]);
console.log('HERE')
newFn();



// 3. new binding and window binding

let Animal = function (color, name, type) {
 // this = {};
 this.color = color;
 this.name = name;
 this.type = type;
}

let zebra = new Animal('black and white', 'Zorro', 'Zebra');
// 4. window binding

let sayAge = function () {
 console.log(this.age);
}

let me = {
 age: 25;
}

sayAge(); // this === window


```

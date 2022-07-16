# Some of the internals

## Table of contents

1. Thread of Execution and Call Stack
2. Execution Context and it's phases
3. Scope chaing and Closures

### Execution Context, Scope Chain, Closures

Execution Context has two main phases:

1. Creation phase
2. Execution Phase

```js
b();
console.log(a);

var a = 'welcome'

function b(){
    console.log("b is called")
}
```

```js
function a(){
    b();
    var c;
}

function b(){
    var b;
}

a();
var d;
```

## Closures

Closures: a function that make use of variables defined in outer function that have previously returned

```js
function greet(x){
    return function(name){
        console.log(`${x}, {name}`);
    }
}
let hi = greet('hi');
hi('yousef');
```

```js
function buildFunctions(){
    var arr = [];
    for(var i = 0; i < 3; i++){
        arr.push(function(){
            console.log(i);
        })
    }
    return arr;
}
var fs = buildFunctions();
fs[0]();
fs[1]();
fs[2]();
```

```js
function buildFunctions(){
    var arr = [];
    for(var i = 0; i < 3; i++){
        let j = i;
        arr.push(function(){
            console.log(j);
        })
    }
    return arr;
}
```

using ES5, we can get around this problem

```js
function buildFunctions(){
    var arr  = [];
    for(var i = 0; i < 3; i++){
        arr.push(
            (function(j){
                console.log(j);
            })(i)
        )
    }
    return arr;
}
```

```js
var i;
for (i = 0; i < 5; i++){
    setTimeout(function(){
        console.log(i);
    })
}
```

1. to solve this issue, replace var with let, because `let` is block scope
2. I need another solution which uses es5

```js

for (let i = 0; i < 5; i++){
    setTimeout(function(){
        console.log(i);
    })
}
```

```js
  function outer(){
 let data = 'closures are ';
 return function inner(){
        let innerData = ' awesome'
          return data + innerData;
 }
}
outer()();

function outer(a){
 return function inner(b){
  return a + b;
 }
}
outer(5)(10); //15;
let storage = outer(5);
storage(10);

//the main use of closure is making private variable.
function couter(){
 let counter = 0;
 return inner(){
  return ++couter;
 }
}
let c = counter();
for(let i=0; i< 5; i++){
 c();
}
function classroom(){
 let instructors = ['colt', 'elie'];
 return {
  getInstructor: function(){
   return instructor
  },
  addInstructor: function(instructor){
   instructors.push(instructor);
   return instructors;
  }
 }
}
let course1 = classroom();
course1.getInstructor();
course1.addInstructor('yousefmeska');
course1.getInstructor();
```

```js
let app = (function(){
    let carId= 123;
    let getId= function(){
        return carId; //we access the parent function variable from inside the child function
    }
    return {
        getId: getId //now we assign key called getId with value of reference to getId function, we must refernce somehow the child function and connect it with the parent to get access to it
    };
})();
console.log(app.getId);
```

## Resources

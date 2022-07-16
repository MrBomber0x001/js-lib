
## Mixins

```js
/* a simple example of a mixin
mixins are oftern used to extend an object functionalites while  avoiding the need of  inheritance 
function mixin(receiver, supplier){
    for(let prop in supplier){
        if(supplier.hasOwnProperty(prop)){
            receiver[prop] = supplier[prop];
        }
    }
}

let supplier = {
    name: 'yousef', 
    age: 21,
    getAge: function(){
        console.log(age);
    }
}
let receiver = {};
mixin(receiver, supplier);
console.log(receiver); */

//A detailed example to get the idea
function EventTarget() {}

EventTarget.prototype = {
  addListener: function (type, listener) {
    //create an array if doesn't exist
    if (!this.hasOwnProperty("_listeners")) {
      this._listeners = [];
    }
    if (typeof this._listeners[type] === "undefined") {
      this._listeners[type] = [];
    }
    this._listeners[type].push(listener);
  },
  fire: function (event) {
    if (!event.target) {
      event.target = this;
    }
    if (!event.type) {
      throw new Error('Event Object missing "type" property');
    }

    if (this._listeners && this._listeners[event.type] instanceof Array) {
      var listeners = this._listeners[event.type];
      for (let i = 0, len = listeners.length; i < len; i++) {
        listeners[i].call(this, event);
      }
    }
  },
  removeListeners: function (type, listener) {
    if (this._listeners && this._listeners[type] instanceof Array) {
      var listeners = this._listeners[type];
      for (let i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] == listener) {
          listeners.splice(i, 1);
          break;
        }
      }
    }
  },
};

var target = new EventTarget();
target.addListener("message", function (event) {
  console.log("message is " + event.data);
});
target.addListener("age", function (event) {
  console.log("your age is " + event.data);
});
target.fire({
  type: "age",
  data: 21,
});
target.fire({
  type: "message",
  data: "hello world",
});

console.log(target);

//if you want to have a different type of object that also support EventTarget
//firt approach:
var person = new EventTarget();
person.name = "yousef";
person.sayName = function () {
  console.log(this.name);
  this.fire({ type: "namesaid", name: this.name });
};
//second alternative approach:
function Person(name) {
  this.name = name;
}
Person.prototype = Object.create(EventTarget.prototype, {
  constructor: Person,
  sayName: function () {
    console.log(this.name);
    this.fire({ type: "namesaid", name: this.name });
  },
});

const person = new Person();
console.log(person instanceof Person); //true
console.log(person instanceof EventTarget); //true

//third alternative and simpler approach: here there is no inheritance
function Person(name){

}
mixin(Person.prototype, new EventTarget());
mixin(Person.prototype, {
    constructor: Person, 
    sayName: function(){
        console.log(this.name);
        this.fire({type: "namesaid", name: this.name})
    }
})
let person = new Person('meska');
console.log(person instanceof Person); //true, 
console.log(person instanceof EventTarget); //false: //very important to know 

//fourth but related to third approach is to simplify the code above on just one single step 
//in this example a new EverntTarget instance is mixed with some new properties to create the person object without affecting the person' prototype chain 
//now person prototype is dierctly the Object()
let person = mixin(new EventTarget(), {
    name: 'meska',
    sayName: function(){
        console.log(this.name);
        this.fire({type: 'namesaid', name: this.name});
    }
})
console.log(person instanceof Object); //true
console.log(person instanceof EventTarget); //false


//look for this dangrous example
let person = mixin(new EventTarget, {
  get name(){
    return 'nicholas';
  },
  sayname: function(){
    console.log(this.name);
    this.fire({type: 'namesiad', name: name});
  }
});
console.log(person.name); //nicholas
person.name = 'yousef';
console.log(person.name); //yousef, see! a werid behaviour, name must not be changed 

//if you want an accessor property to be copied as an accessor property not a data property , you need a different mixin functionality 
function mixin(receiver, supplier){
  Object.keys(supplier).forEach(function(property){
    var descriptor = Object.getOwnPropertyDescriptor(supplier, property);
    Object.defineProperty(receiver, property, descriptor);
  });
  return receiver;
}
let person = mixin(new EventTarget, {
  get name(){
    return 'nicholas';
  },
  sayname: function(){
    console.log(this.name);
    this.fire({type: 'namesiad', name: name});
  }
});
console.log(person.name); //nicholas
person.name = 'yousef';
console.log(person.name); //nicholas 
```

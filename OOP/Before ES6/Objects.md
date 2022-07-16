
# Objects

In this section we're going to deal with object literals

#### Defining Properties

There are two main ways to create objects:

- object literals
- Object constructor

Objects on javascript are dynamic, they are open for modification unless you specifiy otherwise (more on that later)

```js
var person1 = {
  name: "Yousef",
  sayName: function () {
    console.log(this.name);
  },
};

var person2 = new Object();
person2.name = "Meska";

person1.age = 22;
person2.age = 45;
```

\*\* What happens when we add properties to objects? 🤔

Javascript uses an **internal method** called [[Put]] on the object which not only specifiy the initial value, but also some attributes of the Property.
so on the previous code, when age and name are first added, [[Put]] method are invoked for each one, the result of calling [[Put]] is the creation of of an **own property**
Own properties are the properties that indicates that the specific instance of the object owns that property (the property is stored directly on the instance);

When a new value is assigned to an existing property, a ­separate oper-
ation called [[Set]] takes place. This operation replaces the current value
of the property with the new one.

#### Detecting properties

The best way to detect the existance of a property on an object is by using **in** operator, but before going any further, why not doing so

```js
if (person1.age) {
  //do something
}
```

Because an object property can contain one of these falsy values and the condition will not be executed, even if the property exist!

**in** The in operator looks for a property with a given name in a specific
object and returns true if it finds it

```js
console.log("name" in person1); //true
console.log("sayName" in person1); //true
```

sometimes you need to check for a given property whether it is an own property or prototype property, unfortunately **in** can't help you doing so, because it checks for both own and prototype properties on a given object, so we need another solution

**hasOwnProperty()** method come into place and it's present on all objects

```js
console.log("toString" in person1); //true
console.log(person1.hasOwnProperty("toString")); //false;
```

#### Removing properties

setting a property value to null, doesn't remove it instead replacing it's value to null
**delete** operator:
The delete operator works on a single object property and calls an
internal operation named [[Delete]]

```js
delete person1.name;
```

#### Enumeration

By default, all newly added properties to an object are enumerable, which means that you can iterate ober them using for-in loop

Enumerable properties have their internal [[Enumerable]] attributes set to true

iterating over enumerable properties in an object

```js
var property;
for (property in object) {
  console.log("Name: " + property);
  console.log("Value: " + object[property]);
}
```

what happens here is that for every iteration, the **property** variable is filled with the next enumerable property on the object until all such properties have
been used.

let's see mimic this for-in loop in ECMAScript5 using Object.keys() which retrieve the enumerable properties from an object

```js
var propertes = Object.keys(object);

for (var i = 0; (len = properties.length); i++) {
  console.log("Name: " + properties[i]);
  console.log("Value: " + object[properties[i]]);
}
```

\*\*note 🔥 :
There is a difference between the enumerable properties returned in a f ­ or-in loop
and the ones returned by Object.keys() . The for-in loop also enumerates prototype
properties, while Object.keys() returns only own (instance) properties

not all properties are enumerable, in fact the most majority of properties present on an object are non enumerable, we can check this by using **propertyIsEnumerable** method which is present on every object

```js
console.log("name" in person1); // true
console.log(person1.propertyIsEnumerable("name")); // true

var properties = Object.keys(person1);
console.log("length" in properties); //true
console.log(properties.propertyIsEnumerable("length")); //false
```

#### Types of properties

there are two main types of properties:

- Data property: contains a value
- accessor property: doesn't contain a value, but instead define a function to call when the property is read and a function to call when the property is written to (getter/setter)

```js
var person1 = {
  _name: "yousef",

  get name() {
    console.log("reading a name");
    return this._name;
  },
  set name(value) {
    console.log("setting the name to %s", value);
    this._name = value;
  },
};

console.log(person1.name); //'reading a name then 'yousef'
person1.name = "meska";
console.log(person1.name); //setting the name to meska then meska;
```

the \_ is used common convention to indicate that the property is considered to be private, though in reality it is still public

When to use accessor property? 🤔

- when you want the assignment of a value to trigger some sort of behavior
- when reading a value requires the calculation of the desired return value

note 🔥:
you can specifiy either one of them (get or set) or both of them but
when specifiying only get, the property becomes read only
and when specifiying only set, the property becomes write only

### Property attributes

Before ECMAScript5 was born, there was no way to specify whether a property
should be enumerable, In fact, there was no way to access the internal
attributes of a property at all.
In this section we're going to cover🔥

- Common attributes
- Date propterty attributes
- Accessor Property Attributes
- Defining Multiple properties
- Retrieving Property Attributes

#### Common Attributes

There are two property attributes shared between data properties and accessor propterties which are

- [[Enumerable]]:
- [[Configurable]]: determines which the property can be changed or not

those are the internal attributes which we can use later but without [[]] to change the behaviour of of property using **Object.defineProperty()** method
it accepts three arguments:

- object that owns the property,
- the property name
- property descriptor object containing the attributes to set

```js
var person1 = {
  name: "Yousef",
};
Object.defineProperty(person1, "name", {
  enumerable: false,
});
console.log("name" in person1); //true
console.log(person1.propertyIsEnumerable("name")); //false
var properties = Object.keys(person1);
console.log(properties.length); //0
// true
// false
// 0
Object.defineProperty(person1, "name", {
  configurable: false,
});
// try to delete the Property
delete person1.name;
console.log("name" in person1); //true
console.log(person1.name); //"Yousef"
Object.defineProperty(person1, "name", {
  // error!!!! wat? why?
  configurable: true,
});
```

In the last piece of code when we try to convert nonconfigurable property to configurable property, this throws an error, but why? 🤔

note 🔥
you can’t make a
nonconfigurable property configurable again

#### Data Properties Attributes

We have two additional attributes:

- [[Value]]: which holds the value of property, even if it's a function
- [[Writable]]: which is a Boolean value indicating whether the property can be written to

```js
var person1 = {};
Object.defineProperty(person1, "name", {
  value: "Nicholas",
  enumerable: true,
  configurable: true,
  writable: true,
});
```

Tip 📘:
when defining properties using Object.defineProperty(), you should explicity define Boolean values to true, otherwise it will be false by default

#### Accessor Properties Attributes

We have here two additional attributes [[Get]] and [[Set]] which contains the setter and getter function
and ofcourse there's no need for [[Value]] and [[Writable]] here as you might have noticed before

##### Why would I need to define setter or getter using Object.defineProperty()? 🤔

that you can also define
those properties on existing objects, If you want to use object literal nota-
tion, you have to define accessor properties when you create the object

##### note 🔥

As with the object literal form
of getters and setters, you need only define one of these attributes to
create the property.
If you try to create a property with both data and accessor attributes, you will get
an error.

```js
var person1 = {
  _name: "Yousef",
};
Object.defineProperty(person1, "name", {
  get: function () {
    console.log("Reading name");
    return this._name;
  },
  set: function (value) {
    console.log("Setting name to %s", value);
    this._name = value;
  },
  enumerable: true,
  configurable: true,
});
```

notice that get and set are two special keywords

#### Defining Multiple Attributes

We can define mutiple properties with multiple attributes using Object.defineProperties()

```js
var person1 = {};
Object.defineProperties(person1, {
  // data property to store data
  _name: {
    value: "Yousef",
    enumerable: true,
    configurable: true,
    writable: true,
  },
  // accessor property
  name: {
    get: function () {
      console.log("Reading name");
      return this._name;
    },
    set: function (value) {
      console.log("Setting name to %s", value);
      this._name = value;
    },
    enumerable: true,
    configurable: true,
  },
});
```

#### Retrieving Properties Attributes

We can retrieve Property attributes using Object.getOwnPropertyDescriptor() which returns an object containing the attributes

```js
var descriptors = Object.getOwnPropertyDescriptor(person1, name);
console.log(descriptors.value);
console.log(descriptors.configurable);
console.log(descriptors.enumerable);
console.log(descriptors.writable);
```

### Preventing Object Modification

Objects, just like properties, have internal attributes that govern their
behavior. One of these attributes is [[Extensible]] , which is a Boolean
value indicating if the object itself can be modified
in this section we're going to cover🔥

- Preventing extension
- Sealing Objects
- Freezing Objects

#### Preventing Extensible Objects

we can prevent new properties from being added by setting [[Extensible]] to false using Object.preventExtensions()

```js
var person1 = {
  name: "Yousef",
};
console.log(Object.isExtensible(person1)); // true
Object.preventExtensions(person1);
console.log(Object.isExtensible(person1)); // false
person1.sayName = function () {
  console.log(this.name);
};
console.log("sayName" in person1);
```

#### Sealing Objects

Sealed object: is an object which is nonextensible and all it's properties are nonconfigurable
we do this by using Object.seal()

we can only read and write to

```js
var person1 = {
  name: "Yousef",
};
console.log(Object.isExtensible(person1)); // true
console.log(Object.isSealed(person1)); // false

Object.seal(person1);
console.log(Object.isExtensible(person1)); //false
console.log(Object.isSealed(person1)); // true
person1.sayName = function () {
  console.log(this.name);
};
console.log("sayName" in person1); // false

person1.name = "Meska";
console.log(person1.name); // "Meska"
delete person1.name;
console.log("name" in person1); //true
console.log(person1.name); // "Meska"
var descriptor = Object.getOwnPropertyDescriptor(person1, "name");
console.log(descriptor.configurable); //false
```

#### Freezing Objects

Frozen objects can't be unfrozen 🙂, so be carefull!
a frozen object is a sealed object where data properties are also read-only
we have two methods Object.freeze() and Object.isFrozen()

```js
var person1 = {
name: "Yousef"
};
console.log(Object.isExtensible(person1));// true
console.log(Object.isSealed(person1)); // false
console.log(Object.isFrozen(person1)); // false


Object.freeze(person1);
console.log(Object.isExtensible(person1));  // false
w console.log(Object.isSealed(person1)); // true
console.log(Object.isFrozen(person1)); // true


person1.sayName = function() {
console.log(this.name);
};
console.log("sayName" in person1); // false
x person1.name = "Meska";
console.log(person1.name); // "Yousef"
delete person1.name;
console.log("name" in person1);
console.log(person1.name); // "Yousef"
var descriptor = Object.getOwnPropertyDescriptor(person1, "name");
console.log(descriptor.configurable); // false

console.log(descriptor.writable); // false
```

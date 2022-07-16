---
layout: post
title: Typescript in Depth
subtitle: Learn to use Typescript features in depth
cover-img: /assets/img/cover.jfif
thumbnail-img: /assets/img/t-sql.jpg
share-img: /assets/img/path.jpg
tags: [js]
---

### Table of Content

- Fundmentals
  - number
  - string
  - boolean
  - any (avoid using it as much as you can)
  - implict [infere typing i.e const] vs explict typing
  - void (has no returning value at all, either for values, or functions)
  - never (commonly with errors)
  - null and undefind (it's better to enforce strictNullChecks)
  - union types (tell typescript choose one of these types) | | |
  - function type with optional parameter and default parameter[Function keyword or using signature [you don't have to follow the same names for parameters list]]
  - object
  - arrays
  - tuples
- type alias, type assertion
- enum, inline members
- generics
- interface and with extends
- class with access modifiers, setters and getters, extends, abstract, implements, static
- this, call, apply, bind, arrow function
- Lexical Scope and Arrow function
- Type Query
- Type Safe Checking using keyof and extends (Important)
- Map Types: Partial Type
  - Required Map Type
  - PickMapped Type
- Record Type
- Type Guard
- Instance of Type Guard
- User Defined Type Guard
- Literal Type Guard and the in operator
- Intersection types
- Discimniated Unio Types
- Interfaces vs Type Aliases
- Generic
- Function Overload
- Declaration files
- Augmenting modules
- Promise
- namespaces (how with Express is applicable (use-cases))

- type guards
- type aliases
- Recursive types
- Interfaces
- Parameter Type Annotations
- Union types
- Type Aliases & Extends
- Type Predicates
- Generics

- [ ] Duck Typing
- [ ] Type Assertion
- [ ] Type Alias
- [ ] Enums and It's cases
- [ ] Types & Interfaces
- [ ] never & void
- [ ] Union types and Tuples
- [ ] Class
- [ ] `this` and type checking
- [ ] Lexical Scoping and Arrow functions
- [ ] `typeof` and `keyof`
- [ ] Generics
- [ ] Asyncronous Javascript

### Duck Typing

### this and type checking

```js
const elem = document.querySelector(".click");

// event is still the first element.
function handleClick(this: HTMLAnchorElement, event: Event) {
    event.preventDefault()
    console.log(this);
    console.log(this.href)
}

elem?.addEventListener('click', handleClick, false);

```

### Lexical Scoping and Arrow functions

```js
class MyClass {
    myMethod() {
        const foo = 123;
        const that = this;
        console.log('1', this);
        setTimeout(function () {
            console.log('2', this);
            console.log('3', that)
        }, 2000)

        setTimeout(() => {
            console.log('4', this);
        }, 3000)
    }
}
const instance = new MyClass();
instance.myMethod();
```

### typeof & keyof

#### typeof

helpful when using third-party libraries

```js
    console.log(typeof myFunc(param))
```

`null` and `Promise` will return as `object` type

**type query using typeof**

```js
const person = {
    name: 'yousef',
    age: 22
}

// getting the the type of person which is {name: string; age: number;}
type Person = typeof person;
const anotherPerson: Person = {
    name: 'john',
    age: 30
}
const anotherPersonn: typeof person = {
    name: 'xx',
    age: 22
}

// Javascript
typeof person // 'object'
```

#### keyof

```Js
let person = {
    name: "Yousef",
    age: 24
}

type Person = typeof person;
type PersonKeys = keyof Person;
type PersonTypes = Person[PersonKeys];

function getProperty(){
    
}
```

### Asyncronous Typescript

- async/await always return a promise

- use **Promise<type>** to set the type returned

```js
const myFunc = async(): Promise<void> => {
    const result = await asyncFunc();
    console.log(result);
}
```

### Resources

After finishing, read REST API with Typescript from Toptal [and apply for TopTal].

### CRAP

#### Typescript Classes

just like js classes, but with two differences

1. constructor variable are defined outside

2. introduces access modifiers

```js
class Teacher {
    garde: number;
    constructor(grade: number){
    this.grade = grade;
}
}
```

**Access Modifiers**

on js, we use `setters and getters` to restrict access to variables

on ts, we use `private` and `protected`

on other languages like c#, c++, java, variables valuea are truly private when using acess modifiers

on ts or js, properties' values cannot be accessed but can be viewed

`number` on classes are public by default, but we can mark them explicitly

`private` members cannot be accessed outside the class

`protected` members can be accessed from the parent or child class

```ts
class Student{
    protected studentGrade: number;
    private studentId: number;
public constructor(grade: number, id: number){
    this.studentGrade = grade;
    this.studentId = studentId;
}
id(){
    return this.studentId;
}
}
class Graduate extends Student {
    studentMajor: string
    public constructor(grade: number, id: number, major: string){
    super(grade, id);
    this.studentId = id; // Typescript error, private member can only be accessed from the parent class
    this.studentGrade = grade; //accessible because grade is protteced
    this.studentMajor = major;
}

}
const myStudent = new Gradudate(3, 1234, 'computer science');
console.log(myStudent.id()); //1234
myStudent.studentId = 1235; //Typescript error
console.log(myStudent.id()); //1235 ? wat???? remember not actually private xD
```

**Factory function**

- used in js to return new objects

- in ts create an interface and use the interface as the return type

```ts
interface Student{
    name: string;
    age: number;
    greet(): void;
}
const studentFactory= (name: string, age: number: Student) => {
    const greet = (): void => console.log("hello");
return {name, age, greet};
}
const student1 = studentFactory("Hana", 16);
```

**Generics and async typescript**

- generics are component (reusable) that you might use couple of times on your application **but with different types**

- this allow us to use **generic types as parameters**

- used angle bracket syntax <T> where the T is the type parameter

let's say we have to create a function that returns a second item on the array, it might be string, or number

```js
const getItemString = (arr: string[]): string => {
    return arr[1];
}
const getItemNum = (arr: number[]): number => {
    return arr[1];
}
const getItem = (arr: string[] | number[]): number | string => {
    return arr[1];
}
```

it's obvious we wrote a hell lot of code to this simple task, but we can optimize it using `Generics`

```ts
const getItemString = <T>(arr: T[]): T => {
    return arr[1];
}
getItem(['cat', 'dog']); // 'dog';
getItem([5, 6]); // 6
// If we need to ensure our function will return a number
getItem<number>([5,6])
```

**Integrating Typescript with third-party libs**

@types/dependency-name Or

```ts
// dropRight in use 
// dropRight takes in an array and then the amount of numbers to drop as arguments
console.log(_.dropRight([1, 2, 3, 4, 5], 2));
console.log(_.dropRight(['cat', 'dog', 'rabbit', 'horse'], 1));

// dropRight type definition
dropRight<T>(array: List<T> | null | undefined, n?: number): T[];
```

sometimes there are packages that comes with no type definitions, and to reduce erorrs you should explicitly define it

```bash
mkdir types 
cd types & mkdir 3rdparty
touch index.d.ts
```

but inside tsconfig.json, uncomment "typeRoots": ["./types"]

**Dos and Don'ts with typescript**

Typescript configuration best practice

- it's always best practice to use `noImplicitAny`

- set `strict` to `true`

when to use Implicit typing?

- when using const, because the value is immutable, so the type won't change

- single line arrow function

- function with controlled input

when to use explicit?

- long function

- let

**Migrating to Typescript**

1. look at the project structure (Monolith or Microervices)

2. Decide whether to migrate all at once or file-by-file

in case of monolith:

- Migrate to `src/dist` architecture to keep woeking folders seperate from compiled javsacript

- use configuration file tp exclude folders that shoulld not be migrated

- don't forget to add type definition for third party libs

- set `allowJs` to true, this allows for compiling js extenstion also

-------------------------------

```bash
tsc --outDir dist
tsc --watch
```

why favor using webpack over tsc directly?

lesson 5 -> problem with running webpack-dev-server

it's common that most programmers document parameters

```js
/**
 * @param {number} num - the number to convert to string
 * @returns {string} `num`, converted to string
 */
function toString(num: number): string{
    return String(num);
}
```

Babel compile js => js
Typescript compiles ts => js

Don't overdo generics and type variables for more simplicitly

/*Enum: data type*/
Enum uses reverse mapping!
by default we get numeric values from enum
we can use the numerical lookup to get the string value
or use the string lookup to get the numeric value
let's say we have an enum

```ts
enum Sizes = {
    Small, 
    Medium,
    Large
}
console.log(Sizes.Small, Sizes[Sizes.Small]); //reverse mapping
```

what if we need to extend this enum later on without returning to the original one?
we can redeclare it but, one important thing, you need to specifify an index because you are not starting from zero anymore

```ts
enum Sizes = {
    ExtraLarge = 3;
}
const selectedSize = 3;
console.log(Sizes[selectedSize]);
```

we've talked the default [using numeric enum] now we are going to use string enum
but there is no reverse mapping here!

```ts
enum Sizes {
  Small = 'small',
  Large = 'large'
}

let selected: Sizes = Sizes.Small;
console.log(selected)
function updateSize(size: Sizes){
  selected = size;
}
updateSize(Sizes.Large);
console.log(selected);
```

we can use inline member to reduce code generated by the compiler when using enum  just by adding const before the enum

```ts
const enum Size {

}
```

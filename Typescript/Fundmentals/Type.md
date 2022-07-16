### Type Assertion

what if we don't know the type: maybe it' assigned dynamically or not sure of the content type

- similar to *typecasting* in other languages, but in the other languages it actually affect the type value

- does not affect the value in js- just allow you to pass an unknown type as a string  into a parameter that only accept string

- Two syntaxes:
  
  - as keyword

    ```js
    const myVar = (req.query.param as unknown) as string;
    ```
  
  - angle bracket notation

    ```js
    const myVar = <string>(<unknown>req.params.param)
    ```

--------------------------

You can think of it as casting.

```js
type Pizza = { name: string, toppings: number };
const pizza: Pizza = { name: "Meska", toppings: 3 };
const serialized = JSON.stringify(pizza);
console.log(serialized);
function getNameFromJSON(obj: string) {
    return (<Pizza>JSON.parse(obj)).name; // or the new method r
    return (JSON.parse(obj) as Pizza).name
}
console.log(getNameFromJSON(serialized));
```

### Type Alias

Instead of attaching type directly to the variable when creating it, use a placeholder
Type alias is not going to be compiled down to vaniall js, it's a virtual [concept].

```js
type Size = 'small' | 'large' | 'medium';
type Callback = (size: Size) => void;
let selectedSize: Size = 'small';
let selectSize: Callback = (x) => {
    selectedSize = x;
}
selectSize("large")
```

<b> Type alisas</b>

does not create new types, just rename it

can be used with primitive type for documentation

`type Name = string;`

works with unions and tuples

   `type Input = string | number; type Coord = [number, number];`

we can use for Typing Objects, just like `interfaces` but once it's used it cannot be changed

- not open for new Fields

```ts
type Student = {
    name : string;
    age: number
}
```

- Extendable
  
  ```ts
  Type phD = Student & {
      field: string;
  }
  const stud: PhD = {name: 'Harvey', age: 42, field: 'clinical psychology'}
  ```

`Duck typing` is also avaiable here

### Type & Interface

Interface is blue print for objects, it can be used to create function but this is not quite common seen

you can declare that interface a second time and add additional properties to it

- Prefered type for objects

- Extendable

- Open for adding new fields

- Use PascalCase for names

```js
interface Student{
    name: string,
    age: number;
enrolled: boolean
}
const stud2: Student {
    name: 'kara', age: 18, enrolled: false
}
```

=> What's difference type vs interface? and what's the perfect usage [when to use perfectly]?

Interface is a special type in typescript, allow us shape the structure of partivualr objectwe can get extended feature using interfaces over types. [will be discussed later]
Interfaces is virual also like type, it's not going to be compiled down
we can compose interfaces together, or extending [inheriting]

```ts
interface Pizza {
    name: string;
    sizes: string[];
    getAvaibleSizes(): string;
}
interface Pizzas{
    pizzas: Pizza[];
}
let pizza: Pizza;

type getAvaibleSizes = () => string[];
function createPizza(name: string, sizes: string[]): Pizza {
    return {
        name, 
        sizes,
        getAvaibleSizes(){
            return this.sizes;
        }
    } // or as Pizza
}
pizza = createPizza("Pepporin", ["small", "medium"])
```

**Dynamic Properties**
if we need to use a dynmaic property that does not exist on the interface like `person['xyz'] = 'some value'`,
what we can do is define this structure also on the interface

```ts
interface Size {
    
}
interface Pizza extends Size{
    name: string;
    getAvaibleSize(): string;
    [key: number]: string;
    [key: string]: any
}

let pizza: Pizza;
pizza[1] = 'yousef'
pizza['xyz'] = 'meska';

```

#### Extending Interface is Like Extending Classes

Extending interfaces is much like extending classes, and reduce more typing

```js
interface Undergrad extends Student {
    major : string
}
const stud: Undegrad ={
    name: "Kim",
    age: 18,
    enrolled: true,
    major: "chemisry"
}
```

Interfaces are based on `Duck Typing`

> if it walks like a duck and it quacks like a duck, then it must be a duck

- interfaces define the shape of an object using types

- an object that matches those types must be valid!

what does this mean if I have two interfaces having the same shape and passed one of those to a function that it's parameter accept one of them, they are both are gonna work

```js
function myFunc(person: Student): void => {
    console.log(person)
}

interface Student{
    name: string,
    id: number
}
const yousef: Student {
    name: "Yousef",
    id: 3434
}
myFunc(yousef) ;// will work
interface Teacher{
    name: string,
    id: number
}
const myTeacher: Teacher = {
    name :"Dr. Alex",
    id: 343
}
myFunc(myTeacher); //will work also
```

since myTeacher walks and quacks like the Student interface, it's duck or in this case a student

**Optional Properties**

Create by adding `?` after the property name - `propName?`

Allow you to include properties that are aviable but not requird

prevent use of properties that are not part of the interface

```js
interface Student{
    course?: string
} // we used the same interface we created before to add the optional property
const student2: Stuent{
    name: "sds", age: 23,
    enrolled: true, course: "math"
}
```

**readonly properties**

can be only modifed when first created

`readonly propName`

```js
interface Student{
    course?: string,
readonly id: number
}
const stud2: Student {
    name: "yfdf",
age: 13, enrolled: false, course: 'math', id: 3434
}
stud2.id = 3434 // throws readonly error
```

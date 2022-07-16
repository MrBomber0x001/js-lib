
### Generics

a way to create a dynamic type
**Generic**: a way to write a function that is reusable across different types

you can think of *Generics* as an `any` type, but a more defined and strict one.

we can define the value at the point of call
so we don't care about hard coding a particular type

```js
let arr: number[] is shorthand for let arr: Array<number> generic
```

```ts
class Pizza {
    constructor(private name: string, private price: number) {

    }
}
class Coupon {
    constructor(private price: number) {

    }
}
class List<T> { // passing the dynamic type down to the class
    public list: T[] = []; 
    addItem(item: T): void {
        this.list.push(item);
    }
    getList(): T[] {

        return this.list;
    }
}
const list = new List<Pizza>(); // here out list is a list of Pizzas only
for (let i = 0; i < 10; i++) {
    list.addItem(new Pizza(`mesk_${i + 1}`, i + 1))
}
list.addItem(new Pizza("meska", 14)); // right
list.addItem({ coupon: 'pizza25' }) // error
list.addItem(new Coupon(13)); // error

const pizzas = list.getList();
console.log(pizzas)

const anotherList = new List<Coupon>(); 
anotherList.addItem(new Coupon("Pizzas25")) // right
anotherList.addItem(new Pizza("name", 24)); // error
```

To Demonstrate the benfit from using `generics` we are going to introduct `function overloading`

#### Function Overloading

We benefit from function overloading when it comes to create a utility functions that typically return a different data structure based on the argument you supplied

> we are providing different implementation to the same utility functions. and we ge the benefit from using a generic type

```js
/* 
* Declaring the different type the function will return as function overloading
*/
function reverse(str: string): string;
// function reverse(arr: any[]): any[];
function reverse<T>(arr: T[]): T[];

/**
 * @desc the actual body
 * @param stringOrArray 
 * @returns 
 */
function reverse(stringOrArray: string | any[]): string | any[] {
    if (typeof stringOrArray === "string") {
        return stringOrArray.split(" ").reverse().join();
    }
    return stringOrArray.slice().reverse(); // to avoid mututing using reverse() only
}

// Arrays and objects are passed by reference, to avoid mutating the original one, choose the methods 
// which are mututing
reverse("yousf");
reverse(["yousef", "ahmed", "abdo"]);
```

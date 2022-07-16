
### Class

**Access Modifiers**

access modifiers don't get compiled down to js, because it's only on typescript world<br>
access modifiers are applicable to methods and properties
`public`, `private`, `readonly`, `protected`

```ts
class Pizza {
    name: string;
    toppings: string[] = [];
    constructor(name: string){
        this.name = name;
    }
    public addTopping(topping: string){
        return this.toppings.push(topping);
    }
    private listToppings(){
        return this.toppings;
    }
}
let pizza = new Pizza("Meska");
pizza.addTopping("welcome");
```

if you don't specify `public` it will be the same.

For `private properties` we can do this

```ts
class Pizza {
    private toppings: string[] = [];
    constructor(private name: string, readonly age: number){};
    public addTopping(topping: string){
        return this.toppings.push(topping);
    }
    private listToppings(){P
    
        return this.toppings;
    }
}
```

**Setters and Getters**
Setters and Getters are always public.

```ts
class Sizes {
    constructor(public sizes: string[]){}
    set avSizes(sizes: string){
        this.sizes = sizes;
    }
    get avSizes(){
        return this.sizes;
    }
}
let sizes = new Sizes(['small', 'large']);
sizes.avSizes = ['sm', 'lg', 'xlg']; // invoke setter
console.log(sizes.avSizes); // invoke getter

```

In plain old js this was approached by

```js
var Sizes = (function(){
    function Sizes(sizes){
        this.sizes = sizes;
    }
    Object.defineProperty(Sizes.prototype, "avSize", {
        get: function(){
            return this.sizes;
        },
        set: function(sizes){
            this.sizes = sizes;
        },
        enumerable: true,
        configurable: true
        
    })
    return Sizes
})()
```

**Inheriting From Base Class**

```ts
class Sizes {
    constructor(public sizes: string[]) { }
    set availableSizes(sizes: string[]) {
        this.sizes = sizes;
    }
    get availableSizes() {
        return this.sizes;
    }
}

class Person extends Sizes {
    toppings: string[] = [];
    constructor(private name: string, public sizes: string[]) {
        super(sizes);
    }
    addTopping(topping: string) {
        this.toppings.push(topping);
    }
}

let y = new Person('yousef meska', ['x', 'l']);
console.log(y.availableSizes);
```

well, altought this approach is working, but one thing is not fully controlled
we still can instantiate from Sizes class, and we don't need this behaviour

```ts
new Size(['small', 'large']);
```

the solution is
**Abstract Class**
A class we can inherit from, and cannot instantiate from.

```ts
abstract class ClassName{}
```

what if we need to access sizes to update it from Person class, if sizes was private on Sizes class?
`protected` comes into play, the ability to access private member when we extend a class

```ts
class Sizes {
    constructor(protected sizes: string[]){}
}
```

**Interface with Classes**
we can't create specific describtion for setters and getters, but the function itself can be, we can just describe that those properties are avaiable.

```ts
interface SizesInterface{
    size: string[]; // this would generate an error, since size is protected member
    availableSi zes: string[]; // the correct way
    availableSizes(): string[]; // this would generate an error
}
```

🔺a quick note:
if you've a `protected` or `private` member on your class, you can't add it on interface, you can use `readonly`

```ts
abstract class Sizes implements SizesInterface{

}

```

We've extended class Pizza from Sizes, so some of the properties on Pizza Comes from Sizes, so we can extend interface too

```ts
interface PizzaInterface extends SizesInterface{
    readonly name :string; // removing 'readonly' key word will not affec anything, but for type safey it's there
    topping: string[];
    updateSize(sizes: string[]): void;
    addTopping(topping: string): void;
}
```

**Static Properties and Methods**

```js
class Coupon {
    static allowed = ['xff454', '54fgf'];
    static create(precentage: number): string{
        return `PIZZA_COUPON_${precentage}`
    }
}
```

**Combining it all together**

```js
interface SizesInterface {
    availableSizes: string[];
}
abstract class Sizes implements SizesInterface {
    constructor(protected sizes: string[]) { }
    set availableSizes(sizes: string[]) {
        this.sizes = sizes;
    }
    get availableSizes() {
        return this.sizes;
    }
}

interface PizzaInterface extends SizesInterface {
    readonly name: string;
    updateSizes(size: string[]): void;
    addTopping(topping: string): void;
}

class Pizza extends Sizes implements PizzaInterface {
    toppings: string[] = [];
    constructor(readonly name: string, sizes: string[]) {
        super(sizes);
    }
    addTopping(topping: string) {
        this.toppings.push(topping);
    }
    updateSizes(sizes: string[]) {
        this.sizes = sizes;
    }
}

let y = new Pizza('yousef meska', ['x', 'l']);
console.log(`first ${y.availableSizes}`);
y.updateSizes(['hghg', 'hghg'])
console.log(`second ${y.availableSizes}`); // still 'x', 'l'
```

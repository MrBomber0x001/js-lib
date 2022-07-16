
### Enums and it's cases

By Default we get numeric values from enum and we can lookup using string lookup or numeric lookup, it works the two ways!
But this not always the case, we can customize enum to use anythin instead of numerics

```js
enum Sizes {
    Small,
    Large,
    Medium
}
console.log(Sizes.Small, Sizes[Sizes.Small]);
```

Enum follows `reverse_mapping` technique

```js
// reverse mapping in simple terms
let names = 'yousef,mahmoud,meska';
let arr = [];
let counter = 0;
names.split(',').map((item) => {
    arr[arr[item] = counter++] = String(item);
})

console.log(arr);
console.log(arr[0]);
console.log(arr['yousef']);
```

we can also *extend* enum

```js
enum Sizes {
    ExtendedLarge = 3
}
```

Using String Enums, we can't use #reverse_mapping

```js
enum Sizes {
    Small = 'small',
    Large = 'large'
}
let selectesSize: Sizes = Sizes.Large;
function updateSize(size: Sizes): void {
    selectedSize = size;
}
updateSize(Sizes.Small);
```

If we take a closer look at the compiled typescript file, we will see

```js
var Sizes;
(function(Sizes){
    Sizes["Small"] = "small";
    Sizes["Large"] = "large";
})(Sizes || (Sizes = {}));
let selectedSize = Sizes.Large;
function updateSize(size){
    selectedSize = size;
}
updateSize(Size.Small);
```

To avoid this generated code, we could use **inline enum members**
By adding *const* before enum declaration

```js
const enum Sizes {
    ...the code 
}
```

the generated js code will be

```js
let selectedSize = "large" /* Large */;
function updateSize(size) {
    selectedSize = size;
}
updateSize("small" /* Small */);
```

### never & void

`never` is used when we've a non-reachable code i.e (never going to return a value)

```js
function onError(error: string): never {
    throw new Error(error);
    // the rest is not reachable
}
```

`void` is perfectly used when the function does not return anything

```js
let x:number = 1;
function changeX(y: number): void{
    x =y;
}
changeX(2);
```

### Union types and Tuples

union type is way of telling typescript to choose one of serveral types

```js
let x: string = 'meska';

function mutateX(size: 'medium' | 'large' | 'small'): void {
    x = size;
}
mutateX('large');
```

#### what's tuples and specify a use case? does it differes from union types?

Tuples is an array-like data structure which give us the flexibility of creating array of different types,
it's useful when we're dealing with 3rd party apis or libs
it differes from union types, tuples specifiy types inside an array and we must conform to the order we've written, while union type give us the flexibity of optionality!

```js
let apiReturns: [string, number, boolean];
apiReturns = ['ypusef', 1, true];
```

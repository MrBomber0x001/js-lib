
- Inherticance
  -> note for me: show how super is implementation under the hood

```js
class Shape {
  constructor(color) {
    this.color = color;
  }
  move() {
    console.log("move coming from shape");
  }
}
class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }
  draw() {
    console.log("draw");
  }
  //method overriding
  move() {
    super.move();
    console.log("move coming from Circle");
  }
}
const c = new Circle();
```

exerciese: implement Stack data structure

```js
const _items = new WeakMap();
class Stack {
  constructor() {
    _items.set(this, []);
  }
  peek() {
    //shows you what is on top of the stack;
    //Stack is empty
    if (items.get(this).length == 0) {
      console.log("Stack is empty");
    }
    return _items.get(this)[_items.get(this).length - 1];
  }
  pop() {
    //Stack is empty
    if (items.get(this).length == 0) {
      console.log("Stack is empty"); //TODO: redundant code, refactor
    }
    return _items.get(this).pop();
  }
  push(obj) {
    _items.get(this).push(obj);
  }
  get count() {
    return _items.get(this).length;
  }
}
```

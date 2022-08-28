class Stack {
  constructor(maxStack) {
    //@ts-ignore
    this.stack = []; // stack should be private
    this.top = 0;
    this.maxStack = maxStack;
  }
  push(e) {
    this.stack[this.top++] = e;
  }
  pop() {
    return this.stack[--this.top];
  }
  stackFull() {
    return this.top == this.maxStack;
  }
  stackEmpty() {
    return !this.top;
  }
  stackSize() {
    return this.top;
  }
  traverseStack() {
    for (let i of this.stack) {
      this.display(i);
    }
  }
  display(e) {
    console.log("e %d", e);
  }
}

let stack = new Stack(10);
for (let i = 0; i < 10; i++) {
  stack.push(i * 2);
}
stack.traverseStack();

class Stack {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  //@push to the beginning
  push(e) {
    const newNode = new Node(e);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      let temp = this.head;
      this.head = newNode;
      this.head.next = temp;
    }
    return ++this.size;
  }
  pop() {
    if (!this.head) {
      return null;
    } else {
      let temp = this.head;
      if (this.head == this.tail) {
        this.tail = null; // setting tail to null
      }
      this.head = this.head.next; //setting head to null;
      this.size--;
      return temp.value;
    }
  }
}
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
let stack = new Stack();
for (let i = 0; i < 4; i++) {
  stack.push(i);
}
console.log(stack);

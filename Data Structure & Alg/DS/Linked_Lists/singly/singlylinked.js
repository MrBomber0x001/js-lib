class Node {
    constructor(val){
        this.val = val;
        this.next = null;
    }
}

let first = new Node("Hi");
first.next = new Node("There");
first.next.next = new Node("How");
first.next.next.next = new Node("Are");
first.next.next.next.next = new Node("You");

class SinglyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    push(val){
        const node = new Node(val);
        if(this.head == null){
            this.head = node;
            this.tail = this.head
        }  else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++
        return this;
    }
}

let list = new SinglyLinkedList();
list.push(10);
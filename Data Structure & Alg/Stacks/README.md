# Stacks

Stack: is a sequence T of finite elements, An ADT which is used heavily on many concepts like "OS" and "Networking application" and so many other concetps outthere.

handling function invocatiosn e.g Call Stack on Javascript. 
so many ds and algorithms depend on stack
Every operation on stack should have pre and post conditions 
In Javascript, there are two main ways of creating a stack:

1. Array-based Stacks
2. Linked-list based Stacks

**Using Arrays**
we can use these methods directly to create a stack `push and pop` or `unshift and shift`
but we should prefer using `push and pop` over `shit and unshift` for a performance issue,
inserting at the beginning will cause the array indexes to be arranged, and this consumes more time.

For better performance use Linked-list implementation instead of using arrays if you have alot of elements to be stored and traversed

**Using Singly Linked-list**
Stack supposed to be constant time, so we are not going to push from the end of the linked-list, because then we have to iterate over the entire list.
we are going to add and remove from the beginning.


## BIG O of Stacks

* Insertion - O(1).

* Removal - O(1).

* Access - O(N).

* Traversal - O(N).

## Practicing Problems







## Useful Readings
Read more about

- Call Stack and Stack Frames 

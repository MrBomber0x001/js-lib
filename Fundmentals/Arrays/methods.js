/**# Typescript Implementation of JS array

    - Map
    - Filter
    - Reduce
    - Splice
    - Flat
    - Sort

Create your own method for advanced algorithmic usages

1. you should declare the definition first!
2. start implementing it
    `.map()`

    ```js

```
**/


// Create Your Own Array
function array(){
	let arr = Object.create(array.prototype);
	Object.defineProperty(arr, 'length', {
		value: 0,
		enumberable: false,
		writable: true
	})

	for(key in arguments){
		arr[key] = arguments[key];
		arr.length +=1
	}
	return arr;
}

array.prototype.push = function(element){
	this[this.length] = element;
	this.length++;
	return this.length;
}
array.prototype.pop = function(){
	this.length--;
	const elementToRemove = this[this.length];
	delete this[this.length];
	return elementToRemove;
}

array.prototype.filter = function(cb){
	let result = array(); // -- create new array;
	for(let index in this){
		if(this.hasOwnProperty(index)){
			const element = this[index];

			if(cb(element, index)){
				result.push(element);
			}
		}	 
	}

	return result;
}
let friends = array('Jake', 'Mikenzi', 'Jordyn');
friends.push('omar');

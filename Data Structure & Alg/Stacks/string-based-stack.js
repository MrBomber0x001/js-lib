/**
 * @brief Stack implementation using prototypical inheritance approach
 */
let Stack = function () {
  this.storage = "";
};

Stack.prototype.push = function (e) {
  this.storage = this.storage.concat("***", e);
};
Stack.prototype.pop = function (e) {
  // slice off the last characters up until ***
  let index = this.storage.lastIndexOf("***") + 3;
  let str = this.storage.slice(index);

  // updating the storage without the last element
  this.storage = this.storage.substring(0, index - 3);
  return str;
};
Stack.prototype.size = function (e) {
  let elements = this.storage.split("***");
  return elements.length;
};

let weeklyDays = new Stack();
for (let i = 0; i < 10; i++) {
  weeklyDays.push(`${i}`.repeat(i));
}
console.log(weeklyDays.size() - 1);

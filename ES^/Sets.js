/**
 * Sets: Unique arrays, you can add the item once,
 * you can't access items invidually nor the items are index-based
 */

const people = new Set();
people.add("yousef");
people.add("omar");
people.add("Kait");
people.delete("yousef");
people.size();
people.clear();
people.has("yousef"); // true 
people.values(); // return SetIterator Object, we can loop over it (A generator)
people.keys(); // are exactly the same as .values
const it = people.values();

it.next();
it.next();
it.next();
// or
for (const person of people) {
    console.log(person);
}


const students = new Set(["y", "o", "a"]);
const arr = ["oh", "ho"];
const arrSet = new Set(arr);
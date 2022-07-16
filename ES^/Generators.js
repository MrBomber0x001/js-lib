/**
 * Introduction to Generators
 */

/* A function that can be started or paused
 you can pass additiona information on a later point of time
yield : return that item until the function is called again
 [[GeneratorsStatus]] => determine the status of the generator
 [[GeneratorReceiver]]
*/
// we need to call this function three times to get all the values
function* listPeople() {
    yield "yousef";
    yield "mahmoud";
    yield "meska"
}


function* increment() {
    let i = 0;
    yield i;
    i++;
    yield i;
    i++
    yield i;
}
const people = listPeople();

people.next(); // return an Object {value: "yousef", done: false}
people.next(); // return an Object {value: "mahmoud", done: false}
people.next(); // return an Object {value: "meska", done: true}

const inventors = [
    { first: "yousef", last: "meska" },
    { first: "Ahmed", last: "meska" },

    { first: "meska", last: "meska" },

    { first: "hola", last: "meska" },

    { first: "yousef", last: "meska" },
]

function* loop() {
    for (const item of arr) {
        yield item;
    }
}

const inventorsGen = loop(inventors)

/**
 * Typical usage of Generators 
 */

function ajax(url) {
    fetch(url).then(data => data.json()).then(data => dataGen.next(data)) // this will kick off the other ones
}

function* steps() {
    console.log("fetching beers");
    const beer = yield ajax("http://api.react.beer/v2/search?q=hops&type=beer");
    console.log("fetching wes");
    const wes = yield ajax("https://api.gitub.com/users/wesbos");
    console.log("fetching fat joe")
    const fatJoe = yield ajax("https://api.discogs.com/artists/5454");
}

const dataGen = steps();

dataGen.next(); // kick the first one off.


/**
 * Looping Over Generators
 */
function* number() {
    yield 1
    yield 2

    yield 3

    yield 4
}
const numbers = numbers();
for (const line of numbers) {
    console.log(line) // the value itself
}
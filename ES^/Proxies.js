/**
 * Intro to Proxies
 * -------------------
 * Proxies allows you to overwrite many of objects' default operations behavirous
 * 
 * Proxy(object, handler). the handler has methods which work on the properties of object (traps)
 */

const person = { name: "yousef", age: 100 };
const personProxy = new Proxy(person, {
    get(target, name) {
        console.log("someone is asking for ", target, name);
        return 'welcome' // we hijacked the property name and return a string instead
        // return target[name].toUpperCase()
    },
    set(target, name, value) {
        if (typeof value === 'string') {
            target[name] = value.trim();
        }
    }
})

personProxy.name = "omar"
personProxy.cool = 'ohh yeah'

/**
 * Good Example
 */

const phoneHandler = {
    set(target, name, value) {
        target[name] = value.match(/[0-9]/g).join('')
    },
    get(target, name) {
        return target[name].replace(/(\d{3})(\d{3})(\d{3})/, '($1)-$2-$3');
    } // consisten formatting
}

const phoneNumbers = new Proxy({}, phoneHandler)


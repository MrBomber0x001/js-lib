1. Glimpse of Callbacks
2. Anatomy of Promises
3. Promises under the hood
4. async await
5. Top level await

```js
somePromise()
  .then()
  .finally()
  .then()
  .catch()
  .then()
  .finally()
  .catch()
```

```js
function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from a database ...");
    callback({ id, githubUserName: "yousef" });
  });
}
getUser(1, function (user) {
  console.log("User", user);

  // Get the repos
  getRepositories(user.githubUserName, function (repos) {
    for (let i = 0; i < repos.length; i++) {
      getCommits(repos[i], (repo) => {
        console.log(repo.commits);
      });
    }
  });
});

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("getting repos for user:", username);
    callback([
      { name: "node", commits: "25" },
      { name: "react", commits: 25 },
      { name: "svelet", commits: 50 },
    ]);
  });
}

function getCommits(repo, cb) {
  setTimeout(() => {
    cb(repo);
  });
}

```

We have

1. Callbacks
2. Promises: The origins of it, under the hood?
3. Asyc/Await
4. promisify

```js
    console.log('Before');
    const user = getUser(1);
    console.log(user); // 1
    console.log("After");


    function getUser(id){
        setTimeout(() => {
            return {id: id, githubUserName: 'yousef'}
        }, 1000);
        return 1;
    }
```

1. Callbacks

   ```js
   function getUser(id, callback) {
   setTimeout(() => {
    console.log("Reading a user from a database ...");
    callback({ id, githubUserName: "yousef" });
   });
   }
   getUser(1, function (user) {
   console.log("User", user);
   
   // Get the repos
   getRepositories(user.githubUserName, function (repos) {
    for (let i = 0; i < repos.length; i++) {
      getCommits(repos[i], (repo) => {
        console.log(repo.commits);
      });
    }
   });
   });
   ```

```js
function getRepositories(username, callback) {
 setTimeout(() => {
 console.log("getting repos for user:", username);
 callback([
 { name: "node", commits: "25" },
 { name: "react", commits: 25 },
 { name: "svelet", commits: 50 },
 ]);
 });
}

function getCommits(repo, cb) {
 setTimeout(() => {
 cb(repo);
 });
}
```

```js
const doSomeWork = (callback) => {
  setTimeout(() => {
    callback(undefined, [1, 4, 7]);
  }, 2000);
};

doSomeWork((err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log(result);
});

const doWorkPromise = (seconds) => {
  return new Promise((resolve, reject) => {
    if (seconds > 3) {
      setTimeout(() => {
        resolve([1, 4, 7]);
      }, 2000);
    } else {
      reject("seconds must be above 3");
    }
  });
};

doWorkPromise(2)
  .then((data) => {
    console.log(data);
  })
  .catch(console.log);
// what if called callback twice ?
// the program will crash 
// what if called reject() then resolve()
// the programm will not crash but the promise will be rejected normally and resolve doesn't have any effect on the promise
```

promise chaining

```js
-- before
const add = (a,b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
          resolve(a + b);
    }, 2000)
  })
}
add(1,2).then((sum) => {
    console.log(sum)
    add(sum, 3).then((sum) => {
        console.log(sum);
})
})
```

```js
-- after
const add = (a,b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
          resolve(a + b);
    }, 2000)
  })
}
add(1,2).then((sum) => {
  console.log(sum);
  return add(sum , 3);
}).then((sum) => {
  console.log(sum);
}).catch(e => console.log(e)); // only one catch method for all .then()
```

Async function always returns a promise.

```js

```

```js
/**
 *1. When new promise is used, an executor  needs to be passed. The executor will execute immediately
 *2. The executor accepts two parameters: resolve and reject
 *3. Project can only be from pending to rejected or from pending to fulfilled
 *4. Once the promise status is confirmed, it will not change again
 *5. Promise has the then method. Then receives two parameters, which are the successful callback onfulfilled of promise,
 *And project failed callbacks onrejected
 *6. If promise is successful when then is called, onfulfilled is executed and the value of promise is passed in as a parameter.
 *If the project has failed, onrejected is executed and the reason for the failure is passed in as a parameter.
 *If the project status is pending, you need to store the onfulfilled and onrejected functions, wait for the status to be determined, and then execute the corresponding functions in turn (publish and subscribe)
 *7. The parameters onfulfilled and onrejected of then can be defaulted
 *8. Promise can be then many times, and the then method of promise returns a promise
 *9. If then returns a result, the result will be passed as a parameter to the next successful callback of then (onfulfilled)
 *10. If an exception is thrown in then, the exception will be passed as a parameter to the next then's failed callback (onrejected)
 *11. If then returns a promise, you need to wait for the promise to finish executing. If the promise succeeds,
 *Go to the next then's success. If you fail, go to the next then's failure
 */

 https://developpaper.com/source-code-implementation-of-promise-perfect-in-accordance-with-promise-a-specification/

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
function Promise(executor) {
  let self = this;
  self.status = PENDING;
  self.onFulfilled = []; // successful callback
  self.onRejected = []; // failed callback
  //PromiseA+ 2.1
  function resolve(value) {
    if (self.status === PENDING) {
      self.status = FULFILLED;
      self.value = value;
      self.onFulfilled.forEach((fn) => fn()); //PromiseA+ 2.2.6.1
    }
  }

  function reject(reason) {
    if (self.status === PENDING) {
      self.status = REJECTED;
      self.reason = reason;
      self.onRejected.forEach((fn) => fn()); //PromiseA+ 2.2.6.2
    }
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}
//side notes: onFullfilled and onRejected should be private;
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.finally = function (callback) {
  return this.then(
    (value) => {
      return Promise.resolve(callback()).then(() => {
        return value;
      });
    },
    (err) => {
      return Promise.resolve(callback()).then(() => {
        throw err;
      });
    }
  );
};
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let index = 0;
    let result = [];
    if (promises.length === 0) {
      resolve(result);
    } else {
      function processValue(i, data) {
        result[i] = data;
        if (++index === promises.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < promises.length; i++) {
        //Promises [i] may be a normal value
        Promise.resolve(promises[i]).then(
          (data) => {
            processValue(i, data);
          },
          (err) => {
            reject(err);
            return;
          }
        );
      }
    }
  });
};
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        if (promises.length === 0) {
            return;
        } else {
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then((data) => {
                    resolve(data);
                    return;
                }, (err) => {
                    reject(err);
                    return;
                });
            }
        }
    });
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  //PromiseA+ 2.2.1 / PromiseA+ 2.2.5 / PromiseA+ 2.2.7.3 / PromiseA+ 2.2.7.4
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };
  let self = this;
  //PromiseA+ 2.2.7
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      //PromiseA+ 2.2.2
      //PromiseA+ 2.2.4 --- setTimeout
      setTimeout(() => {
        try {
          //PromiseA+ 2.2.7.1
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          //PromiseA+ 2.2.7.2
          reject(e);
        }
      });
    } else if (self.status === REJECTED) {
      //PromiseA+ 2.2.3
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === PENDING) {
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      });
    }
  });
  return promise2;
};

function resolvePromise(promise2, x, resolve, reject) {
  let self = this;
  //PromiseA+ 2.3.1
  if (promise2 === x) {
    reject(new TypeError("Chaining cycle"));
  }
  if ((x && typeof x === "object") || typeof x === "function") {
    let used; // promise a + 2.3.3.3.3.3 can only be called once
    try {
      let then = x.then;
      if (typeof then === "function") {
        //PromiseA+2.3.3
        then.call(
          x,
          (y) => {
            //PromiseA+2.3.3.1
            if (used) return;
            used = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            //PromiseA+2.3.3.2
            if (used) return;
            used = true;
            reject(r);
          }
        );
      } else {
        //PromiseA+2.3.3.4
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch (e) {
      //PromiseA+ 2.3.3.2
      if (used) return;
      used = true;
      reject(e);
    }
  } else {
    //PromiseA+ 2.3.3.4
    resolve(x);
  }
}

module.exports = Promise;

//so as you see, Promises are bases on callbacks, Javascript will not understand anything except callbacks at it's core;
//also as you might have noticed that Promise at it's core it actually constructor function which eventually will produce an object holding an array of Rejections and Fullfillment;
//Example
const p = new Promise(function (resolve, reject) {
  //kick off some async.
  setTimeout(() => {
    resolve(1); // we are sending this 1 value to the consumer of promise. pending => resolved or fullfilled
  }, 2000);

  //reject(new Error("message")); //as best practice you should pass Error Object instead of error; pending => rejected
});
//now we want to consume the promise.
p.then(function (result) {
  console.log("result", result);
}).catch(function (err) {
  console.log("Error", err.message);
});

//Example to be refactored
console.log("Before");
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    });
  });
});
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from a database...");
    
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}

function getCommits(repo, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API...");
    callback(["commit"]);
  }, 2000);
}

//the refactoring
console.log("Before");
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    });
  });
});
console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading from a databsae...");
      resolve({ id: id, gitHubUsername: "yousef" });
    }, 2000);
  });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API...");
            resolve(["repo1", "repo2", "repo3"]);
          }, 2000);
    })

}

function getCommits(repo ) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API...");
            resolve(["commit"]);
          }, 2000);
    })

}
//consuming promises
getUser(1).then(user => getRepositories(user.gitHubUsername).then(repo => getCommit().then())); //wrong;
getUser(2).then(user => getRepositories(user.gitHubUsername))
        .then(repos => getCommits(repos)) //then is for the second promise
        .then(commits => console.log('Commits', commits))
        .catch(err => console.log(err)); //we have only one single error handler;








/** Creating Settled Promises */
//look at promise-api.js
```

promise-api.js

```js
const p = Promise.resolve({ id: 1 });
p.then((result) => console.log(result));

//Promise that already rejected;
const r = Promise.reject(new Error("error happened!"));
//new Error() give you the call stack details;
r.catch((error) => console.log(error));

/* Running Parallel Promises */
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
  }, 2000);
});
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});
//we are not waiting for the first async and then executing the second one, here they are nearly executed at the same time...
//we still deal with single thread.
Promise.all([p1, p2]) //returns a new promise that will be resolved when the array of promises are resolved
  .then((result) => console.log(result))
  .catch((err) => console.log("Error", err.message)); //if one of them fails or both
//result is an array.

Promise.race([p1, p2]).then((result) => console.log(result)); //the result is the value of first fullfilled promise.

//now what about async await?
//async-await file

```

from random notes I have taken before:

```js

```

## Evolution

/**

* Evolution of Async Javascript,
From Callbacks, Promises to    Async/await

*

*/
// we pass functions by reference

```js
function add(x, y){
    return x + y;
  }
  
  function addFive(x, addReference){
    return addReference(6, x)
  }
  
  addFive(10, add)
  
  function higherOrderFunction(x, callback){
    return callback(5, x);
  }
  
  higherOrderFunction(10, add);
  
  [1,3,4,5].map((i) => i + 4);
  
  const _= {
    map(arr, cb){
      let mapped = [];
      for(let i = 0; i < arr.length; i++){
        mapped.push(cb(arr[i]));
      }
      return mapped
    }
  }
const newArr  =_.map([1,3,4], (i) => {
    return i % 2;
  })
  console.log(newArr);

  console.log("=========");
  function x(name, callback){
    return function cb(...arg){
      callback(args);
    }
  }
  
  // Registering an event listerens [look to Learn Javascript Object Oriented Book] to see how events are registers for events
  let button = {};
  // button.addEventListener("click", () => {

  // })
  
console.log(`=== Promises Under the Hood ===`);

console.log(`=========== Evolution of Aync JS (Callbacks, Promises, Async/await) ==============`);
console.log(`callback hell:
* thinking non-sequentially and get messy!
* hard to follow the logic
* hard to refactor!
* to decrease that hell, use smaller functions for each job
`);
const id = "mrbomber0x001";

const $ = 'jquery';
function showError(e){
  console.warn("Error", e);
}
function updateUI(info){
  $("#app").text(JSON.stringify(info));
}

function getLocationURL([city, state]){
  return `https://api`;
}
$("#button").on("click", () => {
  $.getJSON({
    url: `https://api.github.com/users/${id}`,
    success: user => {
      $.getJSON({
        url: getLocationURL(user.location.split(",")),
        success(weather){
          updateUI({
            user,
            weather: weather.query.results
          })
        },
        error: showError
      })
    },
    error: showError
  })
})
console.log(`callback hell:
* after refactor
* still there's a little bit a hell xD
`);
function getUserInfo(id, onSuccess, onFailure){
  $.getJSON({
url:`endpoint`,
    success: onSuccess,
    error: onFailure
  })
}
function getWeather(user, onSuccess, onFailure){
  $.getJSON({
    url: getLocationURL(user.location.split(',')),
    success: onSuccess,
    error: onFailure
  })
}
$("#button").on("click", () => {
  getUserInfo('meska', (user) => {
    getWeather(user, (weather) => {
      updateUI({
        user,
        weather: weather.query.results
      })
    }, showError)
  }, showError)
})

// TODO: read about Inversion of Control
/**

* Inversion of Control in the context of Callbacks is just that simple
* You create a cb to be used within a thrid party api
* then you're no longer responsible for that cb, that 3rd part is now the in the control of hanlding it
* so it may call this cb twice or handle it differently than you think!
 */

function criticalFunction(){

}
thridPartyLib(criticalFunction);

/** Promises */

// 1- when do the resolve, and reject excute? when we call them!
// 2- how does promise change it's status? when calling the resolve or reject on success of failure

// refactoring
```js
function getUser(id){
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: `https://api.github.com/users/${id}`,
      success: resolve,
      error: reject
    })
  })
}

function getWeather(user){
  return new Promise((resolve, reject) => {
    $.getJSON({
      url: getLocationURL(user.location.split(',')),
      success: resolve,
      error: reject
    })
  })
}
$("#btn").on("click", () => {
  const userPromise = getUser('meska');
  userPromise.then((user) => {
    const weatherPromise = getWeather(user)
    weatherPromise.then((weather) => {
      updateUI({
        user,
        weather: weather.query.result
      })
    })
  })
})


```

## Node

## Advanced Location

1. Callback Pattern

readmore about process.nextTick();

```js
function hideString2(str) {
  return str.replace(/[a-zA-Z]/g, "X");
}
function hideString(str, done) {
  done(str.replace(/[a-zA-Z]/g, "X"));
}
const hidden = hideString2("yousef");
hideString("meska", (hidden) => {
  console.log(hidden);
});
console.log(hidden);
console.log("end");

/* the code above is still act synchrously, becuase callbacks in nature are synchrounus, we need a way to make it async */
// we are going to use process.nextTick()
/* process.nextTick():
tell nodej to invoke the function we send to nextTick in the next loop of the Even loop, so it' goint to happen async 
*/

function hideString3(str, done) {
  process.nextTick(() => {
    done(str.replace(/[a-zA-Z]/g, "X"));
  });
}
hideString3("hello world", (hidden) => {
  console.log(hidden);
});

function delay(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}
console.log("starting delays");
delay(2, () => {
  console.log("two seconds");
  delay(1, () => {
    console.log("three seconds ");
    delay(1, () => {
      console.log("four seconds");
    });
  });
});
console.log("end of delay");
```

```js
function hideString2(str) {
  return str.replace(/[a-zA-Z]/g, "X");
}
function hideString(str, done) {
  done(str.replace(/[a-zA-Z]/g, "X"));
}
const hidden = hideString2("yousef");
hideString("meska", (hidden) => {
  console.log(hidden);
});
console.log(hidden);
console.log("end");

/* the code above is still act synchrously, becuase callbacks in nature are synchrounus, we need a way to make it async */
// we are going to use process.nextTick()
/* process.nextTick():
tell nodej to invoke the function we send to nextTick in the next loop of the Even loop, so it' goint to happen async 
*/

function hideString3(str, done) {
  process.nextTick(() => {
    done(str.replace(/[a-zA-Z]/g, "X"));
  });
}
hideString3("hello world", (hidden) => {
  console.log(hidden);
});

function delay(seconds, callback) {
  setTimeout(callback, seconds * 1000);
}
console.log("starting delays");
delay(2, () => {
  console.log("two seconds");
  delay(1, () => {
    console.log("three seconds ");
    delay(1, () => {
      console.log("four seconds");
    });
  });
});
console.log("end of delay");

```

2. Resolving Promises

   read more about Promises

   ```js
   const delay = (seconds) =>
     new Promise((resolve, reject) => {
       // setTimeout(resolve, seconds * 1000);
       setTimeout(() => {
         resolve("The delay has been ended");
       }, seconds * 1000);
     });
   
   /*delay(2).then((message) => {
     console.log(message);
   });*/
   
   delay(2)
     .then(console.log)
     .then(() => console.log("another mesage"))
     .then(() => console.log("another message"))
     .then(() => console.log("another message"))
     .then(() => console.log("another message"));
   
   delay(1)
     .then(console.log)
     .then(() => 42)
     .then((number) => console.log(`the number is ${number}`));
   console.log(`end first tick`);
   ```

```js
   const delay = (seconds) =>
  new Promise((resolve, reject) => {
    if (seconds > 3) {
      reject(new Error(`${seconds} is too long!`));
    }
    // setTimeout(resolve, seconds * 1000);
    setTimeout(() => {
      resolve("The delay has been ended");
    }, seconds * 1000);
  });

/*delay(2).then((message) => {
  console.log(message); 
});*/

delay(2)
  .then(console.log)
  .then(() => console.log("another mesage"))
  .then(() => console.log("another message"))
  .then(() => console.log("another message"))
  .then(() => console.log("another message"));

delay(1)
  .then(console.log)
  .then(() => 42)
  .then((number) => console.log(`the number is ${number}`))
  .catch((err) => {
    console.log(`Error: ${err.message}`);
  });
console.log(`end first tick`);

```

3. Promisify function

   read more about promisify

```js
const { promisify } = require("util");
const delay = (seconds, callback) => {
  if (seconds > 3) {
    callback(new Error(`${seconds} seconds is too long1`));
  } else {
    setTimeout(() => {
      callback(null, `the ${seconds} second delay is over`);
    }, seconds * 1000);
  }
};
/*delay(2, (error, message) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log(message);
  }
});*/

const promiseDelay = promisify(delay);
promiseDelay(2)
  .then(console.log)
  .catch((error) => console.log(`error: ${error.message}`));
```

```js
const { promisify } = require("util");
const fs = require("fs");
const delay = (seconds, callback) => {
  if (seconds > 3) {
    callback(new Error(`${seconds} seconds is too long1`));
  } else {
    setTimeout(() => {
      callback(null, `the ${seconds} second delay is over`);
    }, seconds * 1000);
  }
};
/*delay(2, (error, message) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log(message);
  }
});*/

const promiseDelay = promisify(delay);
promiseDelay(2)
  .then(console.log)
  .catch((error) => console.log(`error: ${error.message}`));

const writeFile = promisify(fs.writeFile);
writeFile("sample.txt", "this is a sample")
  .then(() => console.log("file successfully created"))
  .catch((error) => console.log(`Error creating File`));
```

4. Sequential Execution

```js
let fs = require("fs");

var beep = () => process.stdout.write("\x07");

beep();
/* callback hell */

const doStuffSequentially = () => {
  console.log("starting...");
  setTimeout(() => {
    console.log("waiting some more...");
    fs.writeFile("file.txt", "Sample file...", (error) => {
      if (error) {
        console.log(error);
      } else {
        beep();
        console.log("file.txt created ");
        setTimeout(() => {
          beep();
          fs.unlink("file.txt", (error) => {
            if (error) {
              console.error(error);
            } else {
              console.log("file.txt removed");
              console.log("sequantial exectution!");
            }
          });
        }, 2000);
      }
    });
  }, 1000);
};
doStuffSequentially();
```

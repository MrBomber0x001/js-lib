/**Arrow Functions**/
// 1. Less typing
// 2. Implicit return
// 3. Dealing with this keyword

```js
// fn declaration 
function add(x, y) {
 return x + y;
}
// fn expression
var add = function (x, y) {
 return x + y;
}

// arrow function
var add = (x, y) => {
 return x + y;
}

add(1, 2);


users.map(function (user) {
 //
})
// less typing ...
users.map(() => {

})



function getTweets(uid) {
 return fetch(`http:api.users.com/` + uid).then(function (response) {
  return response.json();
 }).then(function (response) {
  return response.data
 })
  .then(function (tweets) {
   return tweets.filter(function (tweet) {
    return tweets.stars > 50
   })
  }).then(function (tweets) {
  retrun tweets.filter(function (tweet) {
   return tweets.rts > 50
  })
  })
}


function getTweets(uid) {
 return fetch(`http:api.users.com/` + uid)
  .then(response => response.json())
  .then(response => response.data)
  .then(tweets => tweets.filter((tweet) => tweets.stars > 50))
  .then(tweets => tweets.filter((tweet) => tweets.rts > 50))
}


api.fetchPopularRepos(lang)
 .then((repos) => {
  this.setState(() => console.log(`repos`, repos) || ({
   repos
  }))
 })
```

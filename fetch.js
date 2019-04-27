const fetch = require("node-fetch");
const util = require('util')
// let x = fetch("http://localhost:8001/keyword/hong+kong", {
//   method: "GET",
//   // headers: { "Content-Type": "application/json" },
//   // body: JSON.stringify({ message: message })
// }).then(response => response.json())
//   .then(response => console.log(response))
//   .catch(e => console.error("TODO handle error " + e));

// fetch("http://localhost:8001/doc/1+2", {
//   method: "GET",
//   // headers: { "Content-Type": "application/json" },
//   // body: JSON.stringify({ message: message })
// }).then(response => response.json())
//   .then(response => console.log(response))
//   .catch(e => console.error("TODO handle error " + e));

// let y = fetch("http://localhost:8001/doc/1/term/note+project", {
//   method: "GET",
// }).then(response => response.json())
//   .then(response => response)
//   .catch(e => console.error("TODO handle error " + e));

// y.then(m => console.log(util.inspect(m, false, null, true)))

let z = fetch("http://localhost:8001/term/research", {
  method: "GET",
}).then(response => response.json())
  .then(response => response)
  .catch(e => console.error("TODO handle error " + e));

z.then(m => console.log(util.inspect(m, false, null, true)))

// console.log(x);

// function searchEngine(query_raw){
//   query_raw
//   fetch("http://localhost:8000/doc/1+2", {
//   method: "GET",
// }).then(response => response.json())
//   .then(response => console.log(response))
//   .then(function(res){
//     return re
//   })
//   .catch(e => console.error("TODO handle error " + e));
// }

// searchEngine("1 s 432 da").then(res => console.log(res));
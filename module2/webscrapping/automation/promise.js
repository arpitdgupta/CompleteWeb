const fs=require("fs");

let f1kapromise=fs.promises.readFile("f1.txt");
let f2kapromise=fs.promises.readFile("f2.txt");
console.log("before");
console.log(f1kapromise);

f1kapromise.then(function(data){
     console.log(""+data);
})

f1kapromise.catch(function(error){
    console.log(error);
})

console.log(f2kapromise);

f2kapromise.then(function(data){
    console.log(""+data);
})

f2kapromise.catch(function(error){
    console.log(error);
})

const fs=require("fs");

console.log("Before");

fs.readFile("File.txt",cb);

function cb(error,data){
    if(error){
       console.log("error: ",error);
    }else{
       console.log("data: ",data+"");
    }
}


console.log("After");
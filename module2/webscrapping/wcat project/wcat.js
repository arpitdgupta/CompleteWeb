let fs=require("fs");
let inputarr=process.argv.slice(2);

console.log(inputarr);

// -s => convert from multiple line breaks to singlular line breaks ,//-b , -n

let filearr=[];
let optionsarr=[];
let buffer=[];

for(let i=0;i<inputarr.length;++i){
      if(inputarr[i].charAt(0)=='-'){
          optionsarr.push(inputarr[i]);
      }else{
            filearr.push(inputarr[i]);
      }     
}
console.log(optionsarr);
console.log(filearr);

let content="";

for(let i=0;i<filearr.length;++i){

        let c=fs.readFileSync(inputarr[i]);
        content+=c+"\r\n";
      
}

buffer=content.split("\r\n");



function fn(){

  let bothincludes=(optionsarr.includes("-n")&&optionsarr.includes("-b"))
  
  if(bothincludes==true){
        console.log("Either b can run or n");
        return;
  }





let isSPresent=optionsarr.includes("-s");

if(isSPresent==true){
      
      for(let i=1;i<buffer.length;++i){
                
            if(buffer[i]==""&&buffer[i-1]==""){
                  buffer[i]=null;
            }else if(buffer[i]==""&&buffer[i-1]==null){
                   buffer[i]=null;
            }
      }

}


let isNPresent=optionsarr.includes("-n");

if(isNPresent==true){
    
      for(let i=0;i<buffer.length;++i){
           
            buffer[i]= '${i+1}. ${buffer[i]}';

      }
}

console.log(buffer.join("\n"));


// let isBPresent=optionsarr.includes("-b");
// let counter=1;
// if(isBPresent==true){
    
//       for(let i=0;i<buffer.length;++i){
            
//             if(buffer[i]!="")
//             buffer[i]= "${counter}. ${buffer[i]}";

//       }
// }

// console.log(buffer.join("\n"));













let temparr=[];

for(let i=0;i<buffer.length;++i){
          if(buffer[i]!=null){
                temparr.push(buffer[i]);
          }
}

buffer=temparr;

// console.log(buffer);
}

fn();
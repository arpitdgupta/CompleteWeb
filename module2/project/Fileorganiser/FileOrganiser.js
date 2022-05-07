// console.log("Welcome to India");

// let input=process.argv;
//   it returns an array ['pathtonode', 'pathtofile','on terminal path which is given after space in double quotes']



// let input=process.argv[2];

// let inputArr=process.argv;
// let input=inputArr[2];
// console.log(input);

let path=require("path");
let fs=require("fs");

let folderpath=process.argv[2];
// console.log(folderpath);

let Pathexist=fs.existsSync(folderpath);

 let extensions={
     Audio:['.mp3'],
     Video:['.mp4','.mkv'],
     Document:['.doc','.pdf','.xlxs'],
     Image:['.jpeg','.jpg','.png','.gif'],
     Software:['.exe'],
 } 
//  console.log(folderpath);

if(Pathexist){
     let Allfiles=fs.readdirSync(folderpath);

      for(let i=0;i<Allfiles.length;++i){
          let ext=path.extname(Allfiles[i]);
          let folder=givefoldername(ext);
          
        //  console.log(ext,folder);

           let pathoffolder=path.join(folderpath,folder);
            let newpath=path.join(folderpath,Allfiles[i]);

            // console.log(newpath);
            // console.log(pathoffolder);
            
            // console.log("              ");
            if(!fs.existsSync(pathoffolder))
            fs.mkdirSync(pathoffolder);

          movefile(newpath,pathoffolder,Allfiles[i]);
      }

}else{
   console.log("Please Enter a Valid Path!!!!!!!!!!");
}



function givefoldername(ext){

     for(let key in extensions){
         let objArr=extensions[key];

         for(let i=0;i<objArr.length;++i){
             if(ext==objArr[i])
              return key;
         }
     }

     return 'Others';
}


function movefile(fp,pof,Filename){
//    console.log(Filename);
    let sourcepath=fp;
    let destinationpath=path.join(pof,Filename);
    
    //   console.log(sourcepath);
    //   console.log(destinationpath);
    //   console.log("           ");
   
    fs.copyFileSync(sourcepath,destinationpath);

    fs.unlinkSync(sourcepath);
}
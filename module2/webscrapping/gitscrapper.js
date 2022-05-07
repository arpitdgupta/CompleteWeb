const request=require("request");
const {JSDOM}=require("jsdom");
let fs=require("fs");


const link="https://github.com/topics";

request(link,cb);

function cb(error,response,html){
       
    if(error){
        console.log(error);
    }else{
        const dom=new JSDOM(html);
        const document=dom.window.document;

        let allAnchorTags=document.querySelectorAll(".no-underline.d-flex.flex-column.flex-justify-center");
            // console.log(allAnchorTags.length);
        for(let i=0;i<allAnchorTags.length;++i){
            let link=allAnchorTags[i].href;
            let completeLink="https://github.com"+link;
            console.log(completeLink);
        }
    }

}
const { JSDOM } = require("jsdom");
const request=require("request");


const link="https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/chennai-super-kings-vs-royal-challengers-bangalore-22nd-match-1304068/full-scorecard"

request(link,cb);

function cb (error,response,html){
    if(error){
       console.log("error: ",error)
    }else{
        const dom=new JSDOM(html);
        const document=dom.window.document;

        let result=document.querySelectorAll(".ds-text-tight-m.ds-font-regular.ds-truncate.ds-text-typo-title>span");
        console.log(result[0].textContent);
    }
}
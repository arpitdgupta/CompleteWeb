const request=require("request");
const jsdom=require("jsdom");
const {JSDOM}=jsdom;

const link="https://www.espncricinfo.com/series/ipl-2021-1249214/royal-challengers-bangalore-vs-delhi-capitals-56th-match-1254101/full-scorecard";

request(link,cb);

function cb(error,response,html){
  
    if(error){
           console.log("Error: ",error);
    }else{
        
        const dom=new JSDOM(html);
        const document=dom.window.document;

        let details=document.querySelectorAll(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table a");
          
        for(let i=0;i<details.length;++i){
            let playerlink="https://www.espncricinfo.com"+details[i].href;
            // console.log("https://www.espncricinfo.com"+playerlink);
            request(playerlink,cb2);
        }

    }


    function cb2(error,response,html){
        if(error){
            console.log("Error 2:  ",error);
        }else{
            const dom=new JSDOM(html);
            const document=dom.window.document;

            let playerdata=document.querySelectorAll(".ds-text-title-s.ds-font-bold.ds-text-ui-typo h5");
            console.log("Name->",playerdata[0].textContent,"   Batsman->",playerdata[3].textContent,"  Bowling-->",playerdata[4].textContent);
            
        }
    }

}
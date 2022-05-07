const request=require("request");
const jsdom=require("jsdom");
const {JSDOM}=jsdom;

const link="https://www.espncricinfo.com/series/ipl-2021-1249214/chennai-super-kings-vs-punjab-kings-53rd-match-1254094/full-scorecard";

request(link,cb);


function cb(error,response,html){
    if(error){
        console.log("error: ",error);
    }else{
         
       
          const dom=new JSDOM(html);
          const document=dom.window.document;

         let tables=document.querySelectorAll(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed");
        let m=0; let s;
         for(let i=0;i<tables.length;++i){
             let rows=tables[i].querySelectorAll("tbody>tr");
             if(rows.length<11)
             {
                 for(let j=0;j<rows.length;++j){
                        let tds=rows[j].querySelectorAll("td");
                        if(tds.length>1){
                            console.log("Name--->" ,tds[0].textContent,"   Wickets--->",tds[4].textContent);
                         if(tds[4].textContent>=m){
                             m=tds[4].textContent;
                             s=tds[0].textContent;
                         }
                        }
                 }
             }
         }
          
         console.log("......................................");
         console.log("Highest wicket taker name: ",s,"wickets-->" ,m );
    }
}
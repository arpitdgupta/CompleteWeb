const request=require("request");
const {JSDOM}=require("jsdom");
let fs=require("fs");
const xlsx=require("json-as-xlsx");

const link="https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";

request(link,cb);

let leaderboard=[];
let count=0;

console.log(leaderboard);
function cb(error,response,html){
    if(error){
        console.log("error: ",error);
    }else{

        const dom=new JSDOM(html);
        const document=dom.window.document;

        let all=document.querySelectorAll(".ds-flex.ds-mx-4.ds-pt-2.ds-pb-3.ds-space-x-4.ds-border-t.ds-border-line-default-translucent a");
        
        
        for(let i=2;i<all.length;i=i+4){
            let link="https://www.espncricinfo.com"+all[i].href;
            request(link,cb2);
            count++;
        }
     
    }



    function cb2(error,response,html){
        
         if(error){
             console.log("Error: ",error);
         }else{
             
            const dom=new JSDOM(html);
            const document=dom.window.document;

           let batsmanrows=document.querySelectorAll(".ds-w-full.ds-table.ds-table-xs.ds-table-fixed.ci-scorecard-table tbody tr ");
           
           
           for(let i=0;i<batsmanrows.length;++i){
                  let tdcount=batsmanrows[i].querySelectorAll("td");
                   
                  if(tdcount.length==8){
                      let name=tdcount[0].textContent;
                      let runs=tdcount[2].textContent;
                      let balls=tdcount[3].textContent;
                      let fours=tdcount[5].textContent;
                      let sixes=tdcount[6].textContent;


                    //   console.log(name,"---",runs,"---",balls,"---",fours,"---",sixes);
                    processPlayer(name,runs,balls,fours,sixes);
                  }

              }
              count--;
              if(count==0){
               console.log(leaderboard);
                 let data=JSON.stringify(leaderboard);
                 fs.writeFileSync('Batsman_stats.json',data);

                 let dataExcel = [
                    {
                        sheet: "Ipl Stats",
                        columns: [
                            { label: "Name", value: "Name" }, // Top level data
                            { label: "Innings", value: "Innings" },
                            { label: "Runs", value: "Runs" }, // Custom format
                            { label: "Balls", value: "Balls" }, // Run functions
                            { label: "Fours", value: "Fours" },
                            { label: "Sixes", value: "Sixes" },
                        ],
                        content: leaderboard
                        //[{Name:"Rahul",Innings:16,Runs:422,Balls......}]
                    },
                ]
    
                let settings = {
                    fileName: "BatsmanDetail", // Name of the resulting spreadsheet
                    extraLength: 3, // A bigger number means that columns will be wider
                    writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
                }
                xlsx(dataExcel, settings) // Will download the excel file
            }
            
         }

    }
}


// processPlayer('Rohit','264','151','20','8');
// processPlayer('virat','264','151','20','8');
// processPlayer('Rohit','264','151','20','8');

function processPlayer(name,runs,balls,fours,sixes){ 
       runs=Number(runs);
       balls=Number(balls);
       fours=Number(fours);
       sixes=Number(sixes);
  


    for(let i=0;i<leaderboard.length;++i){
           let playerobj=leaderboard[i];

           if(playerobj.Name==name){
               playerobj.Runs+=runs;
               playerobj.Innings+=1;
               playerobj.Balls+=balls;
               playerobj.Fours+=fours;
               playerobj.Sixes+=sixes;
               return;
           }

    }

        let obj={
            Name:name,
            Innings:1,
            Runs:runs,
            Balls:balls,
            Fours:fours,
            Sixes:sixes,
        }
        leaderboard.push(obj);

}

// console.log(leaderboard);
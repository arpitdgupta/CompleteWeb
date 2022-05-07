const puppeteer=require("puppeteer");

let browserkapromise=puppeteer.launch({headless:false});

browserkapromise.then(function(browser){
    console.log("Browser is opened");

     let opennewpage=browser.newPage();
     return opennewpage;
}).then(function(page){
    console.log("page is opened");

    let url=page.goto("https://github.com/arpitdgupta/WebStarted");
    return url;
}).then(function(){
    console.log("url has been opened");
})
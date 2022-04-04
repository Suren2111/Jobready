#!/usr/bin/env node
const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs=require("fs");
const { LOADIPHLPAPI } = require("dns");
let linkdetails=[];
let codeques=[];
const link="https://www.geeksforgeeks.org/company-preparation";
request(link,cb);
let searchname=process.argv.slice(2);
if(searchname.length>1){
    searchname=searchname[0];
}
function cb(error,response,html){
    if(error){
        console.log(error);
    }
    else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let companyname=document.querySelectorAll(".entry-content li a");
        for(let i=0;i<companyname.length;i++){
            let ans=companyname[i].textContent;
            let anslink="https://www.geeksforgeeks.org"+companyname[i].href;
            linkfuncton(ans,anslink);
        }
        for(let i=0;i<linkdetails.length;i++){
            let temp=linkdetails[i].Companyname.toLowerCase();
            if(temp.includes(searchname)){
                let getlink=linkdetails[i].CompanyLink;
               // console.log(getlink);
               //console.log(searchname);
                request(getlink,cb1);
                break;
            }
        }
    }
}
function linkfuncton(name,link){
    let obj={
        Companyname:name,
        CompanyLink:link
    }
    linkdetails.push(obj);
}
function cb1(error,response,html){
    if(error){
        console.log(error);
    }
    else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let link=document.querySelectorAll("li b a");
        let ans=link[3].href;
      //  console.log(ans);
        let problems=document.querySelectorAll(".popularArticle");
       for(let i=0;i<problems.length;i++){
           if(i==2){
               let code=problems[i].querySelectorAll("li a");
               for(let j=0;j<code.length;j++){
                   let ans=code[j].textContent;
                   let link=code[j].href;
                   if(j!=code.length-1){
                       processcode(ans,link);
                   }
                
               }
               break;
           }
       }
       for(let i=0;i<codeques.length;i++){
           console.log("Question name = "+codeques[i].Questionname+", Question Link = "+codeques[i].Link);
       }

    }
}
function cb2(error,response,html){
    if(error){
        console.log(error);
    }
    else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let problems=document.querySelectorAll("explore_problemContainerTxt__kyh8P");
        let ans=problems.length;
        console.log(ans);

    }
}
function processcode(name,link){
    let obj={
        Questionname:name,
        Link:link,
    }
    codeques.push(obj);
}
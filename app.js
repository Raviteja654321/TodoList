const express=require("express");
const bodyParser=require("body-parser");
const { Router } = require("express");
const { takeCoverage } = require("v8");
let items=["eat","sleep","code"];
let workItems=[];
const app=express();
app.use(express.static(__dirname+"/views/Public"));
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine",'ejs');
app.get("/",function(req,res){
    let today=new Date();
    let options={
        weekday:"long",
        day:"numeric",
        month:"long"
    };
    let day=today.toLocaleDateString("en-US",options);
    res.render("list",{listTitle:day,newListItems:items});

})


app.post("/",function(req,res)
{
    const task=req.body.newItem;
    if(req.body.list==="Work")
    {
        workItems.push(task);
        res.redirect("/work");
    }
    else
    {
        items.push(task);
        res.redirect("/");
    }
})

app.get("/work",function(req,res)
{
    res.render("list",{listTitle: "Work List",newListItems:workItems}) ;
})
app.post("/work",function(req,res)
{
    let item=req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})
app.get("/about",function(req,res)
{
    res.render("about");
})
app.listen(3000,function(){
    console.log("server started on port 3000");
})

exp=require("express")
 express_file=require("express-fileupload")

mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")
bp=require("body-parser")
app=exp()
app.use(bp.json())
app.use(express_file());



cat_ref = require("./myfiles/cat_serverfiles")
subcat_ref = require("./myfiles/subcat_serverfiles")
subsubcat_ref = require("./myfiles/subsubcat_serverfiles")
brand_ref = require("./myfiles/brand_serverfiles")
product_ref = require("./myfiles/product_serverfiles")
app.use("/catserverfile", cat_ref)
app.use("/subcatserverfile", subcat_ref)
app.use("/subsubcatserverfile", subsubcat_ref)
app.use("/brandserverfile", brand_ref)
app.use("/productserverfile", product_ref)

app.post("/upload",function(req,res){
    iname=req.files.f1.name;
    //  console.log(iname)
    iref=req.files.f1

    //console.log(iref); 
    var dt=new Date();
    dt=dt/1000
    iname="img"+parseInt(dt)+"_"+iname
    //console.log(iname)
    iref.mv("../src/assets/upload/"+iname)
    res.redirect("http://localhost:1234/products?res="+iname)
}
)

app.listen(3500)
console.log("running through 3500")

/*
*/
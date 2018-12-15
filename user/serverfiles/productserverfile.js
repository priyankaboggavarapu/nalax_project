

exp=require("express")
rt=exp.Router();

mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")

//getting products data from db
rt.post("/get_prdata", function(req, res){
    ob=req.body
    //console.log(ob)
    conn.tbl_products.find({subsubcatid:ob._id}, function(err,rslt){
        res.send(rslt)
    })
})
rt.get("get_search",function(req,res){
    conn.products.find({productname:{$regex:ob.pname},function(err,result){
        res.send(result)}
    
    })
    
})














module.exports=rt;
var exp=require("express")
var mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")
rt=exp.Router()

rt.post("/more",function(req,result){
    mr=req.body
    conn.tbl_products.find({_id:mr.id},function(err,resu){
        result.send(resu)
    })
}
)
module.exports=rt
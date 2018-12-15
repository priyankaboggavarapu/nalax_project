exp=require("express")

mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")
rt=exp.Router()



rt.get("/user_cat",function(re,rs){
conn.tbl_cat.find(function(err,result){

rs.send(result)
})

})
module.exports=rt;
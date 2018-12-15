exp=require("express")

mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")
rt=exp.Router()



rt.get("/user_subsubcat",function(re,rs){
conn.tbl_subsubcat.find(function(err,result){

rs.send(result)

//console.log(result)
})

})
module.exports=rt
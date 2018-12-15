exp=require("express")
rt=exp.Router()

mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")

rt.post("/ins_cat", function(req,res){   
    ob=req.body
    conn.tbl_cat.find().sort({_id:-1}).limit(1, function(err, reslt){

        if(reslt.length==0)
        iid=1
        else{
            iid=(reslt[0]._id)
            iid++
        }
        console.log(iid)
        conn.tbl_cat.insert({_id:iid, catname:ob.catname,active:1})
        res.send("Category inserted")
    })
})

rt.get("/get_cat", function(err, ress){
    conn.tbl_cat.find(function(err, reslt){
        ress.send(reslt)
    })
})

 
module.exports=rt;

/*


*/

exp=require("express")
rt=exp.Router()

mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")

rt.post("/ins_cat", function(req,res){   
    ob=req.body
    console.log(ob)
    conn.tbl_cat.find().sort({_id:-1}).limit(1, function(err, reslt){

        if(reslt.length==0)
        iid=1
        else{
            iid=reslt[0]._id
            iid++
        }
      //  console.log(iid)
        conn.tbl_cat.insert({_id:iid, catname:ob.catname, active:1})
        res.send("Category inserted")
    })
})

rt.get("/get_cat", function(err, ress){
    conn.tbl_cat.find(function(err, reslt){
        ress.send(reslt)
    })
})

//delete method
rt.post("/del_cat", function(req2, res2){
    delcatdata=req2.body
    conn.tbl_cat.remove(delcatdata, function(){
        res2.send("Record Deleted")
    })

   
})


//save method

rt.post("/sav_postmet", function(rq,rs){
    savdata=rq.body
    conn.tbl_cat.update(savdata[0],{$set:savdata[1]})
    rs.send("Changes Saved")
})

//inactive button

rt.post("/inact_postmet", function(req3, res3){
    inactdata=req3.body
    conn.tbl_cat.update({_id:inactdata._id}, {$set:{active:inactdata.active}})
        res3.send("Active button updated")   
})

//active button

rt.post("/act_postmet", function(req4, res4){
    actdata=req4.body
    conn.tbl_cat.update({_id:actdata._id}, {$set:{active:actdata.active}})
    res4.send("InActive button updated")
})

 

module.exports=rt;


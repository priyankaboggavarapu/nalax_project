
exp=require("express")
rt=exp.Router()

mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")


//Inserting brands
rt.post("/ins_brand", function(req,res){   
    ob=req.body
    conn.tbl_brands.find().sort({_id:-1}).limit(1, function(err, reslt){

        if(reslt.length==0)
        iid=1
        else{
            iid=reslt[0]._id
            iid++
        }
      //  console.log(iid)
        conn.tbl_brands.insert({_id:iid, brandname:ob.brandname, active:1})
        res.send("Brand inserted")
    })
})

//Reading brands
rt.get("/read_brand", function(err, ress){
    conn.tbl_brands.find(function(err, reslt){
        ress.send(reslt)
    })
})

//save method

rt.post("/sav_brand", function(rq,rs){
    savdata=rq.body
    conn.tbl_brands.update(savdata[0],savdata[1])
    rs.send("Changes Saved")
})

//delete method
rt.post("/del_brnd", function(req2, res2){
    delbrdata=req2.body
    conn.tbl_brands.remove(delbrdata, function(){
        res2.send("Brand Deleted")
    })

   
})

//inactive button

rt.post("/inact_brand", function(req3, res3){
    inactdata=req3.body
    conn.tbl_brands.update({_id:inactdata._id}, {$set:{active:inactdata.active}})
        res3.send("Active button updated")   
})

//active button

rt.post("/act_brand", function(req4, res4){
    actdata=req4.body
    conn.tbl_brands.update({_id:actdata._id}, {$set:{active:actdata.active}})
    res4.send("Inactive button updated")
})












module.exports=rt;
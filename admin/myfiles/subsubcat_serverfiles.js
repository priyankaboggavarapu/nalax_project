exp=require("express")
rt=exp.Router()
mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")

//Getting Category data into dropdown
rt.get("/get_catdata_ssc", function(req,res){
  conn.tbl_cat.find(function(err,result){
    res.send(result)
})

})

//Getting Subcat data in to dropdown
rt.post("/get_subcatdata_ssc", function(req,res){
ob=req.body
conn.tbl_subcat.find({catid:ob.catid},function(err,result2){
    res.send(result2)
})
})

//inserting Sub sub categories
rt.post("/ins_ssubcat", function(re,res2){
    obnew=re.body
    conn.tbl_subsubcat.find().sort({_id:-1}).limit(1, function(err,result4){

        if(result4.length==0)
        iid=1
        else{
            iid=(result4[0]._id)
            iid++
        }
        
   conn.tbl_subsubcat.insert({_id:iid,ssubname:obnew.ssubname,catid:obnew.catid,subcatid:obnew.subcatid,active:1}, function(err,result3){
    res2.send("Sub sub category inserted")

    })   

    })
})



//reading sub sub category data
rt.get("/read_ssubcat", function(re3,res3){
    conn.tbl_subsubcat.find(function(er1,sscreslt){
    conn.tbl_subcat.find(function(er2,screslt){
    conn.tbl_cat.find(function(er3,creslt){
        arr=[]
        for(i=0;i<sscreslt.length;i++){
            obj={}
            obj=sscreslt[i]
        for(j=0;j<screslt.length;j++){
            if(sscreslt[i].subcatid==screslt[j]._id){
                obj.subcatname=screslt[j].subcatname
                break;
            }
        }  
        
        for(k=0;k<creslt.length;k++){
            if(sscreslt[i].catid==creslt[k]._id){
                obj.catname=creslt[k].catname
                break;
            }         
        }   
        arr.push(obj)
        }
        res3.send(arr)
    })    
    })        
        
    })
   
})

//deleting
rt.post("/del_ssubcat", function(re4, res4){
    deldata = re4.body
    conn.tbl_subsubcat.remove(deldata, function(){
        res4.send("Sub sub Category Deleted")
    })
    
})


rt.post("/new_sscat", function(req4, ress4){
    savdt=req4.body
    conn.tbl_subsubcat.update(savdt[0],{$set:savdt[1]})
    ress4.send("Record Saved Successfully")
})


//Inactive
rt.post("/inact_ssubcat", function(req2, ress2){
    inat = req2.body
    conn.tbl_subsubcat.update({_id:inat._id},{$set:{active:inat.active}})
    ress2.send("Record Inactivated")
})

//Active
rt.post("/act_ssubcat", function(req3, ress3){
    inat2 = req3.body
    conn.tbl_subsubcat.update({_id:inat2._id},{$set:{active:inat2.active}})
    ress3.send("Record Activated")
})


module.exports=rt;
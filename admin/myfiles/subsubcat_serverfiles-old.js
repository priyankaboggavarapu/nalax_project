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

        if(result4.length==0){
        iid=1
        
        }
        else{
            iid=(result4[0]._id)
            iid++
        }
        conn.tbl_subsubcat.insert({_id:iid,ssubname:obnew.ssubname,catid:obnew.catid,subcatid:obnew.subcatid,active:1}, function(err,result3){
            
    })
    res2.send("Sub sub category inserted")

   
    })
})

//reading subsubcategories data

rt.get("/get_ssubcat", function(req4, res4){
    conn.tbl_subsubcat.find(function(er1, sscatresult){
     conn.tbl_subcat.find(function(er2, scatresult){
      conn.tbl_cat.find(function(er3, catresult){
        arr=[]
        for(i=0; i<sscatresult.length; i++){
           var  obj={ }
            obj=sscatresult[i]
            for(j=0; j<scatresult.length; j++){
                if(sscatresult[i].subcatid==scatresult[j]._id)
                {
                    obj.subcatname=scatresult[j].subcatname
                    //console.log(obj) 
                }
            }

            for(k=0; k<catresult.length; k++){

                if(sscatresult[i].catid==catresult[k]._id)
                {
                    obj.catname=catresult[k].catname
                }
            }
//console.log(obj)
            arr.push(obj)
        }
   res4.send(arr)
      })   
     })   

    })

 
})

module.exports=rt;
exp=require("express")
rt=exp.Router()

mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")

//Getting Category data into dropdown
rt.get("/get_catdata_ssc1", function(req,res){
    conn.tbl_cat.find(function(err,result){
      res.send(result)
  })
  
  })

//Getting Subcat data in to dropdown
rt.post("/get_subcatdata_ssc2", function(req,res){
    ob=req.body
    conn.tbl_subcat.find({catid:ob.catid},function(err,result2){
        res.send(result2)
    })
    })

    ///////getting  subsubcat data dropdown//////
    rt.post("/get_subsubcatdata_ssc3",function(req,rs){
        obj=req.body
        conn.tbl_subsubcat.find({subcatid:obj.subcatid},function(err,result3){
     rs.send(result3)
   
        })
    })
    
    /////////getting barand dropdown////////////////

    rt.get("/get_branddata",function(re,rs){
        conn.tbl_brands.find(function(err,result4){
            rs.send(result4)
            //console.log("result4")
        })
    })
  
//////////////inserting product details////////////

rt.post("/ins_product", function(re,res2){
    obnew=re.body
    conn.tbl_products.find().sort({_id:-1}).limit(1, function(err,result4){

        if(result4.length==0)
        iid=1
        else{
            iid=(result4[0]._id)
            iid++
        }
        
   conn.tbl_products.insert({_id:iid,pname:obnew.pname,catid:obnew.catid,subcatid:obnew.subcatid,subsubcatid:obnew.subsubcatid,brandid:obnew.brandid,pcolour:obnew.pcolour,pprice:obnew.pprice,pdes:obnew.desprdt,pquantity:obnew.pquantity,prating:obnew.prating}, function(err,result3){
    res2.send(" product inserted")

    })   

    })
})

rt.post("/ins_img",function(req,res){
    ob1=req.body
    conn.tbl_products.find().sort({_id:-1}).limit(1,function(err,result){
        //console.log(result)
        //ob=result[0]._id
        //console.log(ob)
       
     //var ob={pimg:ob1.pimg}
     //console.log(ob)
     conn.tbl_products.update({_id:result[0]._id},{$set:{pimg:ob1.pimg}
    })
})
////////////reading product data///////////


 rt.get("/read_product", function(re3,res3){
    
    conn.tbl_products.find(function(err,pres){
        conn.tbl_subsubcat.find(function(er1,sscreslt){
                conn.tbl_subcat.find(function(er2,screslt){
                conn.tbl_cat.find(function(er3,creslt){
                    arr=[]
                        for(p=0;p<pres.length;p++){
                            obj={}
                            obj=pres[p]
                        //console.log(obj)
                        for(i=0;i<sscreslt.length;i++){
                            if(pres[p].subsubcatid==sscreslt[i]._id){
                                obj.ssubname=sscreslt[i].ssubname
                            }
                        }
                        for(j=0;j<screslt.length;j++){
                            if(pres[p].subcatid==screslt[j]._id){
                                obj.subcatname=screslt[j].subcatname
                                break;
                            }
                        }  
                        
                        for(k=0;k<creslt.length;k++){
                            if(pres[p].catid==creslt[k]._id){
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
})

/////inserting image////////////
rt.post("/up_img",function(re,rs){
    ob=re.body
    conn.products.find().sort({_id:-1}).limit(1,function(err,ires){
        id=result[0]._id
        conn.products.update({_id:id},{$set:{pimage:ob.pimg}})
        res.send("image inserted")
    })
})


})







module.exports=rt;
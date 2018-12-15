exp=require("express")
rt=exp.Router()

mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")

//delete method

rt.post("/del_sub_cat", function(req,res){
    deldata=req.body
    conn.tbl_subcat.remove(deldata,function(){
        res.send("Record deleted")
    })
})

rt.post("/ins_sub_cat",function(req,res){
    ob=req.body
    conn.tbl_subcat.find().sort({_id:-1}).limit(1,function(err,result){
        if(result.length==0)
        iid=1
        else
        {
        iid=(result[0]._id)
        iid++
        }
        //console.log(iid)
        conn.tbl_subcat.insert({_id:iid,subcatname:ob.subcatname,catid:ob.catid,active:1})
        res.send("Sub Category inserted")
    })
})


//reading sub cat data 

rt.get("/get_subcat",function(rq,rs){
    conn.tbl_subcat.find(function(err,result){
        conn.tbl_cat.find(function(err,catresult){
            var arr=[]
            for(i=0;i<result.length;i++)
            {
                for(j=0;j<catresult.length;j++)
                {
                    if(result[i].catid==catresult[j]._id)
                    {
                        obj=result[i]
                        obj.catname=catresult[j].catname
                       // console.log(obj)
                        arr.push(obj)
                    }
                }
            }
            rs.send(arr)
        })
    })
})


//Saving data

rt.post("/savesubcat",function(req,res){
    var ssub=req.body
    conn.tbl_subcat.update(ssub[0],{$set:ssub[1]})
    conn.tbl_cat.update(ssub[0],{$set:ssusub[1]})
   // console.log(ssub)
    res.send("Saved changes")
})

//inactive button 

rt.post("/inactscat", function(re,ress){
    iadata = re.body
    conn.tbl_subcat.update({_id:iadata._id},{$set:{active:iadata.active}})
    ress.send("Document Inactivated")
})

//active button
rt.post("/actscat", function(re2, ress2){
    adata = re2.body
    conn.tbl_subcat.update({_id:adata._id}, {$set:{active:adata.active}})
    ress2.send("Document Activated")
})

module.exports=rt


/*


*/
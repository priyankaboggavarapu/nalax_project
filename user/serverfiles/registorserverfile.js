var exp=require("express")
rout=exp.Router();
mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")

rout.post("/Register",function(req,res){
    ob=req.body
    conn.reg.find().sort({_id:-1}).limit(1,function(err,result){
        if(result.length==0)
        iid=1
        else{
            iid=result[0]._id
            iid++
        }
   
    conn.reg.insert({_id:iid,uname:ob.uname,password:ob.password,repassword:ob.retypepassword,email:ob.email,mobileno:ob.mobileno})
    res.send("Registor successfully ")
  })
})

module.exports=rout;


exp=require("express")
sess=require("express-session")
rout=exp.Router()
wtk=require("JSONWebtoken")
bc=require("bcrypt")
ref=require("./secfile")
mj=require("mongojs")
conn=mj("mongodb://localhost:27017/rajidb")

rout.use(sess({secret:"!@#$",saveUninitialized:true,resave:true}))


rout.post("/login",function(req,res)
{
 
    rdt=req.body
    
    ob=({uname:rdt.uname,password:rdt.password})
    //console.log(ob)
    conn.reg.find(ob,function(err,result){
    
        if(result.length>0){
            uname=result[0].uname
            uid=result[0]._id
            console.log(uid)
            var tk=wtk.sign({id:uname},ref.secret)
            console.log(tk)
            sess=req.session
        
            sess.mals=tk
            console.log(sess.mals)
            res.send({tk:sess.mals,count:1,uname:uname,uid:uid})
        }
        else{
            res.send({count:0})
        }
     
        // console.log(tk)
        //   ses=req.session
        //    console.log(ses)
        //   ses.pk=tk
        //     console.log(tk)
        //     console.log(ses.pk)
        //     console.log(result)
    
         
           
       
    })       
 
    //res.send({log:result})
})

rout.post("/pay",function(req,res){
    sess=req.session
    reqdata=req.body
    if(reqdata.tk==sess.tk){
        res.send("valid")
    }
    else{
        res.send("invalid")
    }
})
/////////////orders///////////////////

rout.post("/orders",function(req,res){
    reqdata=req.body
    console.log(reqdata)
    conn.order.find(function(err,result){
        if(result.length==0){
            id=1
        }
        else{
        idd=result.length-1
        id=result[idd]._id
        id++
        }
        conn.orders.insert({_id:id,uname:reqdata.uname,uid:reqdata.uid,orderid:reqdata.orderid,plist:reqdata.product})
    })
})
module.exports=rout;
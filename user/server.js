exp=require("express")
bp=require("body-parser")


app=exp()
app.use(bp.json())

cat_ref=require("./serverfiles/catserverfile")
subcat_ref=require("./serverfiles/subcatserverfile")
subsubcat_ref=require("./serverfiles/subsubcatserverfile")
product_ref=require("./serverfiles/productserverfile")
login_ref=require("./serverfiles/loginserverfile")
registor_ref=require("./serverfiles/registorserverfile")
more_ref=require("./serverfiles/moreserverfile")

app.use("/catserver",cat_ref)
app.use("/subcatserverfile",subcat_ref)
app.use("/subsubcatserver",subsubcat_ref)
app.use("/productserver", product_ref)
app.use("/loginserver",login_ref)
app.use("/registorserver",registor_ref)
app.use("/moreinfoserver",more_ref)


app.listen(6423)
console.log("Excuted 6423 port number")
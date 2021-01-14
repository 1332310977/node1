var express = require('express')
var fs = require('fs')
var app = express()
const multer = require('multer')
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
    next();
})
var storage = multer.diskStorage({
    destination:function(req,file,cb){ //文件保存路径
        cb(null,'data/images/')
    },
    filename:function(req,file,cb){ //文件名
        cb(null,file.originalname)
    }

})

var upload = multer({ storage: storage })


app.get('/',function(req,res){
    fs.readFile('./upload.html',function(err,data){
        if(err){
            res.writeHead(404,{"Content-Type":"text/plain"})
        }else{
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
        }
        res.end()
    })
})
app.post('/UpImg',upload.array('file',8),(req, res, next)=>{
    let path = './data/images/'
    fs.readdir(path,(err,stats)=>{
        for(var i=0;i<stats.length;i++){
            if(stats[i]==req.files[0].filename){
                res.send({'status':200,'msg':'文件已存在!'})
                res.end();
                return false
            }
        }
        res.send({'status':200,'msg':'成功!'})
        res.end();
    })
})


app.listen(7001,function(){console.log('upload start')})

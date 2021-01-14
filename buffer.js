var express = require('express')
var fs = require('fs')
const path = require('path');
var app = express()
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
// const nbs = new WebSocketServer({port:8081})
app.use('img',express.static('image'))
app.get('/',function(req,res){
    fs.readFile('./buffer.html',function(err,data){
        if(err){
            res.writeHead(404,{"Content-Type":"text/plain"})
        }else{
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
        }
        res.end()
    })

})
app.post('/GetBuff',(req,res)=>{
    if(req.method==='POST'){
      // 存储数组空间
      let msg=[];
      // 接收到数据消息
      req.on('data',(chunk)=>{
        if(chunk){
          msg.push(chunk);
        }
      })
      // 接收完毕
      req.on('end',()=>{
        // 对buffer数组阵列列表进行buffer合并返回一个Buffer
        let buf=Buffer.concat(msg);
        conosole.log(buf)//提取Buffer正确
      })  
    }
})
app.post('/SendBuff',(req,res)=>{
    let fileData = fs.readFileSync(__dirname+'/image/1.doc')
    const read = fs.createReadStream(__dirname+'/image/1.doc')
    read.setEncoding('binary')
    let msg = ''
    let i =0
    read.resume();//让文件流开始'流'动起来
    let chunk = []
    let arr = null
    read.on('data',data =>{//监听读取的数据，如果打印data就是文件的内容
          //第一种
        arr = data
               //第二种
        // chunk[0] = Buffer.from(data)
    })
    read.on('end', () => { //监听状态
            //第一种
        let filepath = './image/1.doc'
        res.send({data:arr,name:path.basename(filepath)})
            //第二种
    //    let filepath = './image/1.doc'
    //    res.send({data:Buffer.concat([chunk[0]]).toString(),name:path.basename(filepath)})
        res.end()
    })


//     let rs = fs.createReadStream(__dirname+'/image/1.doc')
//     rs.setEncoding('binary')
//     rs.resume();//让文件流开始'流'动起来

// let arr = []
// rs.on('data',function(chunk){
//     arr.push(chunk)            //读取文件时，是buffer类型，将每次读取的buffer拼到一个数组内
    
// })
// // 当文件全部读完，触发end
// res.end('end',function(){
//     // let filesData = Buffer.concat(arr).toString()
//     res.send({data:arr})
//     res.end()
// })

// //报错是  触发err        文件不存在，会触发这个事件
// rs.on('err', function(err){
// })











})
app.listen(7001,function(){console.log('start')})
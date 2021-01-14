var express = require('express')
var fs = require('fs')
var mysql  = require('mysql'); 
var WebSocketServer = require('ws').Server
var app = express()
// const nbs = new WebSocketServer({port:8081})
app.use('img',express.static('image'))
app.get('/',function(req,res){
    fs.readFile('./index.html',function(err,data){
        if(err){
            res.writeHead(404,{"Content-Type":"text/plain"})
        }else{
            var connection = mysql.createConnection({     
                host     : 'localhost',       
                user     : 'root',              
                password : '123456',       
                port: '3306',                   
                database: 'websites' 
              }); 
               
              connection.connect();
               
              var  sql = 'SELECT * FROM websites';
              //查
              connection.query(sql,function (err, result) {
                      if(err){
                        console.log('[SELECT ERROR] - ',err.message);
                        return;
                      }
               
                     console.log('--------------------------SELECT----------------------------');
                     console.log(result);
                     console.log('------------------------------------------------------------\n\n');  
              });
               
              connection.end();


            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
        }
        res.end()
    })

})
app.get('/index1.html',function(req,res){
    fs.readFile('./index1.html',function(err,data){
        if(err){
            res.writeHead(404,{"Content-Type":"text/plain"})
        }else{
            res.writeHead(200,{"Content-Type":"text/html"})
            res.write(data)
        }
        res.end()
    })

})
// nbs.on('connection',(ws)=>{
//     ws.on('message',msg=>{
//         const result = JSON.parse(msg)
//         ws.socketIdxos = result.id
//         if(nbs.clients){
//             nbs.clients.forEach(item => {
//                 if(item.socketIdxos==result.to&&item.readyState == 1){
//                     item.send(JSON.stringify({id:item.socketIdxos,mes:result.msg}))
//                 }
//             });
//         }
       
//     })
//     ws.on('close',err=>{
//         console.log(ws.socketIdxos+'退出了连接。')
//     })
// })
app.listen(80,function(){console.log('start')})
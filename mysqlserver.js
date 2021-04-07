const { json } = require('express');
var express = require('express')
var fs = require('fs')
var mysql = require('mysql');
var app = express()
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var formidable = require('formidable');
app.use('img', express.static('image'))
app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Token, Accept, X-Requested-With')
    next()
})
app.get('/', function (req, res) {
    fs.readFile('./sqlserver.html', function (err, data) {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" })
        } else {
            // var connection = mysql.createConnection({     
            //     host     : 'localhost',       
            //     user     : 'root',              
            //     password : '123456',       
            //     port: '3306',                   
            //     database: 'websites' 
            //   }); 
            //   connection.connect();
            //   var  sql = 'SELECT * FROM websites';
            //   //查
            //   connection.query(sql,function (err, result) {
            //           if(err){
            //             console.log('[SELECT ERROR] - ',err.message);
            //             return;
            //           }

            //          console.log('--------------------------SELECT----------------------------');
            //          console.log(result);
            //          console.log('------------------------------------------------------------\n\n');  
            //   });
            // connection.end();
            res.writeHead(200, { "Content-Type": "text/html" })
            res.write(data)
        }
        res.end()
    })

})

app.post('/UploadImgBlob', function (req, res) {  //img 源文件
        var post ='';
        req.on('data', function(chunk){
            post += chunk;
        });
        req.on('end', function(){
            post = querystring.parse(post);
            console.log(post.name)
            console.log('收到参数:'+post['name']); //因为这里是异步，所以不能使用 res.write();
            // console.log('收到参数:'+post['password']);
            //console.log('收到参数:'+post); // Cannot convert object to primitive value
            // *** 这里会报错哟！！！！ ***
        })
    //方法一
        // const Npath =path.join(__dirname+'/Uploads/img/a.png');
        // const Nbase64 = postData.replace(/data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
        // console.log(postData,Nbase64)
        // const NdataBuffer = new Buffer(Nbase64, 'base64'); //把base64码转成buffer对象，
        // fs.writeFile(Npath, NdataBuffer, function(err){//用fs写入文件
        //     if(err){
        //         console.log(err);
        //     }else{
        //         console.log('写入成功！');
        //     }
        // console.log(postData)
        // const buffer = new Buffer(postData, 'binary');
        // fs.writeFile(path.join(__dirname+'/Uploads/img/a.png'), buffer, err => {
        //     if (err) throw err
        //     console.log('文件已被写入')
        // })
        // fs.readFile(path.join(__dirname+"/Uploads/img"),'binary',function(err,filedata)  { //异步执行  'binary' 二进制流的文件
        //     if  (err)  {
        //         console.log(err);
        //         return;
        //     }else{
        //         res.write(filedata,'binary');
        //         res.end();
        //     }
        // });
    // })




//     //方法二
//     var form = new formidable.IncomingForm();
//     form.encoding = 'utf-8';
//     console.log(__dirname + "/Uploads/img")
//     form.uploadDir = path.join(__dirname +'/'+"/Uploads/img");
//     form.keepExtensions = true;//保留后缀
//     form.maxFieldsSize = 2 * 1024 * 1024;
//     form.parse(req, function (err, fields, files) {
//         for(item in fields){
//             (function(){
//                 const Npath =path.join(__dirname+'/Uploads/img/a.png');
//                 const Nbase64 = fields[item].replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
//                 const NdataBuffer = new Buffer(Nbase64, 'base64'); //把base64码转成buffer对象，
//                 fs.writeFile(Npath, NdataBuffer, function(err){//用fs写入文件
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log('写入成功！');
//                 }
//         })
//             })(item);
//         }
//  })


})

app.post('/UploadImg', function (req, res) {  //img 源文件
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    console.log(__dirname + "/Uploads/img")
    form.uploadDir = path.join(__dirname +'/'+"/Uploads/img");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;
    //处理图片
    form.parse(req, function (err, fields, files) {
        for(item in files){
            (function(){
                var oldname = files[item].path;
                var newname =path.join(__dirname+"/Uploads/img/")+files[item].name;
                console.log(oldname,newname)
                fs.renameSync(oldname,newname,function(err){
                    if(err) console.log(err);
                    console.log('修改成功');
                    res.end()
                })
            })(item);
        }
    })
})






app.post('/GetData', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'websites'
    });
    connection.connect();
    var sql = 'SELECT * FROM websites';
    //查
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.send({ 'data': JSON.stringify(result) })
    });

})
app.post('/InsertData', function (req, res) {
    var postData = '';
    // 18. 给req对象注册一个接收数据的事件
    req.on('data', function (chuck) {
        /**data事件详解
         * 浏览器每发送一次数据包（chuck），该函数会调用一次。
         * 该函数会调用多次，调用的次数是由数据和网速限制的
         */
        // 19. 每次发送的都数据都叠加到postData里面
        postData += chuck;
    })
    // 20. 到post请求数据发完了之后会执行一个end事件，这个事件只执行一次
    req.on('end', function () {
        // 21. 此时服务器成功接受了本次post请求的参数
        // post请求最终获取到的数据就是url协议组成结构中的query部分
        console.log(postData);
        // 22. 使用querystring模块来解析post请求
        /**
         * querystring详解
         * 参数：要解析的字符串
         * 返回值：解析之后的对象。
         */
        var postObjc = querystring.parse(postData);
        // 23. 打印出post请求参数，
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'websites'
        });
        connection.connect();
        var addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
        var addSqlParams = [JSON.parse(postObjc.Ob).name, JSON.parse(postObjc.Ob).url, JSON.parse(postObjc.Ob).alexa, JSON.parse(postObjc.Ob).country];
        console.log(addSqlParams,)
        //增
        connection.query(addSql, addSqlParams, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            console.log('--------------------------INSERT----------------------------');
            //console.log('INSERT ID:',result.insertId);        
            console.log('INSERT ID:', result);
            console.log('-----------------------------------------------------------------\n\n');
        });
        res.send({
            code: 0,
            scuress: '成功'
        })
        connection.end()
    })

    // var connection = mysql.createConnection({     
    //     host     : 'localhost',       
    //     user     : 'root',              
    //     password : '123456',       
    //     port: '3306',                   
    //     database: 'websites' 
    //   }); 
    //   connection.connect();
    //   var  sql = 'SELECT * FROM websites';
    //   //查
    //   connection.query(sql,function (err, result) {
    //           if(err){
    //             console.log('[SELECT ERROR] - ',err.message);
    //             return;
    //           }
    //           res.send({'data':JSON.stringify(result)})
    //   });

})
app.listen(80, function () { console.log('start') })
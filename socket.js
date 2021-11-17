var http=require('http');
// var qs = require('querystring'); //
var ws=require('ws');
 
var server=http.createServer(function (req, res) {
    res.end("This is a WebSockets server!");
});
var url = require('url');
//验证函数
function ClientVerify(info) {
    var ret = false;//拒绝
    //url参数
    var params = url.parse(info.req.url, true).query;
    //console.log(groupid);
    //groupid=params['groupid']
    //谁谁谁来到了讨论组
    // wss.clients.forEach(function each(client) {
    //     client.send('233');
    // });
    return true;
 
}
var wss = new ws.Server( { server: server,verifyClient: ClientVerify } );
 
/*//引入数据库
 var mysql = require('mysql');
 //连接数据库信息 普通版
 var connection = mysql.createConnection({
    host  : '1.1.1.1',//数据库链接
    user  : 'root',
    password : 'root',
    database : 'bootdo'
});*/
//引入数据库
let DBHelp = require('./config/DBHelp.js');

// module.exports=query;
let user={};//存储连接用户
let online=0;//存储在线人数
let hourse={}
wss.on('connection', function connection(ws,req) {
    console.log('链接成功！');
    //console.log(ws);
    //查询历史聊天记录 广播给连接的客户端

    let i = req.url;//提取网址参数
    let m = getvar(i,'my')//提取我是谁,
    let type = getvar(i,'type')//type: auction 拍卖 chat 聊天
    
    let u
    let hourseId
    if(type=='auction'){
        hourseId = getvar(i,'hourse');  //拍卖房ID  
        if(hourse[hourseId]!=undefined){
            hourse[hourseId].push(ws)
        }else{
            hourse[hourseId]=[]
            hourse[hourseId].push(ws)
        }
    }
    
    else if(type=='chat'){
        u = getvar(i,'who');  //提取发给谁  
        if(m){
            user[m] = ws;
        };
    }
 
    // let u = i.match(/(?<=:).+?$/);              
    ws.on('message',function(msg){
        console.log('收到'+i+'的消息：'+msg);
        // ws.send(req.headers['sec-websocket-key'])
        // ws.send(req.url)
        if(type=='chat'){
            if (user[u]){
                if (user[u].readyState===1){
                    user[u].send(msg);
                    ws.send('发送成功');
                }else{
                    ws.send('对方掉线');
                }
            }else{
                ws.send('找不到对象');
            }
        }
        else if(type=='auction'){
            
            const auction = require("./controller/auction/auctionController");
            let m = getvar(i,'my')
            let hourseId = getvar(i,'hourse');  //拍卖房ID  
            let wordid = getvar(i,'workid')
            console.log(wordid,m)
            auction.addauction({work_id:wordid,user_id:m,price:msg})
            hourse[hourseId].forEach(function(ws){
                ws.send(msg);
            })
        }
        if(u){
           
        }
        // else{//广播
        //     wss.clients.forEach(function each(client) {
        //         if (client !== ws && client.readyState === WebSocket.OPEN) {
        //             client.send(msg);
        //         }
        //     });
        // }
    })
    // var sql='select * from hi_test where groupid=1';
    // console.log('sql语句',sql);
    // query(sql,function (err,res,fields) {
    //     console.log('sql操作返回：', res);
    //     if(res!=null){
    //         ws.send(JSON.stringify(res));
    //     }
    // });
    // //监听客户端发送得消息
    // ws.on('message', function incoming(data) {
    //     console.log('来自客户端得message:',data);
    //     //保存客户端发送得消息到数据库
    //     sql="insert into hi_test(msg) values(?)";
    //     console.log('sql语句',sql);
    //     query(sql,data,function (err,res,fields) {
    //         console.log('sql操作返回：',res);//res.insertId
    //     });
    //     var sendData=JSON.stringify([{msg:data}])
    //     /**
    //      * 把消息发送到所有的客户端
    //      * wss.clients获取所有链接的客户端
    //      */
    //     wss.clients.forEach(function each(client) {
    //         client.send(sendData);
    //     });
    // });
});

function getvar(url,par){
    var urlsearch = url.split('?');
    pstr = urlsearch[1].split('&');
    for (var i = pstr.length - 1; i >= 0; i--) {
        var tep = pstr[i].split("=");
        if(tep[0] == par){
            return tep[1];
        }
    }
    return(false);
}
 
server.listen(8010, function listening() {
    console.log('服务器启动成功！');
});

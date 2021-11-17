/**
 * 获取列表
 * @type {Connection}
 */
let _ = require('lodash');
let DBHelp = require('../../config/DBHelp.js');
/**
* 获取消息列表
* @param data
* @param success
*/
let noticeList =(data, success) =>{
    var index = data.index?data.index:'0'
    var count = data.count?data.count:'100' 
   const SQL = 'SELECT * FROM notice left join work_details on notice.work_id=work_details.id left join user_infor on notice.friend_id=user_infor.open_id  WHERE notice.user_id=\''+data.user_id+'\' and notice.type = '+data.type;
   const resultData = {
    code: null,
    data: null,
    codeMessage: null
    }
    DBHelp(SQL, (error, result, fields) =>{
    if(error){
        resultData.error = error.message
    }
    resultData.code = 200;
    resultData.data = result;
    resultData.codeMessage = 'success'
    success(resultData);
})
};
/**
 * 获取消息集合
 * @param {*} data 
 * @param {*} success 
 */
let allNoticeList =(data, success) =>{
    const SQL = 'SELECT * FROM notice left join user_infor on notice.friend_id=user_infor.open_id WHERE user_id=\''+data.user_id+'\' or type = 3 ';
    const resultData = {
    code: null,
    data: null,
    codeMessage: null
    }
    console.log(SQL)
    DBHelp(SQL, (error, result, fields) =>{
        console.log(result)
        if(error){
            resultData.error = error.message
        }
        var e_result={
            zan:{
                length:0,
                content:''
            },
            comment:{
                length:0,
                content:''
            },
            sys:{
                length:0,
                content:''
            },
            friend:[
            ]
        }
        if(result.length>0)
        result.forEach((item,index) => {
            //已读的一个条信息
            if(item.type == 1 && e_result.zan.content==''){
                e_result.zan.content = item.school+'的'+item.name+'点赞了你'
            }
            if(item.type == 2 && e_result.comment.content==''){
                e_result.comment.content = item.school+'的'+item.name+'评论了你'
            }
            if(item.type == 3 && e_result.sys.content==''){
                e_result.sys.content = item.content
            }
            //未读信息处理
            //1:点赞 2评论 3系统 4用户消息
            if(item.type == 1 && item.state==0){
                e_result.zan.length++;
                e_result.zan.content = item.school+'的'+item.name+'点赞了你'
            }
            if(item.type == 2 && item.state==0){
                e_result.comment.length++;
                e_result.comment.content = item.school+'的'+item.name+'评论了你'
            }
            if(item.type == 3 && item.state==0){
                e_result.sys.length++;
                e_result.sys.content = item.content
            }
            if(item.type == 4){
                e_result. friend.push({
                    avatar:item.avatar, 
                    name:item.name,
                    open_id:item.open_id,
                    time:item.time,
                    content:item.content,
                })
            }
        })
   
    resultData.code = 200;
    resultData.data = e_result;
    resultData.codeMessage = 'success'
    success(resultData);
})
}
/**
* 添加消息
* @param data
* @param success
*/
let addnotice =(data, success) =>{
    let SQL = 'INSERT INTO notice (user_id, friend_id, type,content) VALUES (?,?,?,?)';
    let SQL_DATA = [data.user_id, data.friend_id, data.type, data.content]

    const resultData = {
        code: null,
        data: null,
        codeMessage: null
    }
    DBHelp(SQL, SQL_DATA).then(results => {
        resultData.code = 200;
        resultData.data = {results};
        resultData.codeMessage = '成功';
        success(resultData);
    }).catch(error => {
        resultData.error = error.message
        success(resultData);
    })
};
let msgList =(data, success) =>{
    var index = data.index?data.index:'0'
    var count = data.count?data.count:'100' 
   const SQL = 'SELECT * FROM notice left join user_infor on notice.user_id=user_infor.open_id  WHERE (notice.user_id=\''+data.user_id+'\' and notice.type = 4 and notice.friend_id='+data.friend_id+')or(notice.friend_id=\''+data.user_id+'\' and notice.type = 4 and notice.user_id='+data.friend_id+') ORDER BY `time`';
   const resultData = {
    code: null,
    data: null,
    codeMessage: null
    }
    DBHelp(SQL, (error, result, fields) =>{
    if(error){
        resultData.error = error.message
    }
    resultData.code = 200;
    resultData.data = result;
    resultData.codeMessage = 'success'
    success(resultData);
})
};
module.exports ={
    noticeList,
    addnotice,
    allNoticeList,
    msgList,
}


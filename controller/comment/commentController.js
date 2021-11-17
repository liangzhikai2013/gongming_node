/**
 * 获取列表
 * @type {Connection}
 */
let _ = require('lodash');
let DBHelp = require('../../config/DBHelp.js');
let wxMsgCheck = require('../../common/WxUtils').wxMsgCheck 
/**
* 获取评论列表
* @param data
* @param success
*/
let commentList =(data, success) =>{
    var index = data.index?data.index:'0'
    var count = data.count?data.count:'100' 
   const SQL = 'SELECT * FROM comment,user_infor WHERE comment.open_id=user_infor.open_id and work_id = '+data.work_id;
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
* 发送评论
* @param data
* @param success
*/
let addcomment =async (data, success) =>  {
    const result = await wxMsgCheck( data.comment)
    if (result.errcode === 0) {
    let SQL = 'INSERT INTO comment (open_id, comment, work_id) VALUES (?,?,?)';
    let SQL_DATA = [data.open_id, data.comment, data.work_id]

    const resultData = {
        code: null,
        data: null,
        codeMessage: null
    }
    DBHelp(SQL, SQL_DATA).then(results => {
        resultData.code = 200;
        resultData.data = '';
        resultData.codeMessage = '成功';
        success(resultData);
    }).catch(error => {
        resultData.error = error.message
        success(resultData);
    })
    }
    else{
        const resultData = {
            code: null,
            data: null,
            codeMessage: '评论内容未通过审核'
        }
        success(resultData);
    }
};

module.exports ={
    commentList,
    addcomment
}


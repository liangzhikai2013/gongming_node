/**
 * 获取列表
 * @type {Connection}
 */
 let _ = require('lodash');
 let DBHelp = require('../../config/DBHelp.js');
 /**
 * 获取拍卖配置
 * @param data
 * @param success
 */
 let auctionConfig =(data, success) =>{
    const SQL = 'SELECT * FROM auction_config where work_id = '+data.work_id;
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
  * 添加拍卖记录
  * @param {*} data 
  */
 let addauction =(data)=> {
    const SQL_DATA =[data.work_id,data.user_id,data.price]
    let SQL = 'INSERT INTO auction (work_id,user_id,price) VALUES (?,?,?)'
    DBHelp(SQL, SQL_DATA)

 }
 /**
  * 获取拍卖记录
  * @param {*} data 
  * @param {*} success 
  */

 let auctionList =(data, success) =>{
    const SQL = 'SELECT * FROM auction left join user_infor on auction.user_id=user_infor.open_id  where auction.work_id = '+data.work_id+' ORDER BY auction.creat_time DESC';
    console.log(SQL)
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
    auctionConfig,
    addauction,
    auctionList
 }
 
 
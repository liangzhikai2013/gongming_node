/**
 * 获取列表
 * @type {Connection}
 */
let _ = require('lodash');
let DBHelp = require('../../config/DBHelp.js');
/**
* 获取banner列表
* @param data
* @param success
*/
let bannerList =(data, success) =>{
   const SQL = 'SELECT * FROM banner';
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
    bannerList
}


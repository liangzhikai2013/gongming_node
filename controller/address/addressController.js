/**
 * 获取地址
 * @type {Connection}
 */
let _ = require('lodash');
let DBHelp = require('../../config/DBHelp.js');
/**
* 获取地址列表
* @param data
* @param success
*/
let addressList =(data, success) =>{
   
   const SQL = 'SELECT * FROM address WHERE address.show=1 and address.user_id=\''+data.user_id+'\'';
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
* 获取默认地址列表
* @param data
* @param success
*/
let defaultAddress =(data, success) =>{
   
   const SQL = 'SELECT * FROM address WHERE default=1 and user_id=\''+data.user_id+'\'';
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
* 获取默认地址列表
* @param data
* @param success
*/
let addressByID =(data, success) =>{
   
    const SQL = 'SELECT * FROM address WHERE  address.id='+data.id;
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
/**
* 添加地址
* @param data
* @param success
*/
let addAddress =(data, success) =>{
    let SQL = 'INSERT INTO address (name,phone,location, address, user_id) VALUES (?,?,?,?,?)';
    let SQL_DATA = [data.name, data.phone, data.location,data.address,data.user_id]

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

/**
* 设置默认地址
* @param data
* @param success
*/
let setDefaultAddress =(data, success) =>{
    let SQL = "update address set address.default = 0 WHERE user_id="+data.user_id+";update address set address.default = 1 WHERE id="+data.id;
   
    console.log(SQL)
    const resultData = {
        code: null,
        data: null,
        codeMessage: null
    }
    DBHelp(SQL).then(results => {
        resultData.code = 200;
        resultData.data = {results};
        resultData.codeMessage = '成功';
        success(resultData);
    }).catch(error => {
        resultData.error = error.message
        success(resultData);
    })
};
/**
* 设置默认地址
* @param data
* @param success
*/
let deleAddress =(data, success) =>{
    let SQL = "update address set address.show = 0 WHERE id="+data.id;
   
    console.log(SQL)
    const resultData = {
        code: null,
        data: null,
        codeMessage: null
    }
    DBHelp(SQL).then(results => {
        resultData.code = 200;
        resultData.data = {results};
        resultData.codeMessage = '成功';
        success(resultData);
    }).catch(error => {
        resultData.error = error.message
        success(resultData);
    })
}
/**
* 修改地址
* @param data
* @param success
*/
let updateAddress=(data,success)=>{
  
    let SQL = "update address set " 
   
  // 遍历拼接生成SQL语句
  _.forEach(data, (val, key) => {
    val = JSON.stringify(val);
    if (key != "id") {
      SQL = SQL + key + "=" + val + ",";
    } else {
      // 去掉最后一次拼接的逗号
      SQL = SQL.substring(0, SQL.length - 1);
      SQL = SQL + " WHERE " + key + "=" + val;
    }
  });
    console.log(SQL)
    const resultData = {
        code: null,
        data: null,
        codeMessage: null
    }
    DBHelp(SQL).then(results => {
        resultData.code = 200;
        resultData.data = {results};
        resultData.codeMessage = '成功';
        success(resultData);
    }).catch(error => {
        resultData.error = error.message
        success(resultData);
    })
}
module.exports ={
    addressList,
    addAddress,
    defaultAddress,
    setDefaultAddress,
    deleAddress,
    updateAddress,
    addressByID
}


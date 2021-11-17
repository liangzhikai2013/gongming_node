/**
 * 获取列表
 * @type {Connection}
 */
let _ = require("lodash");
let DBHelp = require("../../config/DBHelp.js");
let getWork = (data, success) => {
  // SQL 语句
  let SQL =
    "SELECT * FROM work_details left join user_infor on work_details.user_id=user_infor.open_id left join user_work on work_details.id = user_work.work_id and " +
    
    "user_work.open_id='"+data.my_open_id+' \' where work_details.online = 1 and ';
  let counter = 0;
  console.log(SQL);
  var index = data.index ? data.index : "0";
  var count = data.count ? data.count : "20";
  // 多个条件时循环data去除key, val
  _.forEach(data, (key, val) => {
    if (val == "index" || val == "count" || val == "my_open_id") return;
    if (val == "search")
      //待确认模糊查询语句
      // SQL = SQL + 'where '
      SQL = SQL
    //   SQL =
    //     SQL +
    //     " and work_details." +
    //     val +
    //     "= " +
    //     key +
    //     " OR " +
    //     "work_details." +
    //     val +
    //     " LIKE %" +
    //     key +
    //     "%";
    else SQL = SQL + " work_details." + val + "= '" + key + '\' and ';
  });
  console.log(SQL.substring(SQL.length-4,SQL.length))
  if(SQL.substring(SQL.length-4,SQL.length-1)=='and')
  SQL = SQL.substring(0,SQL.length-4);
  
  SQL = SQL + ' ORDER BY work_details.id DESC';
  SQL = SQL + " limit " + index + "," + count;

  console.log(SQL);
  // if (data) {
  //     if (data.id) {
  //        SQL = 'SELECT * FROM WEBSITES WHERE id in ('+data.id+')';
  //     } else if (data.name) {
  //        SQL = 'SELECT * FROM WEBSITES WHERE name in ('+data.name+')';
  //     } else if (data.url) {
  //         SQL = 'SELECT * FROM WEBSITES WHERE url in ('+data.url+')';
  //     }else if (data.alexa) {
  //         SQL = 'SELECT * FROM WEBSITES WHERE alexa in ('+data.alexa+')';
  //     }else if (data.country) {
  //         SQL = 'SELECT * FROM WEBSITES WHERE country in ('+data.country+')';
  //     }
  // }

  /**
   * resultData
   * @code: 状态码
   * @data：data
   * @codeMessage: 状态消息
   */
  const resultData = {
    code: null,
    data: null,
    codeMessage: null,
  };
  DBHelp(SQL, (error, result, fields) => {
    if (error) {
      resultData.error = error.message;
    }
    resultData.code = 200;
    resultData.data = result;
    resultData.codeMessage = "success";
    success(resultData);
  });
};
/**
 * 获取作品类型列表
 * @param data
 * @param success
 */
let typeList = (data, success) => {
  const SQL = "SELECT * FROM work_type";
  const resultData = {
    code: null,
    data: null,
    codeMessage: null,
  };
  DBHelp(SQL, (error, result, fields) => {
    if (error) {
      resultData.error = error.message;
    }
    resultData.code = 200;
    resultData.data = result;
    resultData.codeMessage = "success";
    success(resultData);
  });
};
/**
 * 添加作品类型列表
 * @param data
 * @param success
 */
let addWork = (data, success) => {
  let SQL =
    "INSERT INTO work_details (title, user_id, type, tag,img_list,online,description,count,cover_img,freight_flage,freight,price) VALUES (?,?,?,?,?,1,?,?,?,?,?,?)";
  let SQL_DATA = [
    data.title,
    data.user_id,
    data.type,
    data.tag,
    data.img_list,
    data.description,
    data.count,
    data.img_list.split(",")[0],
    data.freight_flage,
    data.freight,
    data.price
  ];

  const resultData = {
    code: null,
    data: null,
    codeMessage: null,
  };
  DBHelp(SQL, SQL_DATA)
    .then((results) => {
      console.log(results)
      var SQL_=''
      var SQL_DATA_ =''
      if(data.type=='3'){
        SQL_ =
        "INSERT INTO luck_config (work_id, winners, start_time, end_time) VALUES (?,?,?,?)";
      SQL_DATA_ = [results.insertId,data.winners,data.start_time,data.end_time]
      console.log(SQL_)
      }
      if(data.type=='4'){
        SQL_ =
        "INSERT INTO auction_config (work_id,bond,hourse_id, starting_price, price_step,start_time,end_time) VALUES (?,?,?,?,?,?,?)";
        SQL_DATA_= [results.insertId,data.bond*1,Math.random().toString(36).substr(-10),data.start_price ,data.price_step,data.start_time,data.end_time,]
      console.log(SQL_)  
      console.log(SQL_DATA_)  
    }
    if(SQL_!='')
      DBHelp(SQL_, SQL_DATA_)
    .then((results) => {
      resultData.code = 200;
      resultData.data = { results };
      resultData.codeMessage = "成功";
      success(resultData);
    })
    else
      resultData.code = 200;
      resultData.data = { results };
      resultData.codeMessage = "成功";
      success(resultData);
     
    })
    .catch((error) => {
      resultData.error = error.message;
      success(resultData);
    });
};

let updateWork = (data, success) => {
  let SQL = "UPDATE work_details SET ";
  const resultData = {
    code: null,
    data: null,
    codeMessage: null,
  };
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
  console.log(SQL);

  DBHelp(SQL, (error, result, fields) => {
    if (error) {
      resultData.error = error.message;
    }
    resultData.code = 200;
    resultData.data = result;
    resultData.codeMessage = "success";
    success(resultData);
  });
};
/**
 *
 * @param {*} data |state:1点赞 2收藏 3取消点赞 4取消收藏
 * @param {*} success
 *
 */
let operationWork = (data, success) => {
  const resultData = {
    code: null,
    data: null,
    codeMessage: null,
  };
  var SQL = "";

  const SQL_ =
    "SELECT * FROM user_work WHERE open_id= '" +
    data.open_id +
    "' and work_id=" +
    data.work_id;
  //点赞
  if (data.state == 1) {
    SQL =
      "INSERT INTO user_work (open_id, work_id, state) VALUES (?,?,?);update work_details set zan = zan+1 where id =" +
      data.work_id +
      ";";
      console.log(SQL_)
    DBHelp(SQL_, (error, result, fields) => {
        console.log(error)
      if (error) {
        resultData.code = 200;
        resultData.error = error.message;
        success(resultData);
      }
      if (result.length > 0) {
        if (result[0].state == 1 || result[0].state == 3) {
          resultData.code = 200;
          resultData.data = "";
          resultData.codeMessage = "请勿重复点赞";
          success(resultData);
        } else {
           var state =  result[0].state|1 
          var _sql =
            "update user_work set state = " + state +
              " WHERE open_id=\'" +
              data.open_id +
              "\' and work_id=" +
              data.work_id +
              ";update work_details set zan = zan+1 where id =" +
              data.work_id +
              ";";
              console.log(_sql)
          DBHelp(_sql, (error, result, fields) => {
            if (error) resultData.error = error;
            resultData.code = 200;
            resultData.data = "";
            resultData.codeMessage = "成功";
            success(resultData);
          });
        }
      } else {
        DBHelp(SQL, [data.open_id, data.work_id, 1])
          .then((results) => {
            resultData.code = 200;
            resultData.data = { results };
            resultData.codeMessage = "成功";
            success(resultData);
          })
          .catch((error) => {
            resultData.error = error.message;
            success(resultData);
          });
      }
    });
  }
  //收藏
  else if (data.state == 2) {
    SQL =
      "INSERT INTO user_work (open_id, work_id, state) VALUES (?,?,?);update work_details set collection = collection+1 where id =" +
      data.work_id +
      ";";
    DBHelp(SQL_, (error, result, fields) => {
      if (error) {
        resultData.code = 200;
        resultData.error = error.message;
        success(resultData);
      }
      if (result.length > 0) {
        if (result[0].state == 2 || result[0].state == 3) {
          resultData.code = 200;
          resultData.data = "";
          resultData.codeMessage = "请勿重复点赞";
          success(resultData);
        } else {
            var state = result[0].state|2+''
          var _sql =
            "update user_work set state = " + state +
              " WHERE open_id=\'" +
              data.open_id +
              "\' and work_id=" +
              data.work_id +
              ";update work_details set collection = collection+1 where id =" +
              data.work_id +
              ";";
              console.log(_sql)
          DBHelp(_sql, (error, result, fields) => {
            if (error) resultData.error = error;
            resultData.code = 200;
            resultData.data = "";
            resultData.codeMessage = "成功";
            success(resultData);
          });
        }
      } else {
        DBHelp(SQL, [data.open_id, data.work_id, 1])
          .then((results) => {
            resultData.code = 200;
            resultData.data = { results };
            resultData.codeMessage = "成功";
            success(resultData);
          })
          .catch((error) => {
            resultData.error = error.message;
            success(resultData);
          });
      }
    });
  }
  //取消点赞
  else if (data.state == 3) {
    DBHelp(SQL_, (error, result, fields) => {
        var state = result[0].state&2+''
        var _sql =
      "update user_work set state = " + state +
        " WHERE open_id=\'" +
        data.open_id +
        "\' and work_id=" +
        data.work_id +
        ";update work_details set zan = zan-1 where id =" +
        data.work_id +
        ";";
    console.log(_sql)
    DBHelp(_sql, (error, result, fields) => {
      if (error) resultData.error = error;
      resultData.code = 200;
      resultData.data = "";
      resultData.codeMessage = "成功";
      success(resultData);
    });
    })
    
  }
  //取消收藏
  else if (data.state == 4) {
    DBHelp(SQL_, (error, result, fields) => {
        var state = result[0].state&1
        var _sql =
      "update user_work set state = " + state +
        " WHERE open_id=\'" +
        data.open_id +
        "\' and work_id=" +
        data.work_id +
        ";update work_details set collection = collection-1 where id =" +
        data.work_id +
        ";";
    console.log(_sql)
    DBHelp(_sql, (error, result, fields) => {
      if (error) resultData.error = error;
      resultData.code = 200;
      resultData.data = "";
      resultData.codeMessage = "成功";
      success(resultData);
    });
    })
    
  }

};
/**
 * 
 * @param {*} data 
 * @param {*} success 
 */
let collectionList = (data,success) =>{
// SQL 语句
let SQL =
"SELECT * FROM user_work left join work_details on user_work.work_id = work_details.id left join user_infor on work_details.user_id = user_infor.open_id  left join follow_list on user_infor.open_id = follow_list.follow and \'"+data.user_id +"\' = follow_list.user_id where user_work.open_id = \'" +
data.user_id +'\' and (state=2 or  state=3)'
const resultData = {
    code: null,
    data: null,
    codeMessage: null,
  };
console.log(SQL)
DBHelp(SQL, (error, result, fields) => {
    if (error) {
      resultData.error = error.message;
    }
    resultData.code = 200;
    resultData.data = result;
    resultData.codeMessage = "success";
    success(resultData);
  });
}
/**
 * 
 * @param {*} data 
 * @param {*} success 
 */
let offlineWork = (data,success) =>{
  // SQL 语句
  let SQL =
  "update work_details set online = 0 WHERE id=" +
  data.id
  const resultData = {
      code: null,
      data: null,
      codeMessage: null,
    };
  console.log(SQL)
  DBHelp(SQL, (error, result, fields) => {
      if (error) {
        resultData.error = error.message;
      }
      resultData.code = 200;
      resultData.data = result;
      resultData.codeMessage = "success";
      success(resultData);
    });
  }
module.exports = {
  getWork,
  typeList,
  addWork,
  updateWork,
  operationWork,
  collectionList,
  offlineWork
};

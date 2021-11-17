/**
 * description：用户
 * createTime: 2018-11-02
 * message: 不接受任何私下吐槽，直接提出意见即可
 */
const _ = require('lodash');
const DB = require('../../config/DBHelp.js');
/**
 * 返回的状态信息
 */
const resultData = {code: '', data: '', message:''}

const handleResultSuccess = (response, results) =>{
    resultData.code = results.code || null;
    resultData.data = results.data || null;
    resultData.message = results.message || null;
    response.end(JSON.stringify(resultData));
}
const handleResultError = (response, error) =>{
    resultData.code = error.code;
    resultData.data = '';
    resultData.message = error.sqlMessage;
    response.end(JSON.stringify(resultData));
}
class userController {
    /**
     * 添加用户
     * @param request
     * @param response
     * @param next
     */
    static add(request, response, next) {
        const data = request.body;
        const SQL_ = 'SELECT * FROM user_infor WHERE open_id=\''+data.open_id+'\'';
       console.log(SQL_)
        const SQL = 'INSERT INTO user_infor (name, school,gender,major,phone,open_id,student_num,auth,card_img,grade) VALUES (?,?,?,?,?,?,?,0,?,?)';
        const SQL_DATA = [data.name, data.school, data.gender, data.major, data.phone, data.open_id, data.student_num,data.card_img,data.grade];
        // 判断用户是否存在SELECT * FROM `user` WHERE user_name='donglei'
        DB(SQL_).then(results =>{
            console.log(results)
           if (results.length == 0) {
               DB(SQL, SQL_DATA).then(results => {
                   results.code = '200';
                   results.message = '成功';
                   handleResultSuccess(response, results);
               }).catch(error => {
                   handleResultError(response, error);
               });
           } else {
               results.message = '该用户已经存在';
               handleResultSuccess(response, results);
           }
        }).catch(error =>{
            handleResultError(response, error);
        })
    };
    /**
     * 删除用户
     * @param request
     * @param response
     * @param next
     */
    static delete(request, response, next) {
        const data = request.query;
        const SQL = 'DELETE FROM user_infor WHERE open_id=\''+data.open_id+'\''
        DB(SQL).then(results =>{
            results.code = '200';
            results.message = '成功';
            handleResultSuccess(response, results);
        }).catch(error =>{
            handleResultError(response, error);
        })
    };

    /**
     * 用户修改
     * @param request
     * @param response
     * @param next
     */
    static update (request, response, next) {
        const data = request.body;
        let SQL = 'UPDATE user_infor SET ';
        // 遍历拼接生成SQL语句
        _.forEach(data, (val, key) =>{
            val = JSON.stringify(val)
            if (key != 'open_id'){
                SQL = SQL + key+'='+val+',';
            } else {
                // 去掉最后一次拼接的逗号
                SQL = SQL.substring(0,SQL.length-1);
                SQL = SQL + ' WHERE ' + key+'='+val;
            }
        });
        console.log(SQL)
        DB(SQL).then(results =>{
            results.code = '200';
            results.message = '成功';
            handleResultSuccess(response, results);
        }).catch(error =>{
            handleResultError(response, error);
        })
    };
    /**
     * 获取用户列表
     * @param request
     * @param response
     * @param next
     */
    static list(request, response, next) {
        const SQL = 'SELECT * FROM user_infor';
        DB(SQL).then(results => {
            results.code = '200';
            results.data = results;
            results.message = '成功';
            handleResultSuccess(response, results);
        }).catch(error => {
            handleResultError(response, error);
        });
    };

    /**
     * 用户查找
     * @param request
     * @param response
     * @param next
     */
    static find(request, response, next) {
        const data = request.query;
        // SQL 语句
        let SQL = 'SELECT * FROM user_infor WHERE open_id=\''+data.open_id+'\'';

        console.log(SQL)
        DB(SQL).then(results => {
            results.code = '200';
            results.data = results;
            results.message = '成功';
            handleResultSuccess(response, results);
        }).catch(error => {
            handleResultError(response, error);
        })
    };
    /**
     * 关注用户
     */
    static follow(request, response,next){
        const data =request.query;
        let SQL = 'INSERT INTO follow_list (user_id,follow) VALUES (?,?)'
        const SQL_ = 'SELECT * FROM follow_list WHERE user_id=\''+data.user_id+'\' AND follow=\''+data.follow+'\'';
        let SQL_DATA = [data.user_id,data.follow]
        DB(SQL_).then(results =>{
            if (results.length == 0) {
            DB(SQL, SQL_DATA).then(results => {
                SQL = 'update user_infor set follow = follow+1 where open_id =\''+data.user_id +'\';update user_infor set fans = fans+1 where open_id =\''+data.follow+'\''
                DB(SQL).then(results => {
                    results.code = '200';
                    results.data = results;
                    results.message = '成功';
                    handleResultSuccess(response, results);
                }).catch(error => {
                    handleResultError(response, error);
                })
            }).catch(error => {
                handleResultError(response, error);
            })
            }
            else{
                results.code = '200';
                results.data = '已关注';
                results.message = '成功';
                handleResultSuccess(response, results);
            }
        }).catch(error => {
            handleResultError(response, error);
        })
    }
     /**
     * 取消关注用户
     */
    static unfollow(request, response,next){
        const data =request.query;
        let SQL = 'DELETE FROM follow_list where user_id=\''+data.user_id+'\' AND follow=\''+data.follow+'\''
        DB(SQL).then(results =>{
            SQL = 'update user_infor set follow = follow-1 where open_id =\''+data.user_id +'\';update user_infor set fans = fans-1 where open_id =\''+data.follow+'\''
            DB(SQL).then(results => {
                results.code = '200';
                results.data = results;
                results.message = '成功';
                handleResultSuccess(response, results);
            }).catch(error => {
                handleResultError(response, error);
            })
        })
       
    }
    static isfollow(request, response,next){
        const data =request.query;
        const SQL_ = 'SELECT * FROM follow_list WHERE user_id=\''+data.user_id+'\' AND follow=\''+data.follow+'\'';
        DB(SQL_).then(results =>{
            results.code = '200';
            results.data = results.length;
            results.message = '成功';
            handleResultSuccess(response, results);
        })
    }

}

module.exports = userController
let express = require('express');
let router = express.Router();
let work = require('../controller/work/workController');
// /**
//  * 数据查询
//  */
// router.get('/work/list/get', (request, response, next)=>{
//   work.getWork(request.query, data =>{
//     response.end(JSON.stringify(data));
//   })
// });
// /**
//  * 作品类型
//  */
// router.get('/work/typelist', (request, response, next)=>{
//   work.typeList(request.query, data =>{
//     response.end(JSON.stringify(data));
//   })
// });
// /**
//  * 数据新增
//  * @type {Router|router}
//  * request.body.XX
//  */
// router.post('/work/add', (request, response, next)=>{
//   // request.body = {
//   //   name: '测试',
//   //   url: 'http://www.test.aa',
//   //   alexa: '32',
//   //   country: 'CN'
//   // }
 
//   addWork(request.body, data =>{
//     console.log('data',data)
//     response.end(JSON.stringify(data));
//   })
// });
module.exports = router;

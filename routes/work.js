const express = require("express");
const router = express.Router();
const work = require("../controller/work/workController");
// 新增作品
router.get("/get", (request, response, next) => {
  work.getWork(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});
// 下架作品
router.get("/offlineWork", (request, response, next) => {
  work.offlineWork(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});

/**
 * 作品类型
 */
router.get("/typelist", (request, response, next) => {
  work.typeList(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});
/**
 * 数据新增
 */
router.post("/add", (request, response, next) => {
  // request.body = {
  //   name: '测试',
  //   url: 'http://www.test.aa',
  //   alexa: '32',
  //   country: 'CN'
  // }

  work.addWork(request.body, (data) => {
    console.log("data", data);
    response.end(JSON.stringify(data));
  });
});
// 修改作品
router.post("/update", (request, response, next) => {
    work.updateWork(request.body, (data) => {
      response.end(JSON.stringify(data));
    });
});

// 修改作品
router.post("/operationWork", (request, response, next) => {
  work.operationWork(request.body, (data) => {
    response.end(JSON.stringify(data));
  });
});

// 收藏列表
router.get("/collectionList", (request, response, next) => {
  work.collectionList(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});

module.exports = router;

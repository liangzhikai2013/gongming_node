const express = require("express");
const router = express.Router();
const notice = require("../controller/notice/noticeController");
// 获取
router.get("/noticelist", (request, response, next) => {
  notice.noticeList(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});

// 获取全部
router.get("/allnoticelist", (request, response, next) => {
  notice.allNoticeList(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});
// 获取好友对话列表
router.get("/msglist", (request, response, next) => {
  notice.msgList(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});
// 添加评论
router.post("/addnotice", (request, response, next) => {
  notice.addnotice(request.body, (data) => {
      console.log("data", data);
      response.end(JSON.stringify(data));
    });
});
module.exports = router;

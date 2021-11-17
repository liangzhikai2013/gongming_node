const express = require("express");
const router = express.Router();
const comment = require("../controller/comment/commentController");
// 获取评论
router.get("/commentlist", (request, response, next) => {
    comment.commentList(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});
// 添加评论
router.post("/addcomment", (request, response, next) => {
    comment.addcomment(request.body, (data) => {
        console.log("data", data);
        response.end(JSON.stringify(data));
      });
});
module.exports = router;

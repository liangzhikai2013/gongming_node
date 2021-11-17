const express = require("express");
const router = express.Router();
const auction = require("../controller/auction/auctionController");
// 获取拍卖配置
router.get("/auctionConfig", (request, response, next) => {
    auction.auctionConfig(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});
// 获取拍卖记录
router.get("/auctionList", (request, response, next) => {
  auction.auctionList(request.query, (data) => {
  response.end(JSON.stringify(data));
});
});


module.exports = router;

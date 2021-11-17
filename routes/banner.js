const express = require("express");
const router = express.Router();
const banner = require("../controller/banner/bannerController");
// 新增作品
router.get("/get", (request, response, next) => {
  banner.bannerList(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});

module.exports = router;

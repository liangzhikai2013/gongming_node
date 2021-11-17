const express = require("express");
const router = express.Router();
const address = require("../controller/address/addressController");
// 获取地址类别
router.get("/addressList", (request, response, next) => {
  address.addressList(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});
// 获取默认地址
router.get("/defaultAddress", (request, response, next) => {
  address.defaultAddress(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});
// 添加默认地址
router.post("/addAddress", (request, response, next) => {
  address.addAddress(request.body, (data) => {
    response.end(JSON.stringify(data));
  });
});
// 设置默认地址
router.get("/setDefaultAddress", (request, response, next) => {
  address.setDefaultAddress(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});
// 删除地址
router.get("/deleAddress", (request, response, next) => {
  address.deleAddress(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});
// 修改地址
router.post("/updateAddress", (request, response, next) => {
  address.updateAddress(request.body, (data) => {
    response.end(JSON.stringify(data));
  });
});
// 获取地址byID
router.get("/addressByID", (request, response, next) => {
  address.addressByID(request.query, (data) => {
    response.end(JSON.stringify(data));
  });
});


module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controller/user/userController');
// 新增用户
router.post('/add', userController.add);
// 删除用户
router.get('/delete', userController.delete);
// 修改用户信息
router.post('/update', userController.update);
// 获取用户列表
router.get('/list', userController.list);
// 用户查询
router.get('/find', userController.find);
// 用户关注
router.get('/follow', userController.follow);
// 用户关注
router.get('/unfollow', userController.unfollow);
// 用户是否关注
router.get('/isfollow', userController.isfollow);
module.exports = router;

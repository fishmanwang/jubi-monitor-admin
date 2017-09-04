var express = require("express");
var router = express.Router();
var mysql = require('../service/mysql_pool')

router.get("/login", function(req, res, next) {
   res.render("login")
});

router.post("/login", function(req,res, next) {

   console.log("name: ", req.body.username);
   console.log("password: ", req.body.password);
   // mysql.exec('select * from zx_user', function(err, result) {
   //    if (err) {
   //       console.log("查询用户失败: ", err)
   //       return;
   //    }
   //    console.log(result)
   // })
});

module.exports = router
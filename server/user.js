const express = require('express');
const router = express.Router();
const utility = require('utility');
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = { pwd: 0, __v: 0 };

router.get('/list', (req, res) => {
  const { type } = req.query;
  let condition = {};
  if (type) {
    condition = {type};
  }
  // User.remove({}, function (err, doc) {});
  User.find(condition, function (err, doc) {
    return res.json({code: 0, data: doc});
  });
});

router.get('/getmsglist', (req, res) => {
  const userid = req.cookies.userid;

  User.find({}, function (e, userdoc) {  
    let users = {};
    userdoc.forEach(v => {
      users[v._id] = {name: v.user, avatar: v.avatar};
    });
    Chat.find({'$or': [{from: userid}, {to: userid}]}, function (err, doc) {
      if (!err) {
        return res.json({code: 0, msgs: doc, users});
      }
    });
  });
});

router.post('/readmsg', (req, res) => {
  const userid = req.cookies.userid;
  const {from} = req.body;
  Chat.update({from, to: userid}, {'$set': {read: true}}, {'multi': true}, function (err, doc) {
    if (!err) {
      return res.json({code: 0, num: doc.nModified});
    }
    return res.json({code: 1, msg: '修改失败'});
  });
});

router.post('/update', (req, res) => {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json({ code: 1 });
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, function (err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body);
    return res.json({ code: 0, data });
  });
});

router.post('/login', (req, res) => {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd: utility.md5(pwd) }, _filter, function (err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误' });
    }
    res.cookie('userid', doc._id);
    return res.json({ code: 0, data: doc });
  });
});

router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body;
  User.findOne({ user: user }, function (err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' });
    }
    const userModel = new User({ user, pwd: utility.md5(pwd), type });
    userModel.save(function (e, d) {
      if (e) {
        return res.json({ code: 1, msg: '后端出错了' });
      }
      const { user, type, _id } = d;
      res.cookie('userid', _id); // 写入 cookie
      return res.json({ code: 0, data: { user, type, _id } });
    });
  });
});

router.get('/info', (req, res) => {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userid }, _filter, function (err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '后端出错了' });
    }
    return res.json({ code: 0, data: doc });
  });
});

module.exports = router;

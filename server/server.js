const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require('http');

const userRouter = require('./user');
const model = require('./model');
const Chat = model.getModel('chat');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  // console.log('user login');
  socket.on('sendmsg', function (data) {
    const {from, to, msg} = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({chatid, from, to, content: msg}, function (err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc));
    });
  });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);

server.listen(9093, () => {
  console.log(`Server started on 9093`);
});

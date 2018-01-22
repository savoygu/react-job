const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./user');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/user', userRouter);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

app.listen(9093, () => {
  console.log(`Server started on 9093`);
});

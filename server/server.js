import express from 'express';
// const express = require('express');
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import http from 'http';
import path from 'path';
import staticPath from '../build/asset-manifest.json';

// https://github.com/css-modules/css-modules-require-hook
import csshook from 'css-modules-require-hook/preset';
import assethook from 'asset-require-hook';
assethook({
  extensions: ['png']
});

/* eslint-disable import/first */
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { renderToString } from 'react-dom/server';
import reducers from '../src/reducers';
import App from '../src/app';

const userRouter = require('./user');
const model = require('./model');
const Chat = model.getModel('chat');

const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  // console.log('user login');
  socket.on('sendmsg', function (data) {
    const { from, to, msg } = data;
    const chatid = [from, to].sort().join('_');
    Chat.create({ chatid, from, to, content: msg }, function (err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc));
    });
  });
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use(function (req, res, next) {
  if (req.url.startsWith('/user') || req.url.startsWith('/static/')) {
    return next();
  }

  const store = createStore(reducers, compose(
    applyMiddleware(thunk)
  ));
  let context = {};
  const markup = renderToString((<Provider store={store}>
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App></App>
    </StaticRouter>
  </Provider>));

  const pageHTML = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <meta name="keyword" content="React, Redux, SSR">
      <meta name="description" content="基于 React 的求职招聘平台">
      <meta name="author" content="savoygu">
      <title>React App</title>
      <link rel="stylesheet" href="/${staticPath['main.css']}"/>
    </head>
    <body>
      <noscript>
        You need to enable JavaScript to run this app.
      </noscript>
      <div id="root">${markup}</div>
      <script src="/${staticPath['main.js']}"></script>
    </body>
  </html>
  `;

  res.send(pageHTML);
  // return res.sendFile(path.resolve('build/index.html'));
});
app.use('/', express.static(path.resolve('build')));

server.listen(9093, () => {
  console.log(`Server started on 9093`);
});

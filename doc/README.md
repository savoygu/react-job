# 文档

## Redux

状态管理

## Redux-react

利用 babel 插件 babel-plugin-transform-decorators-legacy 开启装饰器，更优雅的编写 connect。在 package.json 中配置即可：

```json
"babel": {
  "presets": [
    "react-app"
  ],
  "plugins": ["transform-decorators-legacy"]
}
```

## Redux 开发者工具

为了结合 redux 开发者工具，更好的调试 redux，需要做以下事情：

```javascript
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(counter, composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  })(applyMiddleware(thunk))
);
```

## Redux-thunk 中间件

异步处理

## Redux-router4

路由控制

## immutable

优点：

- 减少内存使用
- 并发安全
- 降低项目复杂度
- 便于比较复杂数据，定制 shouldComponentUpdate 方便
- 时间旅行（每次都生成一个新的数据）
- 函数式编程

缺点：

- 学习成本
- 库的大小
- 对现有项目入侵太严重

## react 性能优化

单组件：

- 减少无用属性传递
- 在 constructor 中绑定 this，减少重新渲染时导致 this 重新绑定

定制 shouldComponentUpdate：

```javascript
shouldComponentUpdate(nextProps, nextStates) {
}
```

- 继承 PureComponent
- 使用 immutable
- 对象深比较

## redux 性能优化

reselect

## 打包编译

使用 express 过滤掉路由和静态资源访问路径，其他路径全部转向 index.html

```node
app.use(function(req, res, next) {
  if (req.url.startsWith('/user') || req.url.startsWith('/static/')) {
    return next();
  }

  return res.sendFile(path.resolve('build/index.html'));
});
```

## 服务端渲染

步骤：

### 1. 首先让服务端支持 `import`

安装 babel-cli，使用 babel-node 作为 node 环境

参考：https://github.com/babel/example-node-server

### 2. 在服务端添加 react 入口代码

- 使用 `react-dom/server` 中的 `renderToString` 代替 `react-dom` 中的 `RenderDOM.render`
- 使用 `react-dom-router` 中的 `StaticRouter` 代替 `BrowserRouter`

### 3. 解析 css

安装 css-modules-require-hook

参考：https://github.com/css-modules/css-modules-require-hook

### 4. 解析 png

安装 asset-require-hook

参考：https://github.com/aribouius/asset-require-hook

### 5. 拼接 HTML

```html
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
```

## 服务端渲染 React 16

使用 `renderToNodeStream` 代替 `renderToString`
使用 `ReactDOM.hydrate` 代替 `ReactDOM.render`

```html
res.write(`<!DOCTYPE html>
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
      <div id="root">`);

  let context = {};
  const markupStream = renderToNodeStream((<Provider store={store}>
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App></App>
    </StaticRouter>
  </Provider>));

  markupStream.pipe(res, {end: false});
  markupStream.on('end', function () {
    res.write(`</div>
      <script src="/${staticPath['main.js']}"></script>
    </body>
  </html>`);
    res.end();
  });
```
# 文档

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

为了结合 redux 开发者工具，更好的调试 redux，需要做一下事情：

```javascript
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(counter, composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  })(applyMiddleware(thunk))
);
```

## Redux-thunk

异步处理

## Redux-router4

路由控制

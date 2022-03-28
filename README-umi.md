# umi-template

> Node版本 > 14.17.0

### 项目简介

##### 项目技术

|  项目技术  |          运用场景           | 技术文档                                                          |
| :--------: | :-------------------------: | :---------------------------------------------------------------- |
| React 17.X |        搭建项目框架         | <https://react.docschina.org/docs/getting-started.html>           |
| Umi 3.3.9  |       整合 Dva 数据流       | <https://umijs.org/zh-CN/docs>                                    |
|    Dva     |       创建 Dva model        | <https://dvajs.com/guide/>                                        |
| Redux-Saga |        访问数据仓库         | <https://redux-saga-in-chinese.js.org/>                           |
|    Antd    |        构建主体样式         | <https://ant.design/components/overview-cn/>                      |
| TypeScript | 规范数据结构 明确项目数据流 | <https://www.tslang.cn/docs/home.html>                            |

### 项目构建

##### 构建流程

```javascript
//安装所需依赖
yarn

yarn dev            //启动本地测试
yarn start:prod     //启动本地测试并模拟生产环境
yarn start:staging  //启动本地测试并模拟测试环境
yarn build          //项目打包，默认打包为生产环境
yarn build:staging  //测试环境项目打包
```

##### 目录结构

```javascript
目录结构说明
├─.umirc.ts                         //umi默认设置，注释掉layout可消除默认侧边栏
├─src
|  ├─global.css
|  ├─global.less
|  ├─type.d.ts                      //存放State、Query与Table的约束接口
|  ├─utils
|  |   └modelUtils.ts
|  ├─pages
|  |   ├─index.css
|  |   ├─index.less
|  |   ├─index.tsx                  //页面入口文件，引入Template组件
|  |   ├─template
|  |   |     ├─index.tsx            //组件入口文件，引入子组件
|  |   |     ├─services
|  |   |     |    └template.ts     //存放api接口
|  |   |     ├─models
|  |   |     |   └template.ts      //数据总仓库与逻辑处理
|  |   |     ├─components
|  |   |     |     ├─Detail.tsx     //详情组件
|  |   |     |     ├─Edit.tsx       //编辑/新增组件
|  |   |     |     ├─Header.tsx     //搜索框组件
|  |   |     |     └TableList.tsx   //列表组件
```

##### 重要文件

|       重要文件       |               文件简介               |
| :------------------: | :----------------------------------: |
|      .umirc.ts       |     该文件用于配置 umi 构建设置      |
|    src/type.d.ts     |       该文件为 TS 接口约束文件       |
| services/template.ts |        该文件为 api 接口文件         |
|  models/template.ts  | 该文件负责项目数据保存及重要逻辑处理 |

### 环境

1. 通过 process.env 区分环境使用 url

    使用不同的命令启动项目即可修改 process.env.NODE_ENV 标识位，通过该标识位即可区分所用url

    ```js
    const env = process.env   //此处一定要单独使用变量接收，直接调用会输出development
    const BASE_URL = env.NODE_ENV == "prod" ? 'https://xxx.com' : 'http://staging.xxx.com'
    ```

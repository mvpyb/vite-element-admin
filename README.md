
## 简介

Vite Element Admin 是一个免费开源的中后台模版。使用了最新的`vue3`,`vite2`等主流技术开发，开箱即用的中后台前端解决方案，也可用于学习参考。

## 特性

- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发
- **Mock 数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件

## 预览

- [没有梯子的可移步码云](http://simmon_page.gitee.io/vite-element-plus-admin/) - 完整版预览 （ gitee ）
- [vite-element-admin](https://mvpyb.github.io/vite-element-plus-admin/dist/) - 完整版预览 ( github )
- [github](https://github.com/mvpyb/vite-element-plus-admin) - 完整版github站点
- [码云](https://gitee.com/simmon_page/vite-element-plus-admin) - 完整版码云站点

测试账号: 随便填
测试密码: 随便填

<p align="center">
   <img alt="PureAdmin Logo" width="100%" src="http://pic.yupoo.com/454539387/904e4a82/646a9f0c.png">
   <img alt="PureAdmin Logo" width="100%" src="http://pic.yupoo.com/454539387/396f79db/a7447eae.png">
   <img alt="PureAdmin Logo" width="100%" src="http://pic.yupoo.com/454539387/6aa197d5/45f8bae5.png">
   <img alt="PureAdmin Logo" width="100%" src="http://pic.yupoo.com/454539387/796a7772/4596b63f.png">
   <img alt="PureAdmin Logo" width="100%" src="http://pic.yupoo.com/454539387/01b3a971/e5bd6978.png">
</p>

## 准备

- [Vite](https://cn.vitejs.dev/) - vite 特性
- [Vue3](https://v3.cn.vuejs.org/) - Vue3 基础语法
- [Vue-Router-Next](https://next.router.vuejs.org/zh/index.html) - vue-router 4.x 文档
- [Element-Plus-Vue](https://element-plus.gitee.io/#/zh-CN/component/installation) - Element UI组件
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 目录结构

```
    ├── mock                       // Mock相关  
    ├── src                        // 源代码
    │   ├── api                    // 请求相关文件
    │       ├── constant.js        // 全局变量
    │   ├── assets                 // 静态资源
    │   ├── components             // 全局公用组件
    │   ├── directive              // 全局指令
    │   ├── icons                  // svg资源
    │   ├── layout                 // layout
    │   ├── plugins                // plugins
    │   ├── router                 // 路由
    │   ├── store                  // 全局 store管理
    │   ├── styles                 // 全局样式
    │   ├── utils                  // 工具函数
    │   ├── vendor                 // 公用vendor
    │   ├── views                  // 页面集合
    │   │      ├── login           // 登录
    │   ├── App.vue                // 入口页面
    │   ├── main.js                // 入口 加载组件 初始化等
    │   └── permission.js          // 权限管理
    ├── .gitignore                 // git 忽略项
    ├── favicon.ico                // favicon图标
    ├── index.html                 // html模板
    └── package.json               // package.json
```

## 开发

```bash
# 克隆项目
git clone https://github.com/mvpyb/vite-element-plus-admin.git

# 进入项目目录
cd vite-element-plus-admin

# 安装依赖
npm install

# 建议不要用 cnpm 安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

## 发布

```bash
# 构建生产环境
npm run build:pro
```


## 简介

Vite Element Admin 是一个免费开源的中后台模版(Js 版本)。使用了最新的`vue3`,`vite2`,`pinia`等主流技术开发，开箱即用的中后台前端解决方案，也可用于学习参考。该模板功能和JS版本保持一致

## 特性

- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发
- **Mock 数据** 内置 Mock 数据方案
- **权限** 内置完善的动态路由权限生成方案
- **组件** 二次封装了多个常用的组件
- **vuex版本** 可以下载2.x版本

## 预览

- [在线预览 - 码云](https://simmon_page.gitee.io/vite-element-admin/dist/)
- [在线预览 - GitHub](https://mvpyb.github.io/vite-element-admin/dist/)

- [github](https://github.com/mvpyb/vite-element-admin) - 完整版github站点
- [码云](https://gitee.com/simmon_page/vite-element-admin) - 完整版码云站点

---

- Typescript 版: [Vite-Element-Admin-ts（Github）](https://github.com/mvpyb/vite-element-admin-ts)
- Typescript 版: [Vite-Element-Admin-ts（Gitee）](https://github.com/mvpyb/vite-element-admin-ts)

---

- React 版: [React-Ant-Admin（Github）](https://github.com/mvpyb/react-ant-admin)
- React 版: [React-Ant-Admin（Gitee）](https://gitee.com/simmon_page/react-antd-admin)

---

- Nuxt Template: [Nuxt-Simple-Template（Github）](https://github.com/mvpyb/nuxt-simple-template) - 等3.x稳定了之后会同步增加3.x版本
- Nuxt Template: [Nuxt-Simple-Template（Gitee）](https://gitee.com/simmon_page/nuxt-simple-template)

---

- Vant Template: [Vite-Vant-Template（Github）](https://github.com/mvpyb/vite-vant-template)
- Vant Template: [Vite-Vant-Template（Gitee）](https://gitee.com/simmon_page/vite-vant-template)

---


测试账号: 随便填
测试密码: 随便填

## 效果预览(3.x )

<p align="center">
   <img alt="PureAdmin Logo" width="100%" src="http://pic.yupoo.com/454539387/b51791f0/2a9ef9f2.jpg">
   <img alt="PureAdmin Logo" width="100%" src="http://pic.yupoo.com/454539387/5584bfb8/bb7d2925.jpg">
   <img alt="PureAdmin Logo" width="100%" src="http://pic.yupoo.com/454539387/2d44c6f4/6d92062d.jpg">
</p>


## 效果预览(2.x VUEX版本)

<p align="center">
   <img alt="PureAdmin Logo" width="100%" src="http://pic.yupoo.com/454539387/904e4a82/646a9f0c.png">
   <img alt="PureAdmin Logo" width="100%" src="http://pic.yupoo.com/454539387/396f79db/a7447eae.png">
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
    ├── config                     // 基础配置信息  
    ├── src                        // 源代码
    │   ├── api                    // 请求相关文件
    │   ├── assets                 // 静态资源
    │   ├── components             // 全局公用组件
    │   ├── config                 // 全局常量等
    │   ├── directive              // 全局指令
    │   ├── icons                  // svg资源
    │   ├── layout                 // layout
    │   ├── locale                 // 国际化
    │   ├── plugins                // plugins
    │   ├── router                 // 路由
    │   ├── store                  // 全局 store 管理
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
git clone https://github.com/mvpyb/vite-element-admin.git

# 进入项目目录
cd vite-element-admin

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
npm run build
```

## qq群讨论
![](http://pic.yupoo.com/454539387/4a6a5749/dfcf0fa0.png)

## Donate

如果你觉得这个项目帮助到了你，你可以帮作者买一杯果汁表示鼓励 

| 微信 | 支付宝 |
| ------ | ------- |
| [![](http://pic.yupoo.com/454539387/193bac45/70a463c6.png)](bitcoin:)<br /></center> |[![](http://pic.yupoo.com/454539387/42d4b71d/2cb80871.png)](bitcoin:)<br /></center> |

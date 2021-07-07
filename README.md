## 功能

```
 vite-element-admin 基于 vite + element-plus + vue3.0 + vue router 4.0 + vuex 4.0 构建

```

## 目录结构

```
    ├── build                      // 构建相关  
    ├── mock                       // Mock相关  
    ├── src                        // 源代码
    │   ├── api                    // 所有请求
    │   ├── assets                 // 主题 字体等静态资源
    │   ├── components             // 全局公用组件
    │   ├── directive              // 全局指令
    │   ├── icons                  // 项目所有 svg icons
    │   ├── layout                 // layout
    │   ├── plugins                // plugins
    │   ├── router                 // 路由
    │   ├── store                  // 全局 store管理
    │   ├── styles                 // 全局样式
    │   ├── utils                  // 工具栏函数
    │   ├── vendor                 // 公用vendor
    │   ├── views                  // 页面集合
    │   │      ├── login           // 登录
    │   ├── App.vue                // 入口页面
    │   ├── global.js              // 一些全局变量
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
git clone git@gitlab.tech.shadowcreator.com:vue.js/vite-element-admin.git

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

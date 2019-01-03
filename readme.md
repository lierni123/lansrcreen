# 前端规范

### 开发工具
- vscode

### vscode插件
- prettier
- px to rem
- vscode-icons
- EditorConfig for VS Code

### 第三方库变更

状态管理：`redux`改为`mobx@4.0`

### 项目目录结构
- Components(公共组件)
- apis(接口服务)
- layout(页面布局)
- routes(各个页面)
- store(根状态)
- utils(公共方法)
- static(静态资源)
  - images(公共图片)
  - fonts(字体文件)
  - styles(全局样式)

### 组件/页面结构

>> Login(页面)/Header(组件)

>index.js

>index.module.less(局部样式)

>store.js(局部状态)

>images(局部图片)

>Components(局部组件，非公共组件)

### 别名说明：
- @Components       框架公共组件
- @BaseComs         框架基础组件
- @LayoutComs       框架布局组件
- @MetaCodeComs     元数据模板组件
- @DwrComs          统计分析模板组件
- @utils            框架公共方法
- @images           框架图片
- @fonts            字体文件
- @frameRootStore   框架根状态

##### 在任何目录都可以使用别名
`import DropDownList from '@BaseComs'`

`import frameRootStore from '@frameRootStore'`

### 使用/运行/打包

安装依赖 `npm i` or `yarn`

本地热加载模式：`npm start`（需要把host域名ip设为127.0.0.1，不需要配置iis）

开发模式：`npm run dev`（需要把host域名ip设为正确的ip，还需要配置iis）

生产模式：`npm run build`

安装依赖库：`npm i --save  xxx`或`yarn add xxx`（npm安装一定要加--save）

### 使用注意
---
1. 所有组件以目录方式创建，用大驼峰命名
2. 样式尽量使用less（后期把sass换为less）
3. 局部样式命名为index.module.less
4. 全局样式命名为xxx.less
5. /App.js中引入项目的路由（如果路由中包含index就会将其设为首页）
6. /login.js中替换你项目中的登陆页
7. /config.js配置全局变量
8. 全屏显示需要在url地址栏中加xxx?full=true

### 项目路由配置使用以下结构：

```javascript
const router={
    path: 'xxx',
    component: xxx,
    getComponent:xxx //路由分割
}
```
### server.config设置

```json
{
  "domain":"acanal.com",//跳转的域名
  "platformName": "accessanalysis",//登陆后跳转的url(同静态资源的目录名)
  "proxy": "http://172.16.4.37:8090",
}
```

### **存在问题**

在热加载模式中无法获取html中的`cxt`变量，会导致某些接口出现403




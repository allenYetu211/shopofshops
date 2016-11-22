# Gulp 脚手架 by Allen
----
## 源代码目录结构

源代码位于src文件夹中，其中再分`html`, `js`, `scss`, `images`, `vendors`等文件夹。

`html`文件夹用来存放html文件。为了统一引用的外部资源路径，其中不再分文件夹。如有区分模块的需要，可在页面名前加上模块前缀。

`js` 使用 ES6语法 文件夹用来存放未经压缩的js文件。其中的`utilities`文件夹中存放通用的js，如用户登录状态判断、表单校验等函数；`components`文件夹中存放UI组件，如图片轮播组件、Tabset、弹出层等组件；`pages`文件夹存放页面相关逻辑，文件名和页面html的文件名保持一致。

`Scss`文件夹用来保存Scss样式文件。其中的`components`文件夹中存放UI组件相关的样式，文件夹中存放页面相关的样式；变量定义在`components/variables.Scss`文件中；整站公用的样式定义在`pages/common.Scss`文件中。

`images`文件夹中分`public`和`contents`两个文件夹。其中`public`文件夹用来保存页面图标、背景图等；静态页面中的产品图片等存放在其中的`contents`文件夹中。

所有文件名都使用中划线连接的命名方式，并且全部使用小写字母。

## 第三方组件管理

优先使用npm管理安装第三方组件，并在`package.json`文件中记录依赖。npm中没有的第三方组件，统一放在`vendors`文件夹中。

## 常用命令

- `npm install` 安装所有依赖的第三方模块 (请勿使用cnpm，由于部分插件淘宝镜像映射地址有误，可能会导致安装失败)
- `npm run build` 项目构建，编译less、压缩js、复制html，图片等文件到dist文件夹中
- `npm run build-watch` 构建项目并且监控文件变化，在源文件发生变化的时候自动重新构建
- `npm run pack` 构建项目，并将dist中的文件压缩到`release/icolor.static.zip`压缩包中
- `npm run server` 启动开发Web服务器，访问地址为：`http://localhost:8080/dist/`
- `npm start` 构建并启动开发服务器


## 代码规范

### HTML

1. 使用4个空格缩进
2. 属性值使用双引号括起来
3. 使用UTF-8字符编码保存html文件，并在meta标签中申明字符集。`<meta charset="utf-8" />`
4. 使用标准模式，在文件的首行添加申明：`<!DOCTYPE html>`
5. CSS文件引用放在`<head>`标签内
6. JS文件引用放在`<body>`标签关闭前
7. 不要省略可选的结束标签，如`</li>`，`</p>`等

### Scss

1. class name使用中划线连接的命名方式
2. 每个属性单独书写一行

### gulp-file-include

1.在html页面中可以以  @@include('componet/header.html') 这样的形式来包含一个外部页面。单独的文件里面。
2.这样可以把站点头部，页脚之类的公共html放到src/html/components/ 文件夹里面


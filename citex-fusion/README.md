# citex

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run serve

# build for 200 testing environment with minification
npm run dev


#  build for 61 testing environment with minification
npm run test


# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 插件使用

```bash
#组件库
element-ui

#加密
md5加密

#样式
sass

#二维码生成
qrcode


#仿重复提交
vLoading: false,
disabled: false
this.vLoading = true;
this.disabled = true;
this.vLoading = false;
this.disabled = false;

#复制文本
vue-clipboard2

#webscoket 长连
vue-socket.io

#数字精度使用类库
js-big-decimal

#安装、引入
npm install --save js-big-decimal
import bigDecimal from "js-big-decimal";

bigDecimal.add(p1,p2); //加法
bigDecimal.subtract(p1,p2); //减法
bigDecimal.multiply(p1,p2); //乘法
bigDecimal.divide(p1,p2); //除法
bigDecimal.divide('45', '4', 2); // quotient = 11.25
bigDecimal.round(p1, 2)    //数字格式化 123.00
bigDecimal.getPrettyValue("12345.6789"); // value = "12,345.6789"

#**_可接第三个参数，表示保留几位小数_**

#深度图使用
vue-echarts

#统计使用友盟
vue-uweb


#规范文档
http://gitlab.citex.io/document/all-docs/blob/master/%E7%A0%94%E5%8F%91%E8%A7%84%E8%8C%83/%E5%89%8D%E7%AB%AF%E7%A0%94%E5%8F%91%E8%A7%84%E8%8C%83.docx

 #分支说明

| 分支名          | 说明                     | 时间       |
| :-------------- | ------------------------ |
| master          | 主分支                   |            |
| dev             | 开发分支                 |            |
| test            | 测试分支                 |            |
| dev_krw         | 韩方krw                  | 2018.12    |
| building        | 停机维护页面             | 2019.04    |
| ShareOutBonus   | 节点分红                 | 2019.5.10  |
| test_copy       | 临时测试分支，此分支代码为原计划0604发布版本  |  2019.06.06   |
| test_disable    | EBM交易锁仓              | 2019.06.06 | 
以上插件使用方法请参考API文档
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

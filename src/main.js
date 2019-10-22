// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import Filter from "./filter";


// mock接口数据模拟
// import './mock.js'
// 基础css
import "./assets/css/base.css";
import "./assets/css/common.css";
import "./assets/js/rem.js";
// 入口文件引入路由
import router from "./router/index";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import './plugins/element.js';
import "./assets/rest.less";


import loadingMy from "./components/common/Loading/index";
Vue.use(loadingMy);
Vue.use(ElementUI);

// // ueditor 富文本编辑器
// import '../static/Ueditor/ueditor.config.js'
// import '../static/Ueditor/ueditor.all.min.js'
// import '../static/Ueditor/lang/zh-cn/zh-cn.js'
// import '../static/Ueditor/ueditor.parse.min.js'
// element ui组件按需加载
import {
  Button,
  Carousel,
  CarouselItem,
  Slider,
  Pagination,
  Select,
  Option,
  Tabs,
  Dropdown,
  dropdownMenu,
  dropdownItem,
  Table,
  TableColumn,
  TabPane,
  Loading,
  Progress,
  Breadcrumb,
  BreadcrumbItem,
  Row,
  Col,
  Input,
  Dialog,
  Tooltip,
  Form,
  FormItem,
  DatePicker,
  Upload,
  Badge,
  Radio,
  RadioGroup,
  CheckboxGroup,
  Scrollbar,
  Checkbox,
  Message,
  MessageBox
} from "element-ui";

// 引用缓存公用方法
import { cache } from "./assets/js/business.js";
Vue.prototype.$cache = cache;

import waterfall from "vue-waterfall2";
Vue.use(waterfall);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox; //方法都要定义，否则会报错
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.config.productionTip = false;
Vue.prototype.$ELEMENT = { size: "small", zIndex: 3000 };
Vue.use(Button)
  .use(Carousel)
  .use(Scrollbar)
  .use(CarouselItem)
  .use(Slider)
  .use(Pagination)
  .use(Select)
  .use(Option)
  .use(Tabs)
  .use(Dropdown)
  .use(dropdownMenu)
  .use(dropdownItem)
  .use(Table)
  .use(TableColumn)
  .use(TabPane)
  .use(Loading)
  .use(Progress)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Row)
  .use(Col)
  .use(Dialog)
  .use(Tooltip)
  .use(Form)
  .use(FormItem)
  .use(DatePicker)
  .use(Upload)
  .use(Badge)
  .use(Radio)
  .use(Checkbox)
  .use(RadioGroup)
  .use(CheckboxGroup)
  .use(Input);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

Vue.prototype.splitStringData = function(inputString, limitLength) {
  //changeData是函数名

  if (inputString.length > limitLength) {
    return inputString.slice(0, limitLength) + "...";
  } else {
    return inputString;
  }
};

Vue.prototype.deepCloneUtil = function(object) {
  //changeData是函数名

  return JSON.parse(JSON.stringify(object));
};

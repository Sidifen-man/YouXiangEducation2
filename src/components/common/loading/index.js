 /*
    自定义 loading 组件
    调用
    this.$loadingMy('正在加载中...');
    this.$loadingMy.close();
*/ 
import '../../../assets/css/style.css';
 let _LOADING = {
        show: false,     // Boolean loading显示状态
        component: null  // Object loading组件
     };    
export default {
    install(Vue) {
        /*
            text: String
            type: String
        */
        Vue.prototype.$loadingMy = function(text='L O A D I N G', type) {
            if (type == 'close') {
                _LOADING.component.show = _LOADING.show = false;
                let tpl = document.querySelector('#myVue-loading')
                         document.body.removeChild(tpl)
            } else {
                if (_LOADING.show) {
                    return;
                }
                let LoadingCompoent = Vue.extend({
                    data: function() {
                        return {
                            show: _LOADING.show
                        }
                    },
                    template:  `<div id="myVue-loading">
                                <transition name="slide-fade">
                                  <div class="coverSelect" ></div>

                                </transition>
                                <transition name="slide-fade">
                                  <div class="myalert" >

                                    <div>
                                      <div class="spinner" style="margin-bottom: 30px;">
                                        <div class="spinner-container container1">
                                          <div class="circle1"></div>
                                          <div class="circle2"></div>
                                          <div class="circle3"></div>
                                          <div class="circle4"></div>
                                        </div>
                                        <div class="spinner-container container2">
                                          <div class="circle1"></div>
                                          <div class="circle2"></div>
                                          <div class="circle3"></div>
                                          <div class="circle4"></div>
                                        </div>
                                        <div class="spinner-container container3">
                                          <div class="circle1"></div>
                                          <div class="circle2"></div>
                                          <div class="circle3"></div>
                                          <div class="circle4"></div>
                                        </div>
                                      </div>

                                      <div style="color:#F36611;">
                                        <div style="text-align:center;font-size: 14px;">
                                          ${text} 
                                        </div>
                                      </div>

                                    </div>

                                  </div>
                                </transition>
                              </div>`
                });
                _LOADING.component = new LoadingCompoent();
                let element = _LOADING.component.$mount().$el;
                document.body.appendChild(element);
                _LOADING.component.show = _LOADING.show = true;
            }
        };
        // 打开/关闭
        ['open', 'close'].forEach(function(type) {
            Vue.prototype.$loadingMy[type] = function(text) {
                return Vue.prototype.$loadingMy(text, type);
            }
        });
    }
}
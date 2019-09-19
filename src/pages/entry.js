import Vue from 'vue';
import ElementUI from 'element-ui';
import MainPage from '../components/main-page';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
    el: '#vue-container',
    render(h) {
        return h(MainPage);
    }
});

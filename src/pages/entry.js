import Vue from 'vue';
import MainPage from '../components/main-page';

// by scripts/simulate-loader.js

import Button from 'element-ui/lib/button';
import 'element-ui/lib/theme-chalk/button.css';
Vue.use(Button);
import Tooltip from 'element-ui/lib/tooltip';
import 'element-ui/lib/theme-chalk/tooltip.css';
Vue.use(Tooltip);
import Tabs from 'element-ui/lib/tabs';
import 'element-ui/lib/theme-chalk/tabs.css';
Vue.use(Tabs);
import TabPane from 'element-ui/lib/tab-pane';
import 'element-ui/lib/theme-chalk/tab-pane.css';
Vue.use(TabPane);
import Row from 'element-ui/lib/row';
import 'element-ui/lib/theme-chalk/row.css';
Vue.use(Row);
import Col from 'element-ui/lib/col';
import 'element-ui/lib/theme-chalk/col.css';
Vue.use(Col);
import Icon from 'element-ui/lib/icon';
import 'element-ui/lib/theme-chalk/icon.css';
Vue.use(Icon);

// end

new Vue({
    el: '#vue-container',
    render(h) {
        return h(MainPage);
    }
});

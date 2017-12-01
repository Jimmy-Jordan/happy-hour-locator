import Vue from 'vue';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

import DefaultNavBar from './DefaultNavBar.vue';
import BarCollection from './BarCollection.vue';
import BarItem from './BarItem.vue';
import BarDetail from './BarDetail.vue';
import CreateBar from './CreateBar.vue';
import EditBar from './EditBar.vue';



Vue.component(DefaultNavBar.name, DefaultNavBar);
Vue.component(BarCollection.name, BarCollection);
Vue.component(BarItem.name, BarItem);
Vue.component(BarDetail.name, BarDetail);
Vue.component(CreateBar.name, CreateBar);
Vue.component(EditBar.name, EditBar);

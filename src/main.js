
import Vue from 'vue'
import App from './App'
import axios from "axios";
import router from "./router";
import Buefy from "buefy";
import 'buefy/dist/buefy.css'
import {store} from "./store/store";
import ImageUploader from "vue-image-upload-resize";
import InputTag from 'vue-input-tag'
import { BSidebar } from 'bootstrap-vue'
Vue.component('b-sidebar', BSidebar)



import { BDropdown } from 'bootstrap-vue'
Vue.component('b-dropdown', BDropdown)

import StatusIndicator from 'vue-status-indicator';
Vue.use(StatusIndicator);
import { DropdownPlugin } from 'bootstrap-vue'
Vue.use(DropdownPlugin)

import VoerroTagsInput from '@voerro/vue-tagsinput';
Vue.component('tags-input', VoerroTagsInput);

let frontUrl;
Vue.prototype.$imageUrl = frontUrl;
export const EventBus = new Vue();

Vue.prototype.$axios = axios;
Vue.use(Buefy)
Vue.use(ImageUploader);
Vue.component('input-tag', InputTag)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')

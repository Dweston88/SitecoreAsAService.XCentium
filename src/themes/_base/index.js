import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

// Import theme
import './theme.js';

// Import local styles
import './theme.scss';

Vue.use(BootstrapVue);

new Vue({
    el: '#app'
});

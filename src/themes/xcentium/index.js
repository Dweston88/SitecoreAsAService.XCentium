/**
 * Index files include all code necessary to fully build the Vue application.
 * This should not include any extra library declarations.
 */

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

// Inherit all JS components/libraries from the base theme
import './theme.js';

// Import local styles
import './theme.scss';

Vue.use(BootstrapVue);

new Vue({
    el: '#app'
});

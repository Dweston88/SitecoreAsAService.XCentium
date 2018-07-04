import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

// Reusuable Generic components
import NavDropdown from '@/components/xc-nav-dropdown';
import SelectDropdown from '@/components/xc-select-dropdown';
import SelectDropdownItem from '@/components/xc-select-dropdown-item';
import YouTube from '@/components/xc-youtube.js';
import MobileNav from '@/components/xc-mobile-nav.vue';

// Global directives
import verticalAlign from '@/directives/vertical-align';
import lazyImg from '@/directives/lazy-img';
import toggleChecked from '@/directives/toggle-checked';
import searchModal from '@/directives/search-modal';

import skipToLink from '@/utils/skip-to';

Vue.use(BootstrapVue);

Vue.directive('vertical-align', verticalAlign);
Vue.directive('lazy-img', lazyImg);
Vue.directive('toggle-checked', toggleChecked);
Vue.directive('search-modal', searchModal);

// Non-visual required components
Vue.component('xc-nav-dropdown', NavDropdown);
Vue.component('xc-select-dropdown', SelectDropdown);
Vue.component('xc-select-dropdown-item', SelectDropdownItem);
Vue.component('xc-youtube', YouTube);
Vue.component('xc-mobile-nav', MobileNav);

new Vue({
    el: '#app'
});

// Set up the speed-bump hack to bridge between vanilla JS and Vue
skipToLink('.c-skip-to');

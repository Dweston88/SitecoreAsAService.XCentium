import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

// Reusuable Generic components
import NavDropdown from '@/components/xc-nav-dropdown';
import SelectDropdown from '@/components/xc-select-dropdown';
import SelectDropdownItem from '@/components/xc-select-dropdown-item';
import YouTube from '@/components/xc-youtube.js';
import MobileNav from '@/components/xc-mobile-nav.vue';
import Modal from '@/components/xc-modal';
import InlineSiteSearch from '@/components/xc-inline-site-search.vue';

// Global directives
import verticalAlign from '@/directives/vertical-align';
import lazyImg from '@/directives/lazy-img';
import toggleChecked from '@/directives/toggle-checked';
import skipToLink from '@/utils/skip-to';

Vue.use(BootstrapVue);

Vue.directive('vertical-align', verticalAlign);
Vue.directive('lazy-img', lazyImg);
Vue.directive('toggle-checked', toggleChecked);

// Non-visual required components
Vue.component('xc-nav-dropdown', NavDropdown);
Vue.component('xc-select-dropdown', SelectDropdown);
Vue.component('xc-select-dropdown-item', SelectDropdownItem);
Vue.component('xc-youtube', YouTube);
Vue.component('xc-mobile-nav', MobileNav);
Vue.component('xc-modal', Modal);
Vue.component('xc-inline-site-search', InlineSiteSearch);

new Vue({
    el: '#app'
});

// Set up the speed-bump hack to bridge between vanilla JS and Vue
skipToLink('.c-skip-to');

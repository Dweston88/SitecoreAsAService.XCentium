import 'core-js/shim';

import 'jquery';

import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import VueScrollTo from 'vue-scrollto';

// Import production application components
import '@/index.js';

import 'bootstrap-vue/dist/bootstrap-vue.css';
import './app/sass/styles.scss';

import App from './app.vue';

// Demo-only components
import Component from './app/components/component.vue';
import SidebarNavigation from './app/navigation/sidebar-navigation';

import './components/index.js';

import routes from './navigation/index.js';

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueScrollTo);

Vue.component('aha-component', Component);
Vue.component('sidebar-navigation', SidebarNavigation);

const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    render: h => h(App),
    router: router
});

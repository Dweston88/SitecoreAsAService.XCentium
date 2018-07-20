import 'core-js/shim';

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from 'demo/app/app.vue';

export default function demo(themeName = '', routes) {
    Vue.prototype.$themeName = themeName;
    document.title = themeName;

    Vue.use(VueRouter);

    const router = new VueRouter({
        routes
    });

    new Vue({
        el: '#app',
        render: h => h(App),
        router: router
    });
}

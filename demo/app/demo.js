import 'core-js/shim';

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from 'demo/app/app.vue';

export default function demo(routes) {
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

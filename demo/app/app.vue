<template>
    <div id="app">
        <b-navbar toggleable="md" type="dark" variant="dark" class="c-nav sticky-top">
            <b-navbar-toggle class="c-nav__toggle" target="nav_collapse">
                <span class="c-nav__bar"></span>
                <span class="c-nav__bar"></span>
                <span class="c-nav__bar"></span>
            </b-navbar-toggle>

            <b-navbar-toggle class="c-sidebar-nav__toggle d-none d-md-block mr-3" target="sidebar-collapse-desktop"></b-navbar-toggle>

            <b-navbar-brand v-bind:to="'/'">{{ $themeName }}</b-navbar-brand>

            <b-collapse is-nav id="nav_collapse" class="c-navbar__container">
                <b-navbar-nav class="c-navbar">
                    <li class="c-navbar__item">
                        <router-link class="c-navbar__link" v-bind:to="'/'" exact>Home</router-link>
                    </li>

                    <li class="c-navbar__item">
                        <router-link class="c-navbar__link" v-bind:to="'/pages'">Layouts</router-link>
                    </li>

                    <li class="c-navbar__item">
                        <router-link class="c-navbar__link" v-bind:to="'/components'">Components</router-link>
                    </li>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <div class="app">
            <b-collapse class="app__sidebar" visible id="sidebar-collapse-desktop">
                <router-view name="sidebar-nav"></router-view>
            </b-collapse>

            <main class="app__content">
                <router-view></router-view>
            </main>
        </div>

        <!-- This is needed to ensure a modal keyboard trap -->
        <span tabindex="0"></span>
    </div>
</template>

<script>
    import Vue from 'vue';
    import BootstrapVue from 'bootstrap-vue';
    import VueScrollTo from 'vue-scrollto';

    // Demo-only components
    import Component from './components/component.vue';
    import SidebarNavigation from './navigation/sidebar-navigation';

    import 'bootstrap-vue/dist/bootstrap-vue.css';
    import './sass/styles.scss';

    Vue.use(BootstrapVue);
    Vue.use(VueScrollTo);

    Vue.component('xc-component', Component);
    Vue.component('sidebar-navigation', SidebarNavigation);

    export default {
        name: 'app'
    }
</script>
<template>
    <div class="c-sidebar-nav navbar-dark">
        <ul class="c-sidebar-nav__list">
            <li v-for="(path, index) in paths" v-bind:key="index" class="nav-item">
                <b-navbar-toggle class="c-sidebar-nav__toggle float-right d-md-none" target="sidebar-collapse"></b-navbar-toggle>

                <span class="c-sidebar-nav__header" >{{ path.name }}</span>

                <b-collapse visible id="sidebar-collapse">
                    <ul class="c-sidebar-nav__links" v-if="path.children.length">
                        <li v-for="(child, index) in path.children" v-bind:key="index">
                            <router-link class="c-sidebar-nav__link" v-bind:to="child.path">{{ child.name }}</router-link>
                        </li>
                    </ul>
                </b-collapse>
            </li>
        </ul>
    </div>
</template>



<script>
    import SidebarNavigationMixin from '../mixins/sidebar-navigation';

    export default {
        mixins: [SidebarNavigationMixin],
        props: {
            pages: {
                required: true,
                type: Array
            }
        },
        computed: {
            paths: function() {
                return this.buildPaths(this.pages);
            }
        }
    }
</script>

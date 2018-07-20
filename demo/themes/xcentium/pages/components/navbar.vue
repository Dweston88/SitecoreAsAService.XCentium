<template>
    <navbar></navbar>
</template>

<script>
    import Vue from 'vue';
    import Navbar from '../../components/navbar.html';

    Vue.component('navbar', {
        template: Navbar
    });
</script>
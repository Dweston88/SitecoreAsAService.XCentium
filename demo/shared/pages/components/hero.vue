<template>
    <xc-hero></xc-hero>
</template>

<script>
    import Vue from 'vue';
    import hero from '../../components/hero.html';

    Vue.component('xc-hero', {
        template: hero
    });
</script>
<template>
    <lmm-hero></lmm-hero>
</template>

<script>
    import Vue from 'vue';
    import hero from '../../components/hero.html';

    Vue.component('lmm-hero', {
        template: hero
    });
</script>
<template>
    <lmm-tiles></lmm-tiles>
</template>

<script>
    import Vue from 'vue';
    import tiles from '../../components/tiles.html';

    Vue.component('lmm-tiles', {
        template: tiles
    });
</script>
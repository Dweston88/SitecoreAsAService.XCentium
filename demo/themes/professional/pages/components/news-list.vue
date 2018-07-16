<template>
    <lmm-news-list></lmm-news-list>
</template>

<script>
    import Vue from 'vue';
    import newslist from '../../components/news-list.html';

    Vue.component('titles', {
        template: newslist
    });
</script>
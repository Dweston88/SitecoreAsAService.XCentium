<template>
    <xc-news-list></xc-news-list>
</template>

<script>
    import Vue from 'vue';
    import newsList from 'demo/components/news-list.html';

    Vue.component('xc-news-list', {
        template: newsList
    });
</script>
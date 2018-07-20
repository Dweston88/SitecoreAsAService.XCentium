<template>
    <search-results></search-results>
</template>

<script>
    import Vue from 'vue';
    import SearchResults from '../../components/search-results.html';

    Vue.component('search-results', {
        template: SearchResults
    });
</script>
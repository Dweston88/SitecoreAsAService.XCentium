<template>
    <search-modal></search-modal>
</template>

<script>
    import Vue from 'vue';
    import SearchModal from 'demo/components/search-modal.html';

    Vue.component('search-modal', {
        template: SearchModal
    });
</script>
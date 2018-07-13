<template>
    <featured-people></featured-people>
</template>

<script>
    import Vue from 'vue';
    import FeaturedPeople from '../../components/featured-people.html';

    Vue.component('featured-people', {
        template: FeaturedPeople
    });
</script>
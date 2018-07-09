<template>
    <blog-content></blog-content>
</template>

<script>
    import Vue from 'vue';
    import BlogContent from 'demo/components/blog-content.html';

    Vue.component('blog-content', {
        template: BlogContent
    });
</script>
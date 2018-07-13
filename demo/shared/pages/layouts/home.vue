<template>
    <div>
        <header>
            <xc-navbar></xc-navbar>
        </header>

        <main>
            <xc-hero></xc-hero>
        </main>

        <xc-footer></xc-footer>
    </div>
</template>

<script>
    import Vue from 'vue';
    import navbar from '../../components/navbar.html';
    import hero from '../../components/hero.html';
    import footer from '../../components/footer.html';

    Vue.component('xc-navbar', { template: navbar });
    Vue.component('xc-hero', { template: hero });
    Vue.component('xc-footer', { template: footer });
</script>

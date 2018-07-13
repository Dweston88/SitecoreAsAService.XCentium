<template>
    <div>
        <header>
            <xc-navbar></xc-navbar>
        </header>

        <main>
            <xc-hero></xc-hero>
            <div class="container">
                    <div class="mod-title mod-title--center">
                        <h2 class="mod-title__heading">TYPES OF CASES WE HANDLE</h2>
                        <p class="mod-title__subheading">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus </p>
                    </div>
                <tiles></tiles>
                <div class="mod-title mod-title--center">
                    <h2 class="mod-title__heading">CASE RESULTS</h2>
                    <p class="mod-title__subheading">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus </p>
                </div>
                <div class="row r-border margin-bottom">
                    <div class="col">
                        <div class="case-col">
                            <h4 class="case-col__heading">$4.5 BILLION</h4>
                            <span class="case-col__subheading">CORPORATE LITIGATION</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="case-col">
                            <h4 class="case-col__heading">$12 MILLION</h4>
                            <span class="case-col__subheading">DECK COLLAPSE</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="case-col">
                            <h4 class="case-col__heading">$9 MILLION</h4>
                            <span class="case-col__subheading">VIOLENT ASSAULT</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="case-col">
                            <h4 class="case-col__heading">$5.2 MILLION</h4>
                            <span class="case-col__subheading">HAND INJURY</span>
                        </div>
                    </div>
                    <div class="col">
                        <div class="case-col">
                            <h4 class="case-col__heading">$4.5 MILLION</h4>
                            <span class="case-col__subheading">WILL CONTEST</span>
                        </div>
                    </div>
                </div>
                <section class="border-top border-bottom margin-bottom">
                    <div class="mod-title align-right">
                        <h2 class="mod-title__heading">LEGAL ADVICE YOU CAN COUNT ON</h2>
                        <p class="mod-title__subheading">Don’t take our word for it, see what some of our clients have to say.</p>
                    </div>
                    <xc-testimonial></xc-testimonial>
                    <div class="text-right">
                        <a href="#" class="text-link">More Tesimonials</a>
                    </div>
                </section>
                <div class="mod-title">
                    <h2 class="mod-title__heading">Latest News</h2>
                    <p class="mod-title__subheading">Nam libero tempore, cum soluta nobis est eligendi optiol.</p>
                </div>
                <xc-news-list></xc-news-list>
                <div class="text-right margin-bottom">
                    <a href="#" class="text-link">More Editorials</a>
                </div>
            </div>
        </main>

        <xc-footer></xc-footer>
    </div>
</template>

<script>
import Vue from "vue";
import navbar from "demo/components/navbar.html";
import hero from "demo/components/hero.html";
import footer from "demo/components/footer.html";
import Tiles from "demo/components/tiles.html";
import testimonial from 'demo/components/testimonial.html';

Vue.component("xc-navbar", { template: navbar });
Vue.component("xc-hero", { template: hero });
Vue.component("xc-footer", { template: footer });
Vue.component("tiles", { template: Tiles });
Vue.component('xc-testimonial', {template: testimonial});
</script>

<template>
    <div>
        <header>
            <lmm-navbar></lmm-navbar>
        </header>

        <main>
            <lmm-hero></lmm-hero>
            <div class="container">
                <div class="mod-title mod-title--center">
                        <h2 class="mod-title__heading">TYPES OF CASES WE HANDLE</h2>
                        <p class="mod-title__subheading">Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus </p>
                    </div>
                <lmm-tiles></lmm-tiles>
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
                    <div class="c-testimonial">
                        <div class="c-testimonial__container container container-fluid">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="c-testimonial__image">
                                            <img src="assets/Group22.png" alt="Featured People" />
                                    </div>
                                </div>

                                <div class="col-md-8 d-flex">
                                    <div class="c-testimonial__content">
                                        <blockquote class="c-blockquote">
                                            <h2 class="h3 sr-only">Nancy Williams</h2>
                                            <p>Paradigm Legal has been our legal team for over 20 years. We highly recommend them.</p>
                                        </blockquote>

                                        <div class="c-testimonial__name"> <span class="secondary-color-text">-@Brian Shields</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div class="text-right">
                        <a href="#" class="text-link">More Tesimonials</a>
                    </div>
                </section>
                 <div class="mod-title">
                    <h2 class="mod-title__heading">Latest News</h2>
                    <p class="mod-title__subheading">Nam libero tempore, cum soluta nobis est eligendi optiol.</p>
                </div>
                <div class="tiles">
                    <div class="row">
                        <div class="col">
                            <a href="#0" class="c-promo c-promo__alt">
                                <div class="c-promo__media h-placeholder-image h-placeholder-image--3-2">
                                    <img src="assets/Group19.png" v-lazy-img="'assets/Group19.png'" alt="" />
                                </div>
                                <h3 class="c-promo__alt__heading">Some Borrowers Owe More than a Million Dollars in Student Loans</h3>
                                <p class="c-promo__alt__desc">So says the WSJ here.  It reports on how one such borrower landed in that position.</p>
                            </a>
                        </div>

                        <div class="col">
                            <a href="#0" class="c-promo c-promo__alt">
                                <div class="c-promo__media h-placeholder-image h-placeholder-image--3-2">
                                    <img src="assets/Group20.png" v-lazy-img="'assets/Group20.png'" alt="" />
                                </div>
                                <h3 class="c-promo__alt__heading">Office of the Comptroller of the Currency will authorize banks to compete with payday lenders</h3>
                                <p class="c-promo__alt__desc">A federal regulator on Wednesday encouraged banks to offer small, short-term loans to people in need of emergency cash.</p>
                            </a>
                        </div>

                        <div class="col">
                            <a href="#0" class="c-promo c-promo__alt">
                                <div class="c-promo__media h-placeholder-image h-placeholder-image--3-2">
                                    <img src="assets/Group21.png" v-lazy-img="'assets/Group21.png'" alt="" />
                                </div>
                                <h3 class="c-promo__alt__heading">Supreme Court holds employers can use arbitration agreements to ban collective employment actions</h3>
                                <p class="c-promo__alt__desc">Having multiple accounts on Asix is super convenient, but to make things even easier, here are some more account tips.</p>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="text-right margin-bottom">
                    <a href="#" class="text-link">More Editorials</a>
                </div>
            </div>
        </main>

        <lmm-footer></lmm-footer>
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

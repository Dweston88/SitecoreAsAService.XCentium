<template>
    <div>
        <header>
            <xc-navbar></xc-navbar>
        </header>

        <main>
            <xc-hero></xc-hero>
            <div class="container">
                <div class="loan-details margin-bottom">
                    <div class="loan-details__heading">
                        <h2>Loan Details</h2>
                    </div>
                    <div class=" loan-details__cols">
                        <div class="row">
                            <div  class="col">
                                <ul>
                                    <li>Borrow up to 90% of the value of your home</li>
                                    <li>Terms from 5-15 years</li>
                                    <li>No Closing costs or appraisal fees</li>
                                    <li>Quick Approval process</li>
                                </ul>
                            </div>
                            <div  class="col">
                                <div class="row loan-details__rates__cols">
                                    <div class="col">
                                        <div class="rates-label">As low as</div>
                                        <div class="rates">5.5% APR</div>
                                    </div>
                                    <div class="col">
                                        <div class="rates-label">Max Term</div>
                                        <div class="rates">180 Months</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mod-title">
                    <h2 class="mod-title__heading">Two ways to get value from your home</h2>
                    <p class="mod-title__subheading">The right home equity loan type depends on you situation and your needs.  Check it out!</p>
                </div>
                <tiles></tiles>
                <div class="mod-title">
                    <h2 class="mod-title__heading">The right product for your needs</h2>
                    <p class="mod-title__subheading">A home equity line of credit (HELOC) or home equity loan is a great way to leverage the value of your home and ensure you have funds available for whatever you want, such as home repairs and improvements, a new car, or even a vacation home.</p>
                </div>
                <table class="responsive col-four-table">
					<tr>
                        <th></th>
						<th>HELOC</th>
						<th>HELOC (Interest Only)</th>
						<th>Home Equity Loan</th>
                    </tr>
                    <tr>
						<td>Rate</td>
						<td>as low as 4.000% (Variable)</td>
						<td>as low as 4.000% (Variable)</td>
                        <td>as low as 5.500 to 6.500% (Fixed)</td>
                    </tr>
                    <tr>
						<td>Quick Summary</td>
						<td>Borrow funds as you need them, up to your line of credit amount ( up to 90% of the value of your home)</td>
						<td>as low as 4.000% (Variable)</td>
                        <td>as low as 5.500 to 6.500% (Fixed)</td>
                    </tr>
                    <tr>
						<td>Max Term</td>
						<td>180 Months</td>
						<td>84 Months (Balloon)</td>
                        <td>60, 120 or 180 Months</td>
                    </tr>
                </table>
           
                <div class="tiles">
                    <div class="row  margin-bottom  no-gutters">
                        <div class="col">
                            <div class="c-promo no-link">
                                <div class="c-promo__media h-placeholder-image h-placeholder-image--16-9">
                                    <img src="assets/Rectangle8Copy7.png" v-lazy-img="'assets/Rectangle8Copy7.png'" alt="" />
                                </div>


                                <div class="c-promo__content top">
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="c-promo no-link solid-bg is-dark">
                                <div class="c-promo__media h-placeholder-image h-placeholder-image--16-9">
                                    <img src="assets/Rectangle8Copy7.png" v-lazy-img="'assets/Rectangle8Copy7.png'" alt="" />
                                </div>

                                <span class="h-mask is-dark"></span>

                                <div class="c-promo__content center left">
                                    <p class="c-promo__desc">​Take the time you need to review your needs and our rates.  Also feel free to call us at 1-800-ASIXNOW, our knowledgeable advisors are here to help guide you.</p>
                                    <a href="#" class="c-hero__cta c-cta btn btn-primary">APPLY NOW</a>
                                </div>
                            </div>
                        </div>
                    </div>
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

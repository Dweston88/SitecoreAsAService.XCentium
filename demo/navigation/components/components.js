import { CreateDynamicNavigation } from 'demo/app/util/navigation';

import Hero from 'demo/pages/components/hero.vue';
import Navbar from 'demo/pages/components/navbar.vue';
import NewsGrid from 'demo/pages/components/news-grid.vue';
import Testimonial from 'demo/pages/components/testimonial.vue';
import VideoPromo from 'demo/pages/components/video-promo.vue';
import VideoPromoAlt from 'demo/pages/components/video-promo-alt.vue';
import Footer from 'demo/pages/components/footer.vue';
import FiftyFiftyImage from 'demo/pages/components/fifty-fifty-image.vue';
import TextPromo from 'demo/pages/components/text-promo.vue';
import Tiles from 'demo/pages/components/tiles.vue';
import FeaturedPeople from 'demo/pages/components/featured-people.vue';
import Contact from 'demo/pages/components/contact.vue';

const ComponentPages = CreateDynamicNavigation([
    {
        path: '/components',
        name: 'Components',
        children: [
            {
                path: '',
                excludeFromNav: true,
                redirect: 'hero'
            },
            {
                path: 'hero',
                name: 'Hero',
                component: Hero
            },
            {
                path: 'navbar',
                name: 'Navbar',
                component: Navbar
            },
            {
                path: 'news-grid',
                name: 'News Grid',
                component: NewsGrid
            },
            {
                path: 'testimonial',
                name: 'Testimonial',
                component: Testimonial
            },
            {
                path: 'video-promo',
                name: 'Video Promo',
                component: VideoPromo
            },
            {
                path: 'video-promo-alt',
                name: 'Video Promo Alternative',
                component: VideoPromoAlt
            },
            {
                path: 'footer',
                name: 'Footer',
                component: Footer
            },
            {
                path: 'fifty-fifty-image',
                name: 'Fifty Fifty Image',
                component: FiftyFiftyImage
            },
            {
                path: 'text-promo',
                name: 'Text Promo',
                component: TextPromo
            },
            {
                path: 'tiles',
                name: 'Tiles',
                component: Tiles
            },
            {
                path: 'featured-people',
                name: 'Featured People',
                component: FeaturedPeople
            },
            {
                path: 'contact',
                name: 'Contact',
                component: Contact
            }
        ]
    }
]);

export default ComponentPages;

import { CreateDynamicNavigation } from 'demo/app/util/navigation';

import Hero from 'demo/pages/components/hero.vue';
import Navbar from 'demo/pages/components/navbar.vue';
import NewsGrid from 'demo/pages/components/news-grid.vue';
import Testimonial from 'demo/pages/components/testimonial.vue';
import VideoPromo from 'demo/pages/components/video-promo.vue';

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
            }
        ]
    }
]);

export default ComponentPages;

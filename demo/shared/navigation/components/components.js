import { CreateDynamicNavigation } from 'demo/app/util/navigation';

import Hero from '../../pages/components/hero.vue';
import Navbar from '../../pages/components/navbar.vue';
import NewsGrid from '../../pages/components/news-grid.vue';
import Testimonial from '../../pages/components/testimonial.vue';
import VideoPromo from '../../pages/components/video-promo.vue';
import VideoPromoAlt from '../../pages/components/video-promo-alt.vue';
import Footer from '../../pages/components/footer.vue';
import FiftyFiftyImage from '../../pages/components/fifty-fifty-image.vue';
import TextPromo from '../../pages/components/text-promo.vue';
import Tiles from '../../pages/components/tiles.vue';
import FeaturedPeople from '../../pages/components/featured-people.vue';
import Contact from '../../pages/components/contact.vue';
import BlogContent from '../../pages/components/blog-content.vue';
import SearchResults from '../../pages/components/search-results.vue';

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
            },
            {
                path: 'blog-content',
                name: 'Blog Content',
                component: BlogContent
            },
            {
                path: 'search-results',
                name: 'Search Results',
                component: SearchResults
            }
        ]
    }
]);

export default ComponentPages;

// Load the demo code
import initDemo from 'demo/app/demo';
import { OverrideChildPage } from 'demo/app/util/navigation';

// Load the theme
import 'src/themes/professional/index.js';

// Import demo navigation
import HomePages from 'demo/shared/navigation/static/home/home.js';
import ComponentPages from 'demo/shared/navigation/components/components.js';
import LayoutPages from 'demo/shared/navigation/layouts/layouts.js';

// A complex way of overwriting components templates
import Hero from './pages/components/hero.vue';
import Navbar from './pages/components/Navbar.vue';
import Footer from './pages/components/footer.vue';
import Tiles from './pages/components/tiles.vue';
import Testimonial from './pages/components/Testimonial.vue';

OverrideChildPage(ComponentPages, 'Hero', Hero);
OverrideChildPage(ComponentPages, 'Navbar', Navbar);
OverrideChildPage(ComponentPages, 'Footer', Footer);
OverrideChildPage(ComponentPages, 'Tiles', Tiles);
OverrideChildPage(ComponentPages, 'Testimonial', Testimonial);

initDemo([].concat(HomePages, ComponentPages, LayoutPages));

// Load the demo code
import initDemo from 'demo/app/demo';

// Only needed to modify an existing view
import { OverrideChildPage } from 'demo/app/util/navigation';

// Load the theme
import 'src/themes/xc/index.js';

// Import demo navigation
import HomePages from 'demo/shared/navigation/static/home/home.js';
import ComponentPages from 'demo/shared/navigation/components/components.js';
import LayoutPages from 'demo/shared/navigation/layouts/layouts.js';

// A complex way of overwriting components templates
import Tiles from './pages/components/tiles.vue';
import Navbar from './pages/components/navbar.vue';

OverrideChildPage(ComponentPages, 'Tiles', Tiles);
OverrideChildPage(ComponentPages, 'Navbar', Navbar);

initDemo([].concat(HomePages, ComponentPages, LayoutPages));

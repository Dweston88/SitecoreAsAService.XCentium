// Load the demo code
import initDemo from 'demo/app/demo';

// Load the theme
import 'src/themes/xc/index.js';

// Import demo navigation
import HomePages from 'demo/shared/navigation/static/home/home.js';
import ComponentPages from 'demo/shared/navigation/components/components.js';
import LayoutPages from 'demo/shared/navigation/layouts/layouts.js';

initDemo([].concat(HomePages, ComponentPages, LayoutPages));

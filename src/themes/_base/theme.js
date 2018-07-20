/**
 * Base Theme Configuration File
 */

// Required polyfills for IE11
import 'core-js/fn/symbol';
import 'core-js/fn/promise';

// Reusuable global components
import '@/components/xc-modal/index';
import '@/components/xc-youtube/index';
import '@/components/xc-inline-site-search/index';
import '@/components/xc-nav-dropdown/index';
import '@/components/xc-select-dropdown/index';

// Global directives
import '@/directives/lazy-img/index';

import skipToLink from '@/utils/skip-to';

// Set up the speed-bump hack to bridge between vanilla JS and Vue
skipToLink('.c-skip-to');

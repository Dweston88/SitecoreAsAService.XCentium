import HomeNavigation from './home-navigation';

import Home from '../../../pages/static/home.vue';

const HomePages = [
    {
        path: '/',
        components: {
            default: {
                template: '<router-view></router-view>'
            },
            'sidebar-nav': HomeNavigation
        },
        children: [
            {
                path: '',
                component: Home
            }
        ]
    }
];

export default HomePages;

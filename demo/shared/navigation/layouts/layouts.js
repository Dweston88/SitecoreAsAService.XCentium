import { CreateDynamicNavigation } from 'demo/app/util/navigation';

import Home from '../../pages/layouts/home';

const LayoutPages = CreateDynamicNavigation([
    {
        path: '/pages',
        name: 'Pages',
        children: [
            {
                path: '',
                excludeFromNav: true,
                redirect: 'home'
            },
            {
                path: 'home',
                name: 'Home',
                component: Home
            }
        ]
    }
]);

export default LayoutPages;

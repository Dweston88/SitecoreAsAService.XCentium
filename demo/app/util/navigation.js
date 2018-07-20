import SidebarNavigation from '../navigation/sidebar-navigation';

export function CreateDynamicNavigation(routes) {
    if(typeof routes !== 'undefined') {
        routes[0].components = {
            default: {
                template: '<router-view></router-view>'
            },
            'sidebar-nav': SidebarNavigation
        };

        routes[0].props = {
            'sidebar-nav': {
                pages: routes
            }
        };
    }

    return routes;
}

export function OverrideChildPage(routes, name, component) {
    let childPage = routes[0].children.find(component => component.name === name);

    if(typeof childPage !== 'undefined') {
        childPage.component = component;
    }
}

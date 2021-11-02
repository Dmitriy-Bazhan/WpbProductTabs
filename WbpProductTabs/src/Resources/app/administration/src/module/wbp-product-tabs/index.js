import './page/sw-product-tabs';
import './view/sw-product-detail-tabs';
import './component/sw-product-tabs-generation';

import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

import WbpProductTabsService from "./service/WbpProductTabs.service";

// Here you create your new route, refer to the mentioned guide for more information
Shopware.Module.register('sw-new-tab-tabs', {
    routeMiddleware(next, currentRoute) {
        if (currentRoute.name === 'sw.product.detail') {
            currentRoute.children.push({
                name: 'sw.product.detail.tabs',
                path: '/sw/product/detail/:id/tabs',
                component: 'sw-product-detail-tabs',
                meta: {
                    parentPath: "sw.product.index"
                }
            });
        }
        next(currentRoute);
    },
    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    }
});

Shopware.Application.addServiceProvider('WbpProductTabsService', () => {
    return new WbpProductTabsService(
        Shopware.Application.getContainer('init').httpClient,
        Shopware.Service('loginService')
    );
});


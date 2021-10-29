import './page/sw-product-tabs';
import './view/sw-product-detail-tabs';
import './component/sw-product-tabs-generation';

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
    }
});

Shopware.Application.addServiceProvider('wbpProductTabs', () => {
    return new WbpProductTabsService(
        Shopware.Application.getContainer('init').httpClient,
        Shopware.Service('loginService')
    );
});


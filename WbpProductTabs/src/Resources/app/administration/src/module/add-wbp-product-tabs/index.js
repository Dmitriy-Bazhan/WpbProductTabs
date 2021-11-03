import './page/sw-add-product-tabs';
import './view/sw-add-product-tabs';
import WbpAddProductTabsService from './service/WbpProductTabs.service';


Shopware.Module.register('sw-add-product-tabs', {
    routeMiddleware(next, currentRoute) {
        if (currentRoute.name === 'sw.product.detail') {
            currentRoute.children.push({
                name: 'sw.add.product.tabs',
                path: '/sw/product/detail/:id/add-tabs',
                component: 'sw-product-detail-add-tabs',
                meta: {
                    parentPath: "sw.product.index"
                }
            });
        }
        next(currentRoute);
    }
});

Shopware.Application.addServiceProvider('WbpAddProductTabsService', () => {
    return new WbpAddProductTabsService(
        Shopware.Application.getContainer('init').httpClient,
        Shopware.Service('loginService')
    );
});
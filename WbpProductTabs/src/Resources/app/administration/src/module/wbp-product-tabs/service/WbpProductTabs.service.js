import ApiService from 'src/core/service/api.service';

/**
 * @private
 */
export default class WbpProductTabsService extends ApiService {
    constructor(httpClient, loginService, apiEndpoint = 'wbp-product-tabs') {
        super(httpClient, loginService, apiEndpoint);
        this.name = 'WbpProductTabsService';
        this.httpClient = httpClient;
    }

    async setDefaultTabs(productId) {
        let setDefaultTabsResponse = await this.httpClient.post('/wbp-product-tabs/set-default-tabs', {productId: productId}, {
            headers: this.getBasicHeaders()
        });

        return setDefaultTabsResponse;
    }

    async changeVisibility(tabsId) {
        let changeVisibilityResponse = await this.httpClient.post('/wbp-product-tabs/change-visibility', {tabsId: tabsId}, {
            headers: this.getBasicHeaders()
        });

        return changeVisibilityResponse;
    }
}

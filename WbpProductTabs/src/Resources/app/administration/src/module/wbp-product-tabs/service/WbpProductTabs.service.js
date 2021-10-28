import ApiService from 'src/core/service/api.service';

/**
 * @private
 */
export default class WbpProductTabsService extends ApiService {
    constructor(httpClient, loginService, apiEndpoint = 'bpa-qcf-import') {
        super(httpClient, loginService, apiEndpoint);
        this.name = 'WbpProductTabsService';
        this.httpClient = httpClient;
    }

    async setDefaultTabs(productId) {
        const setDefaultTabs = await this.httpClient.post('/wbp-product-tabs/set-default-tabs', {productId: productId}, {
            headers: this.getBasicHeaders()
        });

        return setDefaultTabs;
    }
}

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

    async setNewData(tab) {


        let setDefaultTabsResponse = await this.httpClient.post('/wbp-product-tabs/set-new-tab', {newTab: tab}, {
            headers: this.getBasicHeaders()
        });

        return setDefaultTabsResponse;
    }

}

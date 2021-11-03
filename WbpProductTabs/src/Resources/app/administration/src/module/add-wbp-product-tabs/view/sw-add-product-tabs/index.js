import template from "./sw-product-detail-add-tabs.html.twig";

const {Component, Mixin, Context} = Shopware;
const {Criteria} = Shopware.Data;
const {mapState, mapGetters, mapPropertyErrors} = Component.getComponentHelper();

Component.register('sw-product-detail-add-tabs', {
    template,

    metaInfo() {
        return {
            title: 'Add Tabs'
        };
    },

    mixins: [
        Mixin.getByName('placeholder')
    ],

    data: function () {
        return {
            tabs: {
                tabsName: null,
                data: null
            },
            error: {
                tabsName: null,
                data: null
            }
        }
    },

    inject: [
        'WbpAddProductTabsService'
    ],

    computed: {
        ...mapState('swProductDetail', [
            'product',
        ]),

        ...mapPropertyErrors('tabs', [
            'tabsName',
            'data'
        ])
    },

    created() {
        if (this.product.id === undefined) {
            let path = window.location.href;
            let arr = path.split('/');
            this.product.id = arr[7];
        }

        this.tabs.productId = this.product.id;
    },

    methods: {
        saveTabs() {
            if (this.tabs.tabsName === null) {
                document.getElementById('sw-field--tabs-tabsName').style.border = "solid 1px red";
            } else {
                document.getElementById('sw-field--tabs-tabsName').style.border = "solid 1px #d1d9e0";
            }

            if (this.tabs.data === null) {
                document.getElementById('sw-field--tabs-data').style.border = "solid 1px red";
            } else {
                document.getElementById('sw-field--tabs-data').style.border = "solid 1px #d1d9e0";
            }

            if (this.tabs.tabsName !== null && this.tabs.data !== null) {
                this.WbpAddProductTabsService.setNewData(this.tabs)
                    .then((result) => {
                        console.log(result);
                    })
                    .catch((error) => {
                        this.handleError(error);
                    });
            }

            console.log(this.error);
        }
    }
});
import template from './sw-product-tabs-modal-generation.html.twig';

const {Component, Mixin, Context} = Shopware;
const {Criteria} = Shopware.Data;
const {mapState, mapGetters, mapPropertyErrors} = Component.getComponentHelper();

Component.register('wbp-product-tabs-modal-generation', {
    template,

    data: function () {
        return {
            tabs: {
                tabsName: null,
                data: null
            }
        }
    },

    inject: [
        'WbpProductTabsService'
    ],

    computed: {
        ...mapState('swProductDetail', [
            'product',
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
                this.WbpProductTabsService.setNewData(this.tabs)
                    .then((result) => {
                        console.log(result);
                        this.$emit('product-tabs-save');
                    })
                    .catch((error) => {
                        this.handleError(error);
                    });
            }
        }
    }

});
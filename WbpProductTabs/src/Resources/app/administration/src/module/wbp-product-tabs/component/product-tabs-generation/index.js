import template from './product-tabs-modal-generation.html.twig';

const {Component, Mixin, Context} = Shopware;
const {Criteria} = Shopware.Data;
const {mapState, mapGetters, mapPropertyErrors} = Component.getComponentHelper();

Component.register('wbp-product-tabs-modal-generation', {
    template,

    data: function () {
        return {
            tabs: {
                tabsName: null,
                data: null,
                id: null
            }
        }
    },

    props: {
        productId: {
            type: String
        },
        item: {
            type: Object
        }
    },

    inject: [
        'WbpProductTabsService'
    ],

    computed: {
        ...mapState('swProductDetail', [
            'product',
        ]),

    },

    created() {
        if (this.product.id === undefined) {
            let path = window.location.href;
            let arr = path.split('/');
            this.product.id = arr[7];
        }

        this.tabs.productId = this.product.id;
        if (this.item !== null) {
            this.tabs.tabsName = this.item.name;
            this.tabs.data = this.item.description;
            this.tabs.id = this.item.id;
        }else{
            this.tabs.tabsName = null;
            this.tabs.data = null;
            this.tabs.id = null;
        }

    },

    methods: {
        saveTabs() {
            this.validate();

            if (this.tabs.tabsName !== null && this.tabs.data !== null) {
                this.WbpProductTabsService.setNewTab(this.tabs)
                    .then((result) => {
                        this.$emit('product-tabs-save');
                    })
                    .catch((error) => {
                        this.handleError(error);
                    });
            }
        },

        editTab(){
            this.validate();
            console.log(window.localStorage['sw-admin-current-language']);
            console.log(window.localStorage['sw-admin-locale']);
            this.tabs.langId = window.localStorage['sw-admin-current-language'];
            this.tabs.locale = window.localStorage['sw-admin-locale'];
            if (this.tabs.tabsName !== null && this.tabs.data !== null) {
                this.WbpProductTabsService.editTab(this.tabs)
                    .then((result) => {
                        console.log(result);
                        this.$emit('product-tabs-save');
                    })
                    .catch((error) => {
                        this.handleError(error);
                    });
            }

        },

        validate(){
            if (this.tabs.tabsName === null) {
                document.getElementById('sw-field--tabs-tabsName').style.border = "solid 1px red";
            } else {
                document.getElementById('sw-field--tabs-tabsName').style.border = "solid 1px #d1d9e0";
            }

            if (this.tabs.data === null) {
                document.getElementsByClassName('sw-text-editor__content-editor')[0].style.border = "solid 1px red";
            } else {
                document.getElementsByClassName('sw-text-editor__content-editor')[0].style.border = "solid 1px #d1d9e0";
            }
        }
    }

});
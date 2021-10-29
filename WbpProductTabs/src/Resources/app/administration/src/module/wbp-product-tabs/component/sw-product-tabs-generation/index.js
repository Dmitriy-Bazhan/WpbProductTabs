import template from './sw-product-tabs-modal-generation.html.twig';

const {Component, Mixin, Context} = Shopware;
const {Criteria} = Shopware.Data;
const {mapState, mapGetters, mapPropertyErrors} = Component.getComponentHelper();

Component.register('wbp-product-tabs-modal-generation', {
    template,

    data: function () {
        return {
            repository: null,
            productId: null,
            tabs: null
        }
    },

    mixins: [
        Mixin.getByName('placeholder')
    ],

    inject: [
        'repositoryFactory',
        'wbpProductTabs'
    ],

    computed: {

        ...mapPropertyErrors('tabs', [
            'tabsName',
            'data'
        ]),

        tabs() {
            return this.repositoryFactory.create('wbp_product_tabs');
        },
    },

    created() {
        console.log(this.tabs);
    },

    methods: {
        saveTabs() {
            this.$emit('product-tabs-save');
        }
    }

});
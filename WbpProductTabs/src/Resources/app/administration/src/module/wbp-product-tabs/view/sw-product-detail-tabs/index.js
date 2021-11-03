import template from './sw-product-detail-tabs.html.twig';

const {Component, Mixin, Context} = Shopware;
const {Criteria} = Shopware.Data;
const {mapState, mapGetters} = Component.getComponentHelper();

Component.register('sw-product-detail-tabs', {
    template,

    metaInfo() {
        return {
            title: 'Tabs'
        };
    },

    inject: [
        'repositoryFactory',
        'wbpProductTabs'
    ],

    data: function () {
        return {
            dataSource: [],
            columns: [
                {
                    property: 'id',
                    label: 'Id',
                    allowResize: true,
                    width: '125px',
                    align: 'right',
                },
                {
                    property: 'tabsName',
                    label: 'Tab Name',
                    inlineEdit: 'string',
                    allowResize: true,
                    width: '125px',
                    align: 'right',
                },
                {
                    property: 'data',
                    label: 'Data',
                    inlineEdit: 'string',
                    allowResize: true,
                    width: '125px',
                    align: 'right',
                },
                {
                    property: 'isEnabled',
                    label: 'Is Enabled',
                    inlineEdit: 'boolean',
                    allowResize: true,
                    width: '125px',
                    align: 'right',
                }
            ],
            repository: null,
            productId: null
        };
    },

    mixins: [
        Mixin.getByName('listing')
    ],

    computed: {
        ...mapState('swProductDetail', [
            'product',
            'parentProduct',
            'customFieldSets',
            'loading',
        ]),

        ...mapGetters('swProductDetail', [
            'isLoading',
            'showModeSetting',
            'showProductCard',
        ]),

        productMediaRepository() {
            return this.repositoryFactory.create(this.product.entity);
        },

        wbpProductTabsRepository() {
            return this.repositoryFactory.create('wbp_product_tabs');
        },

        itemsCriteria() {
            //Todo: temporary
            let path = window.location.href;
            let arr = path.split('/');
            this.productId = arr[7];

            const criteria = new Criteria();
            const params = this.getMainListingParams();
            params.sortBy = params.sortBy || 'id';
            params.sortDirection = params.sortDirection || 'ASC';

            criteria.setTerm(this.term);
            criteria.addSorting(Criteria.sort(params.sortBy, params.sortDirection));
            criteria.addFilter(Criteria.equals('productId', this.productId));

            return criteria;
        }
    },

    methods: {
        getList() {
            this.wbpProductTabsRepository.search(this.itemsCriteria, Shopware.Context.api).then(items => {
                if (items.length < 1) {
                    this.setDefaultTabs();
                }
                this.dataSource = items;
            });
        },

        onEdit(item) {
            console.log(item.id);
        },

        onDelete(item) {
            console.log(item.id);
        },

        setDefaultTabs() {
            this.wbpProductTabs.setDefaultTabs(this.productId)
                .then((result) => {
                    window.location.reload();
                })
                .catch((error) => {
                    this.handleError(error);
                });
        }
    }

});
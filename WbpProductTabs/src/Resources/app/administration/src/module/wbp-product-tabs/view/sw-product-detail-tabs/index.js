import template from './sw-product-detail-tabs.html.twig';
import './sw-product-detail-tabs.scss';

const {Component, Mixin, Context} = Shopware;
const {Criteria} = Shopware.Data;
const {mapState, mapGetters} = Shopware.Component.getComponentHelper();

Component.register('sw-product-detail-tabs', {
    template,

    metaInfo() {
        return {
            title: 'Tabs'
        };
    },

    inject: [
        'repositoryFactory',
        'WbpProductTabsService'
    ],

    data: function () {
        return {
            dataSource: [],
            columns: [
                {
                    property: 'position',
                    label: this.$tc('wbp-product-tabs.general.position'),
                    width: '125px',
                    align: 'left',
                },
                {
                    property: 'tabsName',
                    label: this.$tc('wbp-product-tabs.general.tabsName'),
                    allowResize: true,
                    width: '200px',
                    align: 'right',
                },
                {
                    property: 'data',
                    label: this.$tc('wbp-product-tabs.general.data'),
                    width: '200px',
                    align: 'left',
                },
                {
                    property: 'isEnabled',
                    label: this.$tc('wbp-product-tabs.general.visibility'),
                    width: '125px',
                    align: 'right',
                },
            ],
            activeModal: '',
            showDeleteModal: '',
            editItem: null,
        };
    },

    mixins: [
        Mixin.getByName('listing')
    ],

    computed: {
        ...mapState('swProductDetail', [
            'product',
        ]),

        wbpProductTabsRepository() {
            return this.repositoryFactory.create('wbp_product_tabs');
        },

        itemsCriteria() {
            //Todo: temporary
            if (this.product.id === undefined) {
                let path = window.location.href;
                let arr = path.split('/');
                this.product.id = arr[7];
            }

            const criteria = new Criteria();
            const params = this.getMainListingParams();
            params.sortBy = params.sortBy || 'position';
            params.sortDirection = params.sortDirection || 'ASC';

            criteria.addSorting(Criteria.sort(params.sortBy, params.sortDirection));
            criteria.addFilter(Criteria.equals('productId', this.product.id));

            return criteria;
        }
    },

    methods: {
        getList() {
            this.wbpProductTabsRepository.search(this.itemsCriteria, Context.api).then(items => {
                if (items.length < 1) {
                    this.setDefaultTabs();
                }
                this.dataSource = items;
            });
        },

        addNewTab() {
            this.activeModal = 'addNewTab';
        },

        productTabsSave() {
            this.activeModal = '';
            this.editItem = null;
            this.getList();
        },

        onEdit(item) {
            if (item.tabsName === 'Reviews' || item.tabsName === 'Description') {
                return;
            }
            this.editItem = item;
            this.activeModal = 'addNewTab';
        },

        onConfirmDelete(item) {
            this.WbpProductTabsService.removeTab(item.id)
                .then((result) => {
                    this.showDeleteModal = null;
                    this.getList();
                })
                .catch((error) => {
                    this.handleError(error);
                });
        },

        onCloseDeleteModal() {
            this.showDeleteModal = null;
        },

        CloseActiveModal(){
            this.activeModal = '';
            this.editItem = null;
        },

        changeVisibility(item) {
            this.WbpProductTabsService.changeVisibility(item.id)
                .then((result) => {
                    this.getList();
                })
                .catch((error) => {
                    this.handleError(error);
                });
        },

        setDefaultTabs() {
            this.WbpProductTabsService.setDefaultTabs(this.product.id)
                .then((result) => {
                    this.getList();
                })
                .catch((error) => {
                    this.handleError(error);
                });
        },

        positionUp(item){
            this.WbpProductTabsService.positionUp(item.id, item.productId)
                .then((result) => {
                    this.getList();
                })
                .catch((error) => {
                    this.handleError(error);
                });
        },

        positionDown(item){
            this.WbpProductTabsService.positionDown(item.id, item.productId)
                .then((result) => {
                    this.getList();
                })
                .catch((error) => {
                    this.handleError(error);
                });
        }
    }

});
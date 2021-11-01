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
                    property: 'id',
                    label: 'Id',
                    width: '125px',
                    align: 'left',
                },
                {
                    property: 'tabsName',
                    label: 'Tab Name',
                    allowResize: true,
                    width: '200px',
                    align: 'right',
                },
                {
                    property: 'data',
                    label: 'Data',
                    allowResize: true,
                    width: '400px',
                    align: 'right',
                },
                {
                    property: 'isEnabled',
                    label: 'Is Enabled',
                    allowResize: true,
                    width: '125px',
                    align: 'right',
                },
            ],
            activeModal: '',
            showDeleteModal: '',
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
            // const params = this.getMainListingParams();
            // params.sortBy = params.sortBy || 'id';
            // params.sortDirection = params.sortDirection || 'ASC';

            // criteria.setTerm(this.term);
            // criteria.addSorting(Criteria.sort(params.sortBy, params.sortDirection));
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

        addNewTab(){
            this.activeModal = 'addNewTab';
        },

        productTabsSave(){
            this.activeModal = '';
            this.getList();
        },

        onEdit(item) {
            console.log(item.id);
        },

        onConfirmDelete(item){
            console.log('onConfirmDelete' + item.id);
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
            this.wbpProductTabsService.setDefaultTabs(this.product.id)
                .then((result) => {
                    this.getList();
                })
                .catch((error) => {
                    this.handleError(error);
                });
        }
    }

});
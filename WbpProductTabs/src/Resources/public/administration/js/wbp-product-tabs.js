(this.webpackJsonp=this.webpackJsonp||[]).push([["wbp-product-tabs"],{"6OIW":function(t,e){t.exports='<sw-card title="Tabs" class="wbp_product_tabs_list_toolbar_wrapper">\n\n    {% block wbp_product_tabs_list_toolbar %}\n\n        <div class="sw-configuration-option-list__toolbar">\n\n            {% block wbp_product_tabs_list_toolbar_container %}\n\n                <sw-container\n                        columns="1fr minmax(50px, 100px) minmax(50px, 1250px)"\n                        gap="0 10px"\n                >\n\n                    {% block wbp_product_tabs_list_toolbar_buttons %}\n                        <sw-button\n                                v-tooltip=""\n                                @click="addNewTab()"\n                        >\n                            Add New Tabs\n                        </sw-button>\n\n                    {% endblock %}\n\n                </sw-container>\n\n            {% endblock %}\n\n        </div>\n\n    {% endblock %}\n\n    <sw-data-grid\n            class="sw-product-tabs__data-grid"\n            :dataSource="dataSource"\n            :columns="columns"\n            :show-selection="false"\n    >\n        {% block wbp_product_tabs_is_enabled %}\n            <template\n                    slot="column-isEnabled"\n                    slot-scope="{ item }"\n            >\n                <template>\n                    <sw-icon\n                            v-if="item.isEnabled === 1"\n                            name="small-default-checkmark-line-medium"\n                            small\n                            class="is--active"\n                            @click="changeVisibility(item)"\n                    />\n                    <sw-icon\n                            v-else-if="item.isEnabled === 0"\n                            name="small-default-x-line-medium"\n                            small\n                            class="is--inactive"\n                            @click="changeVisibility(item)"\n                    />\n                    <sw-icon\n                            v-else\n                            key="inherit-icon"\n                            :multicolor="true"\n                            name="custom-inherited"\n                            size="16"\n                    />\n                </template>\n            </template>\n        {% endblock %}\n\n\n        {% block wbp_product_tabs_actions %}\n            <template slot="actions" slot-scope="{ item }">\n\n                {% block wbp_product_tabs_actions_items %}\n                    <sw-context-menu-item @click="onEdit(item)">\n                        Edit\n                    </sw-context-menu-item>\n\n                    <sw-context-menu-item @click="onDelete(item)">\n                        Delete\n                    </sw-context-menu-item>\n                {% endblock %}\n\n            </template>\n        {% endblock %}\n\n    </sw-data-grid>\n\n    {% block wbp_product_tabs_modal_generation %}\n        <wbp-product-tabs-modal-generation\n                v-if="activeModal === \'addNewTab\'"\n                :productId="product.id"\n                @close-modal="activeModal = \'\'"\n                @product-tabs-save="productTabsSave"\n        />\n    {% endblock %}\n\n</sw-card>'},"9Svn":function(t,e){t.exports='{% block wbp_product_tabs_modal_generation %}\n    <sw-modal\n            class="wbp-product-tabs-modal-generation"\n            @modal-close="$emit(\'close-modal\')"\n    >\n\n        {% block wbp_product_tabs_modal_generation_sidebar %}\n            <div>\n\n                <sw-text-field\n                        required\n                        class="wbp-product-tabs-base__active"\n                        v-model="tabs.tabsName"\n                        validation="required"\n                        label="Name"\n                        :error="tabsTabsNameError">\n                </sw-text-field>\n\n            </div>\n\n            <div>\n\n                <sw-text-field\n                        class="wbp-product-tabs-base__active"\n                        v-model="tabs.data"\n                        validation="required"\n                        label="Data"\n                        :error="tabsDataError">\n\n                </sw-text-field>\n\n            </div>\n\n            <div>\n                <sw-button\n                        @click="saveTabs()"\n                >\n                    Save\n                </sw-button>\n            </div>\n\n        {% endblock %}\n\n    </sw-modal>\n\n{% endblock %}'},CkOj:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n("lSNA"),i=n.n(r),o=n("lO2t"),a=n("lYO9");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){i()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t){var e=function(t){var e;if(o.a.isString(t))try{e=JSON.parse(t)}catch(t){return!1}else{if(!o.a.isObject(t)||o.a.isArray(t))return!1;e=t}return e}(t);if(!e)return null;if(!0===e.parsed||!function(t){return void 0!==t.data||void 0!==t.errors||void 0!==t.links||void 0!==t.meta}(e))return e;var n=function(t){var e={links:null,errors:null,data:null,associations:null,aggregations:null};if(t.errors)return e.errors=t.errors,e;var n=function(t){var e=new Map;if(!t||!t.length)return e;return t.forEach((function(t){var n="".concat(t.type,"-").concat(t.id);e.set(n,t)})),e}(t.included);if(o.a.isArray(t.data))e.data=t.data.map((function(t){var r=l(t,n);return Object(a.g)(r,"associationLinks")&&(e.associations=s(s({},e.associations),r.associationLinks),delete r.associationLinks),r}));else if(o.a.isObject(t.data)){var r=l(t.data,n);Object.prototype.hasOwnProperty.call(r,"associationLinks")&&(e.associations=s(s({},e.associations),r.associationLinks),delete r.associationLinks),e.data=r}else e.data=null;t.meta&&Object.keys(t.meta).length&&(e.meta=p(t.meta));t.links&&Object.keys(t.links).length&&(e.links=t.links);t.aggregations&&Object.keys(t.aggregations).length&&(e.aggregations=t.aggregations);return e}(e);return n.parsed=!0,n}function l(t,e){var n={id:t.id,type:t.type,links:t.links||{},meta:t.meta||{}};if(t.attributes&&Object.keys(t.attributes).length>0){var r=p(t.attributes);n=s(s({},n),r)}if(t.relationships){var i=function(t,e){var n={},r={};return Object.keys(t).forEach((function(i){var a=t[i];if(a.links&&Object.keys(a.links).length&&(r[i]=a.links.related),a.data){var c=a.data;o.a.isArray(c)?n[i]=c.map((function(t){return d(t,e)})):o.a.isObject(c)?n[i]=d(c,e):n[i]=null}})),{mappedRelations:n,associationLinks:r}}(t.relationships,e);n=s(s(s({},n),i.mappedRelations),{associationLinks:i.associationLinks})}return n}function p(t){var e={};return Object.keys(t).forEach((function(n){var r=t[n],i=n.replace(/-([a-z])/g,(function(t,e){return e.toUpperCase()}));e[i]=r})),e}function d(t,e){var n="".concat(t.type,"-").concat(t.id);return e.has(n)?l(e.get(n),e):t}},SwLI:function(t,e,n){"use strict";n.r(e);var r=n("lwsE"),i=n.n(r),o=n("W8MJ"),a=n.n(o),c=n("CkOj"),s=function(){function t(e,n,r){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/vnd.api+json";i()(this,t),this.httpClient=e,this.loginService=n,this.apiEndpoint=r,this.contentType=o}return a()(t,[{key:"getApiBasePath",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n="";return null!=e&&e.length&&(n+="".concat(e,"/")),t&&t.length>0?"".concat(n).concat(this.apiEndpoint,"/").concat(t):"".concat(n).concat(this.apiEndpoint)}},{key:"getBasicHeaders",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e={Accept:this.contentType,Authorization:"Bearer ".concat(this.loginService.getToken()),"Content-Type":"application/json"};return Object.assign({},e,t)}},{key:"apiEndpoint",get:function(){return this.endpoint},set:function(t){this.endpoint=t}},{key:"httpClient",get:function(){return this.client},set:function(t){this.client=t}},{key:"contentType",get:function(){return this.type},set:function(t){this.type=t}}],[{key:"handleResponse",value:function(e){if(null===e.data||void 0===e.data)return e;var n=e.data,r=e.headers;return null!=r&&r["content-type"]&&"application/vnd.api+json"===r["content-type"]&&(n=t.parseJsonApiData(n)),n}},{key:"parseJsonApiData",value:function(t){return Object(c.a)(t)}},{key:"getVersionHeader",value:function(t){return{"sw-version-id":t}}}]),t}();e.default=s},lO2t:function(t,e,n){"use strict";n.d(e,"b",(function(){return P}));var r=n("GoyQ"),i=n.n(r),o=n("YO3V"),a=n.n(o),c=n("E+oP"),s=n.n(c),u=n("wAXd"),l=n.n(u),p=n("Z0cm"),d=n.n(p),b=n("lSCD"),f=n.n(b),h=n("YiAA"),y=n.n(h),v=n("4qC0"),m=n.n(v),w=n("Znm+"),g=n.n(w),O=n("Y+p1"),j=n.n(O),k=n("UB5X"),_=n.n(k);function P(t){return void 0===t}e.a={isObject:i.a,isPlainObject:a.a,isEmpty:s.a,isRegExp:l.a,isArray:d.a,isFunction:f.a,isDate:y.a,isString:m.a,isBoolean:g.a,isEqual:j.a,isNumber:_.a,isUndefined:P}},lYO9:function(t,e,n){"use strict";n.d(e,"h",(function(){return g})),n.d(e,"i",(function(){return O})),n.d(e,"a",(function(){return j})),n.d(e,"d",(function(){return k})),n.d(e,"k",(function(){return _})),n.d(e,"j",(function(){return P})),n.d(e,"g",(function(){return S})),n.d(e,"b",(function(){return x})),n.d(e,"c",(function(){return E})),n.d(e,"f",(function(){return D})),n.d(e,"e",(function(){return T}));var r=n("lSNA"),i=n.n(r),o=n("QkVN"),a=n.n(o),c=n("JBE3"),s=n.n(c),u=n("BkRI"),l=n.n(u),p=n("mwIZ"),d=n.n(p),b=n("D1y2"),f=n.n(b),h=n("JZM8"),y=n.n(h),v=n("lO2t");function m(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach((function(e){i()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}a.a,a.a,l.a,d.a,f.a,y.a;var g=a.a,O=s.a,j=l.a,k=d.a,_=f.a,P=y.a;function S(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function x(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return JSON.parse(JSON.stringify(t))}function E(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return O(t,e,(function(t,e){if(Array.isArray(t))return t.concat(e)}))}function D(t,e){return t===e?{}:v.a.isObject(t)&&v.a.isObject(e)?v.a.isDate(t)||v.a.isDate(e)?t.valueOf()===e.valueOf()?{}:e:Object.keys(e).reduce((function(n,r){if(!S(t,r))return w(w({},n),{},i()({},r,e[r]));if(v.a.isArray(e[r])){var o=T(t[r],e[r]);return Object.keys(o).length>0?w(w({},n),{},i()({},r,e[r])):n}if(v.a.isObject(e[r])){var a=D(t[r],e[r]);return!v.a.isObject(a)||Object.keys(a).length>0?w(w({},n),{},i()({},r,a)):n}return t[r]!==e[r]?w(w({},n),{},i()({},r,e[r])):n}),{}):e}function T(t,e){if(t===e)return[];if(!v.a.isArray(t)||!v.a.isArray(e))return e;if(t.length<=0&&e.length<=0)return[];if(t.length!==e.length)return e;if(!v.a.isObject(e[0]))return e.filter((function(e){return!t.includes(e)}));var n=[];return e.forEach((function(r,i){var o=D(t[i],e[i]);Object.keys(o).length>0&&n.push(e[i])})),n}},lxBF:function(t,e,n){"use strict";n.r(e);var r=n("rXA9"),i=n.n(r);Shopware.Component.override("sw-product-detail",{template:i.a});var o=n("6OIW"),a=n.n(o);n("mezv");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){u(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function u(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var l=Shopware,p=l.Component,d=l.Mixin,b=(l.Context,Shopware.Data.Criteria),f=p.getComponentHelper(),h=f.mapState;f.mapGetters;p.register("sw-product-detail-tabs",{template:a.a,metaInfo:function(){return{title:"Tabs"}},inject:["repositoryFactory","wbpProductTabs"],data:function(){return{dataSource:[],columns:[{property:"id",label:"Id",width:"125px",align:"left"},{property:"tabsName",label:"Tab Name",inlineEdit:"string",allowResize:!0,width:"200px",align:"right"},{property:"data",label:"Data",inlineEdit:"string",allowResize:!0,width:"400px",align:"right"},{property:"isEnabled",label:"Is Enabled",inlineEdit:"boolean",allowResize:!0,width:"125px",align:"right"}],repository:null,activeModal:""}},mixins:[d.getByName("listing")],computed:s(s({},h("swProductDetail",["product"])),{},{productMediaRepository:function(){return this.repositoryFactory.create(this.product.entity)},wbpProductTabsRepository:function(){return this.repositoryFactory.create("wbp_product_tabs")},itemsCriteria:function(){if(void 0===this.product.id){var t=window.location.href.split("/");this.product.id=t[7]}var e=new b,n=this.getMainListingParams();return n.sortBy=n.sortBy||"id",n.sortDirection=n.sortDirection||"ASC",e.setTerm(this.term),e.addSorting(b.sort(n.sortBy,n.sortDirection)),e.addFilter(b.equals("productId",this.product.id)),e}}),methods:{getList:function(){var t=this;this.wbpProductTabsRepository.search(this.itemsCriteria,Shopware.Context.api).then((function(e){e.length<1&&t.setDefaultTabs(),t.dataSource=e}))},addNewTab:function(){this.activeModal="addNewTab"},productTabsSave:function(){this.activeModal="",this.getList()},onEdit:function(t){console.log(t.id)},onDelete:function(t){console.log(t.id)},changeVisibility:function(t){var e=this;this.wbpProductTabs.changeVisibility(t.id).then((function(t){e.getList()})).catch((function(t){e.handleError(t)}))},setDefaultTabs:function(){var t=this;this.wbpProductTabs.setDefaultTabs(this.product.id).then((function(e){t.getList()})).catch((function(e){t.handleError(e)}))}}});var y=n("9Svn"),v=n.n(y);function m(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function w(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?m(Object(n),!0).forEach((function(e){g(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function g(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var O=Shopware,j=O.Component,k=O.Mixin,_=(O.Context,Shopware.Data.Criteria,j.getComponentHelper()),P=(_.mapState,_.mapGetters,_.mapPropertyErrors);function S(t){return(S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function x(t,e,n,r,i,o,a){try{var c=t[o](a),s=c.value}catch(t){return void n(t)}c.done?e(s):Promise.resolve(s).then(r,i)}function E(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var o=t.apply(e,n);function a(t){x(o,r,i,a,c,"next",t)}function c(t){x(o,r,i,a,c,"throw",t)}a(void 0)}))}}function D(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function T(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function C(t,e){return(C=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function A(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=N(t);if(e){var i=N(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return R(this,n)}}function R(t,e){return!e||"object"!==S(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function N(t){return(N=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}j.register("wbp-product-tabs-modal-generation",{template:v.a,data:function(){return{repository:null,productId:null}},mixins:[k.getByName("placeholder")],inject:["repositoryFactory","wbpProductTabs"],computed:w(w({},P("tabs",["tabsName","data"])),{},{tabs:function(){return this.repositoryFactory.create("wbp_product_tabs")}}),created:function(){console.log(this.tabs)},methods:{saveTabs:function(){this.$emit("product-tabs-save")}}});var B=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&C(t,e)}(c,t);var e,n,r,i,o,a=A(c);function c(t,e){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"wbp-product-tabs";return D(this,c),(n=a.call(this,t,e,r)).name="WbpProductTabsService",n.httpClient=t,n}return e=c,(n=[{key:"setDefaultTabs",value:(o=E(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.httpClient.post("/wbp-product-tabs/set-default-tabs",{productId:e},{headers:this.getBasicHeaders()});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t,this)}))),function(t){return o.apply(this,arguments)})},{key:"changeVisibility",value:(i=E(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.httpClient.post("/wbp-product-tabs/change-visibility",{tabsId:e},{headers:this.getBasicHeaders()});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t,this)}))),function(t){return i.apply(this,arguments)})}])&&T(e.prototype,n),r&&T(e,r),c}(n("SwLI").default);Shopware.Module.register("sw-new-tab-tabs",{routeMiddleware:function(t,e){"sw.product.detail"===e.name&&e.children.push({name:"sw.product.detail.tabs",path:"/sw/product/detail/:id/tabs",component:"sw-product-detail-tabs",meta:{parentPath:"sw.product.index"}}),t(e)}}),Shopware.Application.addServiceProvider("wbpProductTabs",(function(){return new B(Shopware.Application.getContainer("init").httpClient,Shopware.Service("loginService"))}))},mezv:function(t,e,n){var r=n("tQx1");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,n("SZ7m").default)("67b9b35c",r,!0,{})},rXA9:function(t,e){t.exports='{% block sw_product_detail_content_tabs_reviews %}\n\n    {% parent %}\n\n    <sw-tabs-item :route="{ name: \'sw.product.detail.tabs\', params: { id: $route.params.id } }" title="Tabs">\n        Tabs\n    </sw-tabs-item>\n\n{% endblock %}'},tQx1:function(t,e,n){}},[["lxBF","runtime","vendors-node"]]]);
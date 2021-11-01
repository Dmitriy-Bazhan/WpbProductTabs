(this.webpackJsonp=this.webpackJsonp||[]).push([["wbp-product-tabs"],{"6OIW":function(t,e){t.exports='<sw-card title="Tabs" class="wbp_product_tabs_list_toolbar_wrapper">\n\n    {% block wbp_product_tabs_list_toolbar %}\n\n        <div class="sw-configuration-option-list__toolbar">\n\n            {% block wbp_product_tabs_list_toolbar_container %}\n\n                <sw-container\n                        columns="1fr minmax(50px, 100px) minmax(50px, 1250px)"\n                        gap="0 10px"\n                >\n\n                    {% block wbp_product_tabs_list_toolbar_buttons %}\n                        <sw-button\n                                @click="addNewTab()"\n                        >\n                            Add New Tabs\n                        </sw-button>\n\n                    {% endblock %}\n\n                </sw-container>\n\n            {% endblock %}\n\n        </div>\n\n    {% endblock %}\n\n    <sw-data-grid\n            class="sw-product-tabs__data-grid"\n            :dataSource="dataSource"\n            :columns="columns"\n            :show-selection="false"\n    >\n        {% block wbp_product_tabs_is_enabled %}\n            <template\n                    slot="column-isEnabled"\n                    slot-scope="{ item }"\n            >\n                <template>\n                    <sw-icon\n                            v-if="item.isEnabled === 1"\n                            name="small-default-checkmark-line-medium"\n                            small\n                            class="is--active"\n                            @click="changeVisibility(item)"\n                    />\n                    <sw-icon\n                            v-else-if="item.isEnabled === 0"\n                            name="small-default-x-line-medium"\n                            small\n                            class="is--inactive"\n                            @click="changeVisibility(item)"\n                    />\n                    <sw-icon\n                            v-else\n                            key="inherit-icon"\n                            :multicolor="true"\n                            name="custom-inherited"\n                            size="16"\n                    />\n                </template>\n            </template>\n        {% endblock %}\n\n\n        {% if(item.tabsName != \'Reviews\' and item.tabsName != \'Description\') %}\n        <template #actions="{ item }">\n\n            {% block sw_integration_list_grid_inner_slot_columns_actions_edit %}\n                <sw-context-menu-item @click="onEdit(item)">\n                    Edit\n                </sw-context-menu-item>\n\n            {% endblock %}\n\n            {% block sw_integration_list_grid_inner_slot_columns_actions_delete %}\n                <sw-context-menu-item\n                        class="-download-center-file__delete-action"\n                        variant="danger"\n                        @click="showDeleteModal = item.id"\n                >\n\n                    Delete\n                </sw-context-menu-item>\n            {% endblock %}\n\n        </template>\n\n        {% endif %}\n\n        <template #action-modals="{ item }">\n            {% block sw_integration_list_grid_inner_slot_delete_modal %}\n                <sw-modal\n                        variant="small"\n                        v-if="showDeleteModal === item.id"\n                        @modal-close="onCloseDeleteModal"\n                >\n                    {% block sw_integration_list_grid_inner_slot_delete_modal_confirmtext %}\n                        <p>\n                            DELETE TAB\n                        </p>\n                    {% endblock %}\n\n                    {% block sw_integration_list_grid_inner_slot_delete_modal_footer %}\n                        <template slot="modal-footer">\n                            <sw-button\n                                    size="small"\n                                    @click="onCloseDeleteModal"\n                            >\n                                Cancel\n                            </sw-button>\n\n                            <sw-button\n                                    size="small"\n                                    variant="danger"\n                                    @click="onConfirmDelete(item)"\n                            >\n                                Delete\n                            </sw-button>\n                        </template>\n                    {% endblock %}\n                </sw-modal>\n            {% endblock %}\n        </template>\n\n    </sw-data-grid>\n\n    {% block sw_product_tabs_modal_generation %}\n        <wbp-product-tabs-modal-generation\n                v-if="activeModal === \'addNewTab\'"\n                :productId="product.id"\n                @close-modal="activeModal = \'\'"\n                @product-tabs-save="productTabsSave"\n        />\n    {% endblock %}\n\n\n</sw-card>'},"9Svn":function(t,e){t.exports='{% block sw_product_tabs_modal_generation_modal %}\n    <sw-modal class="wbp-product-tabs-modal-generation-modal-content"\n              @modal-close="$emit(\'close-modal\')">\n\n        {% block wbp_product_tabs_modal_generation_sidebar %}\n\n            <div>\n                <sw-text-field\n                        required\n                        class="wbp-product-tabs-tabsName"\n                        v-model="tabs.tabsName"\n                        validation="required"\n                        label="Name"\n                >\n                </sw-text-field>\n\n            </div>\n\n            <div>\n                <sw-text-field\n                        required\n                        class="wbp-product-tabs-data"\n                        v-model="tabs.data"\n                        validation="required"\n                        label="Data"\n                >\n                </sw-text-field>\n\n            </div>\n            <div>\n                <sw-button @click="saveTabs()">Save</sw-button>\n            </div>\n\n        {% endblock %}\n\n    </sw-modal>\n\n{% endblock %}'},CkOj:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var r=n("lSNA"),i=n.n(r),a=n("lO2t"),o=n("lYO9");function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){i()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t){var e=function(t){var e;if(a.a.isString(t))try{e=JSON.parse(t)}catch(t){return!1}else{if(!a.a.isObject(t)||a.a.isArray(t))return!1;e=t}return e}(t);if(!e)return null;if(!0===e.parsed||!function(t){return void 0!==t.data||void 0!==t.errors||void 0!==t.links||void 0!==t.meta}(e))return e;var n=function(t){var e={links:null,errors:null,data:null,associations:null,aggregations:null};if(t.errors)return e.errors=t.errors,e;var n=function(t){var e=new Map;if(!t||!t.length)return e;return t.forEach((function(t){var n="".concat(t.type,"-").concat(t.id);e.set(n,t)})),e}(t.included);if(a.a.isArray(t.data))e.data=t.data.map((function(t){var r=u(t,n);return Object(o.g)(r,"associationLinks")&&(e.associations=c(c({},e.associations),r.associationLinks),delete r.associationLinks),r}));else if(a.a.isObject(t.data)){var r=u(t.data,n);Object.prototype.hasOwnProperty.call(r,"associationLinks")&&(e.associations=c(c({},e.associations),r.associationLinks),delete r.associationLinks),e.data=r}else e.data=null;t.meta&&Object.keys(t.meta).length&&(e.meta=d(t.meta));t.links&&Object.keys(t.links).length&&(e.links=t.links);t.aggregations&&Object.keys(t.aggregations).length&&(e.aggregations=t.aggregations);return e}(e);return n.parsed=!0,n}function u(t,e){var n={id:t.id,type:t.type,links:t.links||{},meta:t.meta||{}};if(t.attributes&&Object.keys(t.attributes).length>0){var r=d(t.attributes);n=c(c({},n),r)}if(t.relationships){var i=function(t,e){var n={},r={};return Object.keys(t).forEach((function(i){var o=t[i];if(o.links&&Object.keys(o.links).length&&(r[i]=o.links.related),o.data){var s=o.data;a.a.isArray(s)?n[i]=s.map((function(t){return p(t,e)})):a.a.isObject(s)?n[i]=p(s,e):n[i]=null}})),{mappedRelations:n,associationLinks:r}}(t.relationships,e);n=c(c(c({},n),i.mappedRelations),{associationLinks:i.associationLinks})}return n}function d(t){var e={};return Object.keys(t).forEach((function(n){var r=t[n],i=n.replace(/-([a-z])/g,(function(t,e){return e.toUpperCase()}));e[i]=r})),e}function p(t,e){var n="".concat(t.type,"-").concat(t.id);return e.has(n)?u(e.get(n),e):t}},SwLI:function(t,e,n){"use strict";n.r(e);var r=n("lwsE"),i=n.n(r),a=n("W8MJ"),o=n.n(a),s=n("CkOj"),c=function(){function t(e,n,r){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/vnd.api+json";i()(this,t),this.httpClient=e,this.loginService=n,this.apiEndpoint=r,this.contentType=a}return o()(t,[{key:"getApiBasePath",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n="";return null!=e&&e.length&&(n+="".concat(e,"/")),t&&t.length>0?"".concat(n).concat(this.apiEndpoint,"/").concat(t):"".concat(n).concat(this.apiEndpoint)}},{key:"getBasicHeaders",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e={Accept:this.contentType,Authorization:"Bearer ".concat(this.loginService.getToken()),"Content-Type":"application/json"};return Object.assign({},e,t)}},{key:"apiEndpoint",get:function(){return this.endpoint},set:function(t){this.endpoint=t}},{key:"httpClient",get:function(){return this.client},set:function(t){this.client=t}},{key:"contentType",get:function(){return this.type},set:function(t){this.type=t}}],[{key:"handleResponse",value:function(e){if(null===e.data||void 0===e.data)return e;var n=e.data,r=e.headers;return null!=r&&r["content-type"]&&"application/vnd.api+json"===r["content-type"]&&(n=t.parseJsonApiData(n)),n}},{key:"parseJsonApiData",value:function(t){return Object(s.a)(t)}},{key:"getVersionHeader",value:function(t){return{"sw-version-id":t}}}]),t}();e.default=c},lO2t:function(t,e,n){"use strict";n.d(e,"b",(function(){return P}));var r=n("GoyQ"),i=n.n(r),a=n("YO3V"),o=n.n(a),s=n("E+oP"),c=n.n(s),l=n("wAXd"),u=n.n(l),d=n("Z0cm"),p=n.n(d),b=n("lSCD"),f=n.n(b),h=n("YiAA"),m=n.n(h),v=n("4qC0"),w=n.n(v),y=n("Znm+"),g=n.n(y),O=n("Y+p1"),k=n.n(O),_=n("UB5X"),j=n.n(_);function P(t){return void 0===t}e.a={isObject:i.a,isPlainObject:o.a,isEmpty:c.a,isRegExp:u.a,isArray:p.a,isFunction:f.a,isDate:m.a,isString:w.a,isBoolean:g.a,isEqual:k.a,isNumber:j.a,isUndefined:P}},lYO9:function(t,e,n){"use strict";n.d(e,"h",(function(){return g})),n.d(e,"i",(function(){return O})),n.d(e,"a",(function(){return k})),n.d(e,"d",(function(){return _})),n.d(e,"k",(function(){return j})),n.d(e,"j",(function(){return P})),n.d(e,"g",(function(){return S})),n.d(e,"b",(function(){return x})),n.d(e,"c",(function(){return D})),n.d(e,"f",(function(){return E})),n.d(e,"e",(function(){return T}));var r=n("lSNA"),i=n.n(r),a=n("QkVN"),o=n.n(a),s=n("JBE3"),c=n.n(s),l=n("BkRI"),u=n.n(l),d=n("mwIZ"),p=n.n(d),b=n("D1y2"),f=n.n(b),h=n("JZM8"),m=n.n(h),v=n("lO2t");function w(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function y(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?w(Object(n),!0).forEach((function(e){i()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}o.a,o.a,u.a,p.a,f.a,m.a;var g=o.a,O=c.a,k=u.a,_=p.a,j=f.a,P=m.a;function S(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function x(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return JSON.parse(JSON.stringify(t))}function D(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return O(t,e,(function(t,e){if(Array.isArray(t))return t.concat(e)}))}function E(t,e){return t===e?{}:v.a.isObject(t)&&v.a.isObject(e)?v.a.isDate(t)||v.a.isDate(e)?t.valueOf()===e.valueOf()?{}:e:Object.keys(e).reduce((function(n,r){if(!S(t,r))return y(y({},n),{},i()({},r,e[r]));if(v.a.isArray(e[r])){var a=T(t[r],e[r]);return Object.keys(a).length>0?y(y({},n),{},i()({},r,e[r])):n}if(v.a.isObject(e[r])){var o=E(t[r],e[r]);return!v.a.isObject(o)||Object.keys(o).length>0?y(y({},n),{},i()({},r,o)):n}return t[r]!==e[r]?y(y({},n),{},i()({},r,e[r])):n}),{}):e}function T(t,e){if(t===e)return[];if(!v.a.isArray(t)||!v.a.isArray(e))return e;if(t.length<=0&&e.length<=0)return[];if(t.length!==e.length)return e;if(!v.a.isObject(e[0]))return e.filter((function(e){return!t.includes(e)}));var n=[];return e.forEach((function(r,i){var a=E(t[i],e[i]);Object.keys(a).length>0&&n.push(e[i])})),n}},lxBF:function(t,e,n){"use strict";n.r(e);var r=n("rXA9"),i=n.n(r);Shopware.Component.override("sw-product-detail",{template:i.a});var a=n("6OIW"),o=n.n(a);n("mezv");function s(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function c(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?s(Object(n),!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u=Shopware,d=u.Component,p=u.Mixin,b=u.Context,f=Shopware.Data.Criteria,h=Shopware.Component.getComponentHelper(),m=h.mapState;h.mapGetters;d.register("sw-product-detail-tabs",{template:o.a,metaInfo:function(){return{title:"Tabs"}},inject:["repositoryFactory","WbpProductTabsService"],data:function(){return{dataSource:[],columns:[{property:"id",label:"Id",width:"125px",align:"left"},{property:"tabsName",label:"Tab Name",allowResize:!0,width:"200px",align:"right"},{property:"data",label:"Data",allowResize:!0,width:"400px",align:"right"},{property:"isEnabled",label:"Is Enabled",allowResize:!0,width:"125px",align:"right"}],activeModal:"",showDeleteModal:""}},mixins:[p.getByName("listing")],computed:c(c({},m("swProductDetail",["product"])),{},{wbpProductTabsRepository:function(){return this.repositoryFactory.create("wbp_product_tabs")},itemsCriteria:function(){if(void 0===this.product.id){var t=window.location.href.split("/");this.product.id=t[7]}var e=new f;return e.addFilter(f.equals("productId",this.product.id)),e}}),methods:{getList:function(){var t=this;this.wbpProductTabsRepository.search(this.itemsCriteria,b.api).then((function(e){e.length<1&&t.setDefaultTabs(),t.dataSource=e}))},addNewTab:function(){this.activeModal="addNewTab"},productTabsSave:function(){this.activeModal="",this.getList()},onEdit:function(t){console.log(t.id)},onConfirmDelete:function(t){var e=this;console.log("onConfirmDelete"+t.id),this.WbpProductTabsService.removeTab(t.id).then((function(t){e.showDeleteModal=null,e.getList()})).catch((function(t){e.handleError(t)}))},onCloseDeleteModal:function(){this.showDeleteModal=null},changeVisibility:function(t){var e=this;this.WbpProductTabsService.changeVisibility(t.id).then((function(t){e.getList()})).catch((function(t){e.handleError(t)}))},setDefaultTabs:function(){var t=this;this.wbpProductTabsService.setDefaultTabs(this.product.id).then((function(e){t.getList()})).catch((function(e){t.handleError(e)}))}}});var v=n("9Svn"),w=n.n(v);function y(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function g(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var O=Shopware,k=O.Component,_=(O.Mixin,O.Context,Shopware.Data.Criteria,k.getComponentHelper()),j=_.mapState;_.mapGetters,_.mapPropertyErrors;function P(t){return(P="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function S(t,e,n,r,i,a,o){try{var s=t[a](o),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,i)}function x(t){return function(){var e=this,n=arguments;return new Promise((function(r,i){var a=t.apply(e,n);function o(t){S(a,r,i,o,s,"next",t)}function s(t){S(a,r,i,o,s,"throw",t)}o(void 0)}))}}function D(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function E(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function T(t,e){return(T=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function C(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=A(t);if(e){var i=A(this).constructor;n=Reflect.construct(r,arguments,i)}else n=r.apply(this,arguments);return N(this,n)}}function N(t,e){return!e||"object"!==P(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function A(t){return(A=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}k.register("wbp-product-tabs-modal-generation",{template:w.a,data:function(){return{tabs:{tabsName:null,data:null}}},inject:["WbpProductTabsService"],computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?y(Object(n),!0).forEach((function(e){g(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):y(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},j("swProductDetail",["product"])),created:function(){if(void 0===this.product.id){var t=window.location.href.split("/");this.product.id=t[7]}this.tabs.productId=this.product.id},methods:{saveTabs:function(){var t=this;null===this.tabs.tabsName?document.getElementById("sw-field--tabs-tabsName").style.border="solid 1px red":document.getElementById("sw-field--tabs-tabsName").style.border="solid 1px #d1d9e0",null===this.tabs.data?document.getElementById("sw-field--tabs-data").style.border="solid 1px red":document.getElementById("sw-field--tabs-data").style.border="solid 1px #d1d9e0",null!==this.tabs.tabsName&&null!==this.tabs.data&&this.WbpProductTabsService.setNewData(this.tabs).then((function(e){console.log(e),t.$emit("product-tabs-save")})).catch((function(e){t.handleError(e)}))}}});var R=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&T(t,e)}(l,t);var e,n,r,i,a,o,s,c=C(l);function l(t,e){var n,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"wbp-product-tabs";return D(this,l),(n=c.call(this,t,e,r)).name="WbpProductTabsService",n.httpClient=t,n}return e=l,(n=[{key:"setDefaultTabs",value:(s=x(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.httpClient.post("/wbp-product-tabs/set-default-tabs",{productId:e},{headers:this.getBasicHeaders()});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t,this)}))),function(t){return s.apply(this,arguments)})},{key:"changeVisibility",value:(o=x(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.httpClient.post("/wbp-product-tabs/change-visibility",{tabsId:e},{headers:this.getBasicHeaders()});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t,this)}))),function(t){return o.apply(this,arguments)})},{key:"setNewData",value:(a=x(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.httpClient.post("/wbp-product-tabs/set-new-tab",{newTab:e},{headers:this.getBasicHeaders()});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t,this)}))),function(t){return a.apply(this,arguments)})},{key:"removeTab",value:(i=x(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.httpClient.post("/wbp-product-tabs/remove-tab",{id:e},{headers:this.getBasicHeaders()});case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}}),t,this)}))),function(t){return i.apply(this,arguments)})}])&&E(e.prototype,n),r&&E(e,r),l}(n("SwLI").default);Shopware.Module.register("sw-new-tab-tabs",{routeMiddleware:function(t,e){"sw.product.detail"===e.name&&e.children.push({name:"sw.product.detail.tabs",path:"/sw/product/detail/:id/tabs",component:"sw-product-detail-tabs",meta:{parentPath:"sw.product.index"}}),t(e)}}),Shopware.Application.addServiceProvider("WbpProductTabsService",(function(){return new R(Shopware.Application.getContainer("init").httpClient,Shopware.Service("loginService"))}))},mezv:function(t,e,n){var r=n("tQx1");"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,n("SZ7m").default)("67b9b35c",r,!0,{})},rXA9:function(t,e){t.exports='{% block sw_product_detail_content_tabs_reviews %}\n\n    {% parent %}\n\n    <sw-tabs-item :route="{ name: \'sw.product.detail.tabs\', params: { id: $route.params.id } }" title="Tabs">\n        Tabs\n    </sw-tabs-item>\n\n{% endblock %}'},tQx1:function(t,e,n){}},[["lxBF","runtime","vendors-node"]]]);
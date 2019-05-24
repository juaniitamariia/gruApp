(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["cotizaciones-cotizaciones-module"],{

/***/ "./src/app/cotizaciones/cotizaciones.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/cotizaciones/cotizaciones.module.ts ***!
  \*****************************************************/
/*! exports provided: CotizacionesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CotizacionesPageModule", function() { return CotizacionesPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _cotizaciones_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cotizaciones.page */ "./src/app/cotizaciones/cotizaciones.page.ts");







var routes = [
    {
        path: '',
        component: _cotizaciones_page__WEBPACK_IMPORTED_MODULE_6__["CotizacionesPage"]
    }
];
var CotizacionesPageModule = /** @class */ (function () {
    function CotizacionesPageModule() {
    }
    CotizacionesPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_cotizaciones_page__WEBPACK_IMPORTED_MODULE_6__["CotizacionesPage"]]
        })
    ], CotizacionesPageModule);
    return CotizacionesPageModule;
}());



/***/ }),

/***/ "./src/app/cotizaciones/cotizaciones.page.html":
/*!*****************************************************!*\
  !*** ./src/app/cotizaciones/cotizaciones.page.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n    <ion-toolbar style=\"--background:#6561AB;\">\n      <ion-button class=\"arrow-btn\" fill=clear style=\"color:white;\" (click)=\"navigateBack()\"><ion-icon name=md-arrow-round-back></ion-icon></ion-button>\n      <ion-title class=\"pay-title\" style=\"font-weight:300; color:white\">COTIZACIONES</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <div class=\"espacio\">\n    <ion-card *ngFor=\"let quot of quots\"  >\n      <ion-grid>\n        <ion-row>\n          <ion-col size=\"4\">\n              <h6 class=\"titulo\">GRUERO:</h6> \n          </ion-col>\n          <ion-col size=\"5\">\n              <h6 class=\"nombre\">{{quot.driver.name}}</h6> \n          </ion-col>\n          <ion-col size=\"3\">\n            <ion-button (click)= 'acceptQuote()' class=\"btn-aceptar\">\n                <ion-icon name=\"md-checkmark-circle\"></ion-icon>\n            </ion-button>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"4\">\n                <h6 class=\"titulo\">PRECIO:</h6> \n            </ion-col>\n            <ion-col size=\"5\">\n                <h6 class=\"precio\">{{quot.price}}</h6> \n            </ion-col>\n            <ion-col size=\"3\">\n              <ion-button (click)= 'removeCotizaciones(quot)' class=\"btn-declinar\">\n                    <ion-icon name=\"md-close-circle\"></ion-icon>\n                </ion-button>\n              </ion-col>\n          </ion-row>\n      </ion-grid>\n    </ion-card>\n\n  </div>\n"

/***/ }),

/***/ "./src/app/cotizaciones/cotizaciones.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/cotizaciones/cotizaciones.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".precio {\n  color: red;\n  font-weight: 800; }\n\n.nombre {\n  font-weight: 800; }\n\n.btn-aceptar {\n  --background: rgb(30, 219, 140);\n  --color: white;\n  font-size: 15px;\n  width: 50px; }\n\n.btn-declinar {\n  --background:rgb(219, 61, 61);\n  --color: white;\n  font-size: 15px;\n  width: 50px; }\n\n.espacio {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  height: 100vh;\n  width: 40vh; }\n\n.titulo {\n  font-size: 12px;\n  margin-bottom: 20px;\n  margin-top: 20px; }\n\n.explicacion {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 0px;\n  font-size: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvY290aXphY2lvbmVzL2NvdGl6YWNpb25lcy5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxVQUFVO0VBQ1YsZ0JBQWdCLEVBQUE7O0FBR3BCO0VBQ0ksZ0JBQWdCLEVBQUE7O0FBR3BCO0VBQ0ksK0JBQWE7RUFDYixjQUFRO0VBQ1IsZUFBZTtFQUNmLFdBQVcsRUFBQTs7QUFHZjtFQUNJLDZCQUFhO0VBQ2IsY0FBUTtFQUNSLGVBQWU7RUFDZixXQUFXLEVBQUE7O0FBR2Y7RUFDSSxPQUFPO0VBQ1AsUUFBUTtFQUNSLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFdBQVcsRUFBQTs7QUFHZjtFQUNJLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsZ0JBQWdCLEVBQUE7O0FBR3BCO0VBQ0ksT0FBTztFQUNQLFFBQVE7RUFDUixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQixlQUFlLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jb3RpemFjaW9uZXMvY290aXphY2lvbmVzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wcmVjaW97XG4gICAgY29sb3I6IHJlZDtcbiAgICBmb250LXdlaWdodDogODAwO1xufVxuXG4ubm9tYnJle1xuICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG59XG5cbi5idG4tYWNlcHRhcntcbiAgICAtLWJhY2tncm91bmQ6IHJnYigzMCwgMjE5LCAxNDApO1xuICAgIC0tY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICB3aWR0aDogNTBweDtcbn1cblxuLmJ0bi1kZWNsaW5hcntcbiAgICAtLWJhY2tncm91bmQ6cmdiKDIxOSwgNjEsIDYxKTtcbiAgICAtLWNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gICAgd2lkdGg6IDUwcHg7XG59XG5cbi5lc3BhY2lve1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIGhlaWdodDogMTAwdmg7XG4gICAgd2lkdGg6IDQwdmg7XG59XG5cbi50aXR1bG97XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbn1cblxuLmV4cGxpY2FjaW9ue1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIG1hcmdpbi1ib3R0b206IDBweDtcbiAgICBmb250LXNpemU6IDEwcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/cotizaciones/cotizaciones.page.ts":
/*!***************************************************!*\
  !*** ./src/app/cotizaciones/cotizaciones.page.ts ***!
  \***************************************************/
/*! exports provided: CotizacionesPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CotizacionesPage", function() { return CotizacionesPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_5__);






var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var CotizacionesPage = /** @class */ (function () {
    function CotizacionesPage(location, provider, nav) {
        this.location = location;
        this.provider = provider;
        this.nav = nav;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_5__["initialize"]('guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2', 'qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8');
    }
    CotizacionesPage.prototype.ngOnInit = function () {
        this.getQuotes();
    };
    CotizacionesPage.prototype.navigateBack = function () {
        this.location.back();
    };
    //funcion para remover cotizacion
    CotizacionesPage.prototype.removeCotizaciones = function (selectedQuotes) {
        var _this = this;
        var index;
        index = this.quots.indexOf(selectedQuotes);
        console.log(index);
        console.log('enter');
        parse__WEBPACK_IMPORTED_MODULE_5__["Cloud"].run('deleteQuotes', { quotesID: selectedQuotes.objectId }).then(function (result) {
            _this.quots.splice(index, 1);
            console.log(result);
        }, function (error) {
            console.log(error);
        });
    };
    CotizacionesPage.prototype.getQuotes = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_5__["Cloud"].run('getUsersQuotes', { serviceID: this.provider.serviceId }).then(function (result) {
            if (result.length === 0) {
                console.log('No requests have been made');
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    result[i] = result[i].toJSON();
                }
                _this.quots = result;
            }
        }), function (error) {
            console.log(error);
        };
    };
    CotizacionesPage.prototype.acceptQuote = function () {
        this.nav.navigateRoot('/serviceoptions');
    };
    CotizacionesPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-cotizaciones',
            template: __webpack_require__(/*! ./cotizaciones.page.html */ "./src/app/cotizaciones/cotizaciones.page.html"),
            styles: [__webpack_require__(/*! ./cotizaciones.page.scss */ "./src/app/cotizaciones/cotizaciones.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__["GruproviderService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"]])
    ], CotizacionesPage);
    return CotizacionesPage;
}());



/***/ })

}]);
//# sourceMappingURL=cotizaciones-cotizaciones-module.js.map
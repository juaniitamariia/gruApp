(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["escoger-pago-escoger-pago-module"],{

/***/ "./src/app/escoger-pago/escoger-pago.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/escoger-pago/escoger-pago.module.ts ***!
  \*****************************************************/
/*! exports provided: EscogerPagoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EscogerPagoPageModule", function() { return EscogerPagoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _escoger_pago_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./escoger-pago.page */ "./src/app/escoger-pago/escoger-pago.page.ts");







var routes = [
    {
        path: '',
        component: _escoger_pago_page__WEBPACK_IMPORTED_MODULE_6__["EscogerPagoPage"]
    }
];
var EscogerPagoPageModule = /** @class */ (function () {
    function EscogerPagoPageModule() {
    }
    EscogerPagoPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_escoger_pago_page__WEBPACK_IMPORTED_MODULE_6__["EscogerPagoPage"]]
        })
    ], EscogerPagoPageModule);
    return EscogerPagoPageModule;
}());



/***/ }),

/***/ "./src/app/escoger-pago/escoger-pago.page.html":
/*!*****************************************************!*\
  !*** ./src/app/escoger-pago/escoger-pago.page.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=header>\n\n  <ion-button class=\"btnBack\" (click)=navBack()>\n    <ion-icon name=\"ios-arrow-back\"></ion-icon>\n  </ion-button>\n\n<img class=logo src= \"assets/logowhite.png\">\n<h1 class=titlePayment padding>Método de pago</h1>\n<p class=\"choose-payment\" style=\"font-weight:300;\">Escoger tarjeta</p>\n\n</div>\n\n<div class=cardBox>\n\n\n    <ion-card class=size>\n        <ion-card-title class= titlePay>\n            Tarjetas de Crédito\n          </ion-card-title>\n    <ion-content class=\"lista\">\n        <ion-list>\n            <ion-item *ngFor=\"let card of cards\">\n                <button class=\"boton\" (click)=getCard(card)>\n                <ion-card class=\"card\">\n                    <ion-grid class=\"grid\">\n                        <ion-row style=\"height: 50px;\">\n                            <ion-col size=\"10\">\n                              <ion-img class=\"tarjeta-icon\" src=\"assets/visa.png\" *ngIf=\"card.brand == 'Visa'\"></ion-img>\n                              <ion-img class=\"tarjeta-icon\" src=\"assets/mastercard.png\" *ngIf=\"card.brand == 'MasterCard'\"></ion-img>\n                              <ion-img class=\"tarjeta-icon\" src=\"assets/american-express.png\" *ngIf=\"card.brand == 'American Express'\"></ion-img>\n                                <h5 style=\"margin: 0px;\">xxxx-xxxx-xxxx-{{card.last4}}</h5>\n                            </ion-col>\n                        </ion-row>\n                    </ion-grid>\n                </ion-card>\n              </button>\n            </ion-item>\n        </ion-list>\n    </ion-content>\n    </ion-card>\n</div>\n\n<div class= btnText>\n  <ion-button (click)='makePayment()'>SOLICITAR SERVICIO</ion-button>\n</div>\n\n<ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n    <ion-fab-button (click)='navigateAdd()' style=\"border-radius: 50%; border: solid white 2px;\">\n      <ion-icon name=\"md-add\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n\n"

/***/ }),

/***/ "./src/app/escoger-pago/escoger-pago.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/escoger-pago/escoger-pago.page.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  background-color: #6561AB;\n  height: 250px; }\n\n.logo {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 45px;\n  height: 5%; }\n\n.choose-payment {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  font-size: 20px;\n  color: white;\n  margin-top: 55px;\n  padding: 30px;\n  text-align: center; }\n\n.titlePayment {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  font-size: 30px;\n  color: white;\n  margin-top: 8px;\n  padding: 30px;\n  text-align: center; }\n\n.cardBox {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 190px;\n  top: 90px; }\n\n.size {\n  height: 250px !important; }\n\n.btnText {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 10px;\n  width: 300px;\n  text-align: center;\n  padding: 0;\n  margin-top: 25px; }\n\n.btnElemen {\n  background-color: transparent !important; }\n\n.titlePay {\n  text-align: left;\n  position: absolute;\n  font-size: 12px;\n  padding: 20px; }\n\n.textBtn {\n  size: 10%; }\n\n.menuTabs {\n  border: none; }\n\n.btnBack {\n  margin-top: 50px;\n  --box-shadow:none !important; }\n\n.grid {\n  --ion-grid-width: 70px\n; }\n\n.img {\n  height: 33px;\n  margin: 0px;\n  padding: 0px; }\n\n.col {\n  padding: 0px; }\n\n.item {\n  font-size: 15px; }\n\n.tarjeta-icon {\n  height: 30px;\n  width: 30px; }\n\n.grid {\n  width: 80vw; }\n\n.lista {\n  height: 200px !important; }\n\n.card {\n  box-shadow: none;\n  margin-top: 5px;\n  margin-bottom: 5px; }\n\n.boton {\n  background: transparent; }\n\n.active, .boton:hover {\n  background-color: #f7f3f3;\n  color: white; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvZXNjb2dlci1wYWdvL2VzY29nZXItcGFnby5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx5QkFBeUI7RUFDekIsYUFBYSxFQUFBOztBQUdoQjtFQUNHLGtCQUFrQjtFQUNqQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLFVBQVUsRUFBQTs7QUFHZjtFQUNJLGtCQUFrQjtFQUNsQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGtCQUFrQixFQUFBOztBQUd0QjtFQUNJLGtCQUFrQjtFQUNsQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLFlBQVk7RUFDWixlQUFlO0VBQ2YsYUFBYTtFQUNiLGtCQUFrQixFQUFBOztBQUd0QjtFQUVJLGtCQUFrQjtFQUNsQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLFNBQVMsRUFBQTs7QUFLYjtFQUVJLHdCQUF3QixFQUFBOztBQUc1QjtFQUVJLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixVQUFVO0VBQ1YsZ0JBQWdCLEVBQUE7O0FBSXBCO0VBRUksd0NBQXdDLEVBQUE7O0FBSTVDO0VBRUEsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsYUFBYSxFQUFBOztBQUliO0VBQ0ksU0FBUyxFQUFBOztBQUdiO0VBQ0ksWUFBWSxFQUFBOztBQUloQjtFQUNJLGdCQUFnQjtFQUNoQiw0QkFBYSxFQUFBOztBQUdqQjtFQUNJO0FBQWlCLEVBQUE7O0FBR3JCO0VBQ0ksWUFBWTtFQUNaLFdBQVc7RUFDWCxZQUFXLEVBQUE7O0FBR2Y7RUFDSSxZQUFZLEVBQUE7O0FBR2hCO0VBQ0ksZUFBZSxFQUFBOztBQUduQjtFQUNJLFlBQVk7RUFDWixXQUFXLEVBQUE7O0FBR2Y7RUFDSSxXQUFXLEVBQUE7O0FBR2Y7RUFDSSx3QkFBd0IsRUFBQTs7QUFHNUI7RUFDSSxnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGtCQUFrQixFQUFBOztBQUd0QjtFQUNJLHVCQUF1QixFQUFBOztBQUczQjtFQUNJLHlCQUFvQztFQUNwQyxZQUFZLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9lc2NvZ2VyLXBhZ28vZXNjb2dlci1wYWdvLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXJ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzY1NjFBQjtcbiAgICBoZWlnaHQ6IDI1MHB4O1xuIH1cblxuIC5sb2dve1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgbGVmdDowO1xuICAgICByaWdodDowO1xuICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICBtYXJnaW4tdG9wOiA0NXB4O1xuICAgICBoZWlnaHQ6IDUlO1xufVxuXG4uY2hvb3NlLXBheW1lbnR7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG1hcmdpbi10b3A6IDU1cHg7XG4gICAgcGFkZGluZzogMzBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi50aXRsZVBheW1lbnR7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBmb250LXNpemU6IDMwcHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICBwYWRkaW5nOiAzMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmNhcmRCb3h7XG4gICAgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBtYXJnaW4tdG9wOiAxOTBweDtcbiAgICB0b3A6IDkwcHg7XG4gICAgIFxuICAgIFxufVxuXG4uc2l6ZXtcbiAgICBcbiAgICBoZWlnaHQ6IDI1MHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5idG5UZXh0e1xuICAgIC8vcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICAgIHdpZHRoOiAzMDBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW4tdG9wOiAyNXB4O1xuICAgIFxufVxuXG4uYnRuRWxlbWVue1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICBcbn1cblxuLnRpdGxlUGF5e1xuXG50ZXh0LWFsaWduOiBsZWZ0O1xucG9zaXRpb246IGFic29sdXRlO1xuZm9udC1zaXplOiAxMnB4O1xucGFkZGluZzogMjBweDtcblxufVxuXG4udGV4dEJ0bntcbiAgICBzaXplOiAxMCU7XG59XG5cbi5tZW51VGFic3tcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgXG59XG5cbi5idG5CYWNre1xuICAgIG1hcmdpbi10b3A6IDUwcHg7XG4gICAgLS1ib3gtc2hhZG93Om5vbmUgIWltcG9ydGFudDtcbn1cblxuLmdyaWR7XG4gICAgLS1pb24tZ3JpZC13aWR0aDogNzBweFxufVxuXG4uaW1ne1xuICAgIGhlaWdodDogMzNweDtcbiAgICBtYXJnaW46IDBweDtcbiAgICBwYWRkaW5nOjBweDtcbn1cblxuLmNvbHtcbiAgICBwYWRkaW5nOiAwcHg7XG59XG5cbi5pdGVte1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbn1cblxuLnRhcmpldGEtaWNvbntcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgd2lkdGg6IDMwcHg7XG59XG5cbi5ncmlke1xuICAgIHdpZHRoOiA4MHZ3O1xufVxuXG4ubGlzdGF7XG4gICAgaGVpZ2h0OiAyMDBweCAhaW1wb3J0YW50O1xufVxuXG4uY2FyZHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgIG1hcmdpbi10b3A6IDVweDtcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5ib3RvbntcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cblxuLmFjdGl2ZSwgLmJvdG9uOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ3LCAyNDMsIDI0Myk7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9Il19 */"

/***/ }),

/***/ "./src/app/escoger-pago/escoger-pago.page.ts":
/*!***************************************************!*\
  !*** ./src/app/escoger-pago/escoger-pago.page.ts ***!
  \***************************************************/
/*! exports provided: EscogerPagoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EscogerPagoPage", function() { return EscogerPagoPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_6__);








var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var EscogerPagoPage = /** @class */ (function () {
    function EscogerPagoPage(nav, nativePageTransitions, location, alerCtrl, provider) {
        this.nav = nav;
        this.nativePageTransitions = nativePageTransitions;
        this.location = location;
        this.alerCtrl = alerCtrl;
        this.provider = provider;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_6__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    }
    EscogerPagoPage.prototype.ngOnInit = function () {
        this.getCards();
    };
    EscogerPagoPage.prototype.transition = function () {
        var options = {
            direction: 'left',
            duration: 200,
            slowdownfactor: -1,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 100,
        };
        console.log('transition');
        this.nativePageTransitions.slide(options);
    };
    EscogerPagoPage.prototype.navigateFoward = function () {
        this.transition();
        this.nav.navigateRoot('/sidemenu');
    };
    EscogerPagoPage.prototype.navigateAdd = function () {
        this.transition();
        this.nav.navigateRoot('/agregar-tarjetas');
    };
    EscogerPagoPage.prototype.navBack = function () {
        var options = {
            direction: 'right',
            duration: 200,
            slowdownfactor: -1,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 100,
        };
        console.log('transition');
        this.nativePageTransitions.slide(options);
        this.location.back();
    };
    EscogerPagoPage.prototype.Listo = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alerCtrl.create({
                            header: '¡Pedido Exitoso!',
                            message: 'Tu pedido ya se envió a los proveedores más cercanos. En unos minutos tendrá una confirmación de un proveedor.',
                            buttons: [
                                {
                                    text: '¡Listo!',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        _this.transition();
                                        _this.nav.navigateRoot('/sidemenu');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        this.provider.whatUser = true; //el usuario NO es nuevo, ya tiene un servicio pedido
                        console.log(this.provider.whatUser);
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EscogerPagoPage.prototype.getCards = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_6__["Cloud"].run('getStripeUserCards').then(function (result) {
            console.log(result);
            _this.cards = result;
        }, function (error) {
            _this.errorAlert(error);
            console.log(error);
        });
    };
    EscogerPagoPage.prototype.errorAlert = function (error) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alerCtrl.create({
                            header: 'Error',
                            message: error,
                            buttons: [{
                                    text: 'OK',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    EscogerPagoPage.prototype.getCard = function (selectedCard) {
        this.provider.card = selectedCard;
        console.log(selectedCard);
        console.log(this.provider.selectedCar);
    };
    EscogerPagoPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-escoger-pago',
            template: __webpack_require__(/*! ./escoger-pago.page.html */ "./src/app/escoger-pago/escoger-pago.page.html"),
            styles: [__webpack_require__(/*! ./escoger-pago.page.scss */ "./src/app/escoger-pago/escoger-pago.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"], _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_3__["NativePageTransitions"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_5__["GruproviderService"]])
    ], EscogerPagoPage);
    return EscogerPagoPage;
}());



/***/ })

}]);
//# sourceMappingURL=escoger-pago-escoger-pago-module.js.map
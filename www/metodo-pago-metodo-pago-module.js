(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["metodo-pago-metodo-pago-module"],{

/***/ "./src/app/metodo-pago/metodo-pago.module.ts":
/*!***************************************************!*\
  !*** ./src/app/metodo-pago/metodo-pago.module.ts ***!
  \***************************************************/
/*! exports provided: MetodoPagoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetodoPagoPageModule", function() { return MetodoPagoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _metodo_pago_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./metodo-pago.page */ "./src/app/metodo-pago/metodo-pago.page.ts");







var routes = [
    {
        path: '',
        component: _metodo_pago_page__WEBPACK_IMPORTED_MODULE_6__["MetodoPagoPage"]
    }
];
var MetodoPagoPageModule = /** @class */ (function () {
    function MetodoPagoPageModule() {
    }
    MetodoPagoPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_metodo_pago_page__WEBPACK_IMPORTED_MODULE_6__["MetodoPagoPage"]]
        })
    ], MetodoPagoPageModule);
    return MetodoPagoPageModule;
}());



/***/ }),

/***/ "./src/app/metodo-pago/metodo-pago.page.html":
/*!***************************************************!*\
  !*** ./src/app/metodo-pago/metodo-pago.page.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=header>\n\n  <ion-button class=\"btnBack\" (click)=navBack()>\n    <ion-icon name=\"ios-arrow-back\"></ion-icon>\n  </ion-button>\n\n<img class=logo src= \"assets/logowhite.png\">\n<h6 class=titlePayment padding>Método de pago</h6>\n\n</div>\n\n<ion-card class=size>\n    <ion-card-title class= titlePay>\n        Tarjetas de Crédito\n      </ion-card-title>\n<ion-content class=\"lista\">\n    <ion-list>\n        <ion-item *ngFor=\"let card of cards\">\n            <ion-card class=\"card\">\n                <ion-grid class=\"grid\">\n                    <ion-row>\n                        <ion-col size=\"10\">\n                          <ion-img class=\"tarjeta-icon\" src=\"assets/visa.png\" *ngIf=\"card.brand == 'Visa'\"></ion-img>\n                          <ion-img class=\"tarjeta-icon\" src=\"assets/mastercard.png\" *ngIf=\"card.brand == 'MasterCard'\"></ion-img>\n                          <ion-img class=\"tarjeta-icon\" src=\"assets/american-express.png\" *ngIf=\"card.brand == 'American Express'\"></ion-img>\n                            <h5 style=\"margin: 0px;\">xxxx-xxxx-xxxx-{{card.last4}}</h5>\n                        </ion-col>\n                        <ion-col size=\"2\">\n                            <ion-button (click)=\"deleteCard(card)\" fill=transparent>\n                                <ion-icon name=\"trash\"></ion-icon>\n                            </ion-button>\n                      </ion-col>\n                    </ion-row>\n                </ion-grid>\n            </ion-card>\n        </ion-item>\n    </ion-list>\n</ion-content>\n</ion-card>\n\n<div class= btnText>\n<ion-button class=textBtn fill=clear (click)=navMenu()>-En otro momento-</ion-button>\n<ion-button margin=20px border-radius=\"2px\" expand=\"block\" (click)= navAgregar()>\n  <ion-icon name=\"add-circle\" padding=\"20px\"></ion-icon>Agregar Tarjeta</ion-button>\n</div>\n"

/***/ }),

/***/ "./src/app/metodo-pago/metodo-pago.page.scss":
/*!***************************************************!*\
  !*** ./src/app/metodo-pago/metodo-pago.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  background-color: #6561AB;\n  height: 150px; }\n\n.logo {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 45px;\n  height: 7%; }\n\n.titlePayment {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  font-size: 20px;\n  color: white;\n  padding: 10px;\n  text-align: center; }\n\n.cardBox {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 20px; }\n\n.size {\n  height: 40% !important; }\n\n.btnText {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 25px;\n  width: 300px;\n  text-align: center;\n  padding: 0; }\n\n.btnElemen {\n  background-color: transparent !important; }\n\n.titlePay {\n  margin: 20px;\n  text-align: left;\n  font-size: 12px;\n  font-weight: 300; }\n\n.textBtn {\n  size: 10%; }\n\n.menuTabs {\n  border: none; }\n\n.btnBack {\n  --background: transparent;\n  --background-activated: transparent;\n  margin-top: 40px !important;\n  --box-shadow: none; }\n\n.card {\n  box-shadow: none;\n  margin-top: 5px; }\n\n.tarjeta-icon {\n  height: 30px;\n  width: 30px; }\n\n.grid {\n  width: 80vw; }\n\n.lista {\n  height: 200px !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvbWV0b2RvLXBhZ28vbWV0b2RvLXBhZ28ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kseUJBQXlCO0VBQ3pCLGFBQWEsRUFBQTs7QUFHaEI7RUFDRyxrQkFBa0I7RUFDakIsT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixVQUFVLEVBQUE7O0FBR2Y7RUFDSSxrQkFBa0I7RUFDbEIsT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGVBQWU7RUFDZixZQUFZO0VBQ1osYUFBYTtFQUNiLGtCQUFrQixFQUFBOztBQUd0QjtFQUVJLGtCQUFrQjtFQUNsQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZ0JBQWdCLEVBQUE7O0FBS3BCO0VBRUksc0JBQXNCLEVBQUE7O0FBSzFCO0VBRUksT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLG1CQUFtQjtFQUNuQixZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLFVBQVUsRUFBQTs7QUFLZDtFQUVJLHdDQUF3QyxFQUFBOztBQUk1QztFQUNBLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGdCQUFnQixFQUFBOztBQUloQjtFQUNJLFNBQVMsRUFBQTs7QUFHYjtFQUNJLFlBQVksRUFBQTs7QUFJaEI7RUFDSSx5QkFBYTtFQUNiLG1DQUF1QjtFQUN0QiwyQkFBMkI7RUFDM0Isa0JBQWEsRUFBQTs7QUFHbEI7RUFDSSxnQkFBZ0I7RUFDaEIsZUFBZSxFQUFBOztBQUduQjtFQUNJLFlBQVk7RUFDWixXQUFXLEVBQUE7O0FBR2Y7RUFDSSxXQUFXLEVBQUE7O0FBR2Y7RUFDSSx3QkFBd0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL21ldG9kby1wYWdvL21ldG9kby1wYWdvLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXJ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzY1NjFBQjtcbiAgICBoZWlnaHQ6IDE1MHB4O1xuIH1cblxuIC5sb2dve1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgbGVmdDowO1xuICAgICByaWdodDowO1xuICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICBtYXJnaW4tdG9wOiA0NXB4O1xuICAgICBoZWlnaHQ6IDclO1xufVxuXG4udGl0bGVQYXltZW50e1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OjA7XG4gICAgcmlnaHQ6MDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmNhcmRCb3h7XG4gICAgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgICBcbiAgICBcbn1cblxuLnNpemV7XG4gICAgXG4gICAgaGVpZ2h0OiA0MCUgIWltcG9ydGFudDtcbiAgICBcblxufVxuXG4uYnRuVGV4dHtcbiAgICBcbiAgICBsZWZ0OjA7XG4gICAgcmlnaHQ6MDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgbWFyZ2luLWJvdHRvbTogMjVweDtcbiAgICB3aWR0aDogMzAwcHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgXG4gICAgXG59XG5cbi5idG5FbGVtZW57XG5cbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgIFxufVxuXG4udGl0bGVQYXl7XG5tYXJnaW46IDIwcHg7XG50ZXh0LWFsaWduOiBsZWZ0O1xuZm9udC1zaXplOiAxMnB4O1xuZm9udC13ZWlnaHQ6IDMwMDtcblxufVxuXG4udGV4dEJ0bntcbiAgICBzaXplOiAxMCU7XG59XG5cbi5tZW51VGFic3tcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgXG59XG5cbi5idG5CYWNre1xuICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdHJhbnNwYXJlbnQ7XG4gICAgIG1hcmdpbi10b3A6IDQwcHggIWltcG9ydGFudDtcbiAgICAgLS1ib3gtc2hhZG93OiBub25lO1xufVxuXG4uY2FyZHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgIG1hcmdpbi10b3A6IDVweDtcbn1cblxuLnRhcmpldGEtaWNvbntcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgd2lkdGg6IDMwcHg7XG59XG5cbi5ncmlke1xuICAgIHdpZHRoOiA4MHZ3O1xufVxuXG4ubGlzdGF7XG4gICAgaGVpZ2h0OiAyMDBweCAhaW1wb3J0YW50O1xufVxuXG5cbiJdfQ== */"

/***/ }),

/***/ "./src/app/metodo-pago/metodo-pago.page.ts":
/*!*************************************************!*\
  !*** ./src/app/metodo-pago/metodo-pago.page.ts ***!
  \*************************************************/
/*! exports provided: MetodoPagoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MetodoPagoPage", function() { return MetodoPagoPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_native_stripe_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/stripe/ngx */ "./node_modules/@ionic-native/stripe/ngx/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_6__);








var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var MetodoPagoPage = /** @class */ (function () {
    function MetodoPagoPage(nav, nativePageTransitions, location, stripe, alert) {
        this.nav = nav;
        this.nativePageTransitions = nativePageTransitions;
        this.location = location;
        this.stripe = stripe;
        this.alert = alert;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_6__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    }
    MetodoPagoPage.prototype.ngOnInit = function () {
        this.getCards();
    };
    MetodoPagoPage.prototype.navBack = function () {
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
    MetodoPagoPage.prototype.navAgregar = function () {
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
        this.nav.navigateRoot("/agregar-tarjetas");
    };
    MetodoPagoPage.prototype.navMenu = function () {
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
        this.nav.navigateRoot("/sidemenu");
    };
    MetodoPagoPage.prototype.getCards = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_6__["Cloud"].run('getStripeUserCards').then(function (result) {
            console.log(result);
            _this.cards = result;
        }, function (error) {
            _this.errorAlert(error);
            console.log(error);
        });
    };
    MetodoPagoPage.prototype.errorAlert = function (error) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alert.create({
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
    MetodoPagoPage.prototype.deleteCard = function (selectedCard) {
        var _this = this;
        var index;
        index = this.cards.indexOf(selectedCard);
        console.log(index);
        console.log('enter');
        parse__WEBPACK_IMPORTED_MODULE_6__["Cloud"].run('stripeDeleteCard', { cardId: selectedCard.id, customerId: selectedCard.customer }).then(function (result) {
            _this.cards.splice(index, 1);
            console.log(result);
        }, function (error) {
            console.log(error);
        });
    };
    MetodoPagoPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-metodo-pago',
            template: __webpack_require__(/*! ./metodo-pago.page.html */ "./src/app/metodo-pago/metodo-pago.page.html"),
            styles: [__webpack_require__(/*! ./metodo-pago.page.scss */ "./src/app/metodo-pago/metodo-pago.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"], _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_3__["NativePageTransitions"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"],
            _ionic_native_stripe_ngx__WEBPACK_IMPORTED_MODULE_5__["Stripe"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
    ], MetodoPagoPage);
    return MetodoPagoPage;
}());



/***/ })

}]);
//# sourceMappingURL=metodo-pago-metodo-pago-module.js.map
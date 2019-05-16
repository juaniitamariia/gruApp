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

module.exports = ".header {\n  background-color: #6561AB;\n  height: 150px; }\n\n.logo {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 45px;\n  height: 7%; }\n\n.titlePayment {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  font-size: 20px;\n  color: white;\n  padding: 10px;\n  text-align: center; }\n\n.cardBox {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 20px; }\n\n.size {\n  height: 40% !important; }\n\n.btnText {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 25px;\n  width: 300px;\n  text-align: center;\n  padding: 0; }\n\n.btnElemen {\n  background-color: transparent !important; }\n\n.titlePay {\n  margin: 20px;\n  text-align: left;\n  font-size: 12px;\n  font-weight: 300; }\n\n.textBtn {\n  size: 10%; }\n\n.menuTabs {\n  border: none; }\n\n.btnBack {\n  --background: transparent;\n  --background-activated: transparent;\n  margin-top: 40px !important;\n  --box-shadow: none; }\n\n.card {\n  box-shadow: none;\n  margin-top: 5px; }\n\n.tarjeta-icon {\n  height: 30px;\n  width: 30px; }\n\n.grid {\n  width: 80vw; }\n\n.lista {\n  height: 200px !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0Rlc2t0b3AvR3J1QXBwIGNvcHkgMi9zcmMvYXBwL21ldG9kby1wYWdvL21ldG9kby1wYWdvLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHlCQUF5QjtFQUN6QixhQUFhLEVBQUE7O0FBR2hCO0VBQ0csa0JBQWtCO0VBQ2pCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsVUFBVSxFQUFBOztBQUdmO0VBQ0ksa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsWUFBWTtFQUNaLGFBQWE7RUFDYixrQkFBa0IsRUFBQTs7QUFHdEI7RUFFSSxrQkFBa0I7RUFDbEIsT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGdCQUFnQixFQUFBOztBQUtwQjtFQUVJLHNCQUFzQixFQUFBOztBQUsxQjtFQUVJLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixVQUFVLEVBQUE7O0FBS2Q7RUFFSSx3Q0FBd0MsRUFBQTs7QUFJNUM7RUFDQSxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixnQkFBZ0IsRUFBQTs7QUFJaEI7RUFDSSxTQUFTLEVBQUE7O0FBR2I7RUFDSSxZQUFZLEVBQUE7O0FBSWhCO0VBQ0kseUJBQWE7RUFDYixtQ0FBdUI7RUFDdEIsMkJBQTJCO0VBQzNCLGtCQUFhLEVBQUE7O0FBR2xCO0VBQ0ksZ0JBQWdCO0VBQ2hCLGVBQWUsRUFBQTs7QUFHbkI7RUFDSSxZQUFZO0VBQ1osV0FBVyxFQUFBOztBQUdmO0VBQ0ksV0FBVyxFQUFBOztBQUdmO0VBQ0ksd0JBQXdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9tZXRvZG8tcGFnby9tZXRvZG8tcGFnby5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVye1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM2NTYxQUI7XG4gICAgaGVpZ2h0OiAxNTBweDtcbiB9XG5cbiAubG9nb3tcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgIGxlZnQ6MDtcbiAgICAgcmlnaHQ6MDtcbiAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICAgbWFyZ2luLXRvcDogNDVweDtcbiAgICAgaGVpZ2h0OiA3JTtcbn1cblxuLnRpdGxlUGF5bWVudHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDowO1xuICAgIHJpZ2h0OjA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5jYXJkQm94e1xuICAgIFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OjA7XG4gICAgcmlnaHQ6MDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICAgXG4gICAgXG59XG5cbi5zaXple1xuICAgIFxuICAgIGhlaWdodDogNDAlICFpbXBvcnRhbnQ7XG4gICAgXG5cbn1cblxuLmJ0blRleHR7XG4gICAgXG4gICAgbGVmdDowO1xuICAgIHJpZ2h0OjA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIG1hcmdpbi1ib3R0b206IDI1cHg7XG4gICAgd2lkdGg6IDMwMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAwO1xuICAgIFxuICAgIFxufVxuXG4uYnRuRWxlbWVue1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICBcbn1cblxuLnRpdGxlUGF5e1xubWFyZ2luOiAyMHB4O1xudGV4dC1hbGlnbjogbGVmdDtcbmZvbnQtc2l6ZTogMTJweDtcbmZvbnQtd2VpZ2h0OiAzMDA7XG5cbn1cblxuLnRleHRCdG57XG4gICAgc2l6ZTogMTAlO1xufVxuXG4ubWVudVRhYnN7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIFxufVxuXG4uYnRuQmFja3tcbiAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IHRyYW5zcGFyZW50O1xuICAgICBtYXJnaW4tdG9wOiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgIC0tYm94LXNoYWRvdzogbm9uZTtcbn1cblxuLmNhcmR7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbiAgICBtYXJnaW4tdG9wOiA1cHg7XG59XG5cbi50YXJqZXRhLWljb257XG4gICAgaGVpZ2h0OiAzMHB4O1xuICAgIHdpZHRoOiAzMHB4O1xufVxuXG4uZ3JpZHtcbiAgICB3aWR0aDogODB2dztcbn1cblxuLmxpc3Rhe1xuICAgIGhlaWdodDogMjAwcHggIWltcG9ydGFudDtcbn1cblxuXG4iXX0= */"

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
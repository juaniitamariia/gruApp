(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["agregar-tarjetas-agregar-tarjetas-module"],{

/***/ "./src/app/agregar-tarjetas/agregar-tarjetas.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/agregar-tarjetas/agregar-tarjetas.module.ts ***!
  \*************************************************************/
/*! exports provided: AgregarTarjetasPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarTarjetasPageModule", function() { return AgregarTarjetasPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _agregar_tarjetas_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./agregar-tarjetas.page */ "./src/app/agregar-tarjetas/agregar-tarjetas.page.ts");







var routes = [
    {
        path: '',
        component: _agregar_tarjetas_page__WEBPACK_IMPORTED_MODULE_6__["AgregarTarjetasPage"]
    }
];
var AgregarTarjetasPageModule = /** @class */ (function () {
    function AgregarTarjetasPageModule() {
    }
    AgregarTarjetasPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_agregar_tarjetas_page__WEBPACK_IMPORTED_MODULE_6__["AgregarTarjetasPage"]]
        })
    ], AgregarTarjetasPageModule);
    return AgregarTarjetasPageModule;
}());



/***/ }),

/***/ "./src/app/agregar-tarjetas/agregar-tarjetas.page.html":
/*!*************************************************************!*\
  !*** ./src/app/agregar-tarjetas/agregar-tarjetas.page.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n  <ion-toolbar style=\"background:transparent;\">\n    <ion-button (click)='back();' fill=clear style=\"color:black;\"><ion-icon name=md-close></ion-icon></ion-button>\n    <ion-title style=\"font-size: 13px; font-weight:300; text-align: center;\">AÑADIR TARJETA</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card class=add-towing-card>\n    <h5 class=label-input>Número de tarjeta</h5>\n    <ion-input [(ngModel)]=\"numTarjeta\" type=“text” class=name placeholder=\"xxxx xxxx xxxx xxxx\"></ion-input>\n \n    <h5 class=label-input>Mes de expiración </h5>\n    <ion-input [(ngModel)]=\"month\" type=“text” class=name placeholder=\"MM\" maxlength=\"2\"></ion-input>\n \n    <h5 class=label-input>Año de expiración </h5>\n    <ion-input [(ngModel)]=\"year\" type=“text” class=name placeholder=\"YYYY\" maxlength=\"4\"></ion-input>\n \n    <h5 class=label-input>CVV</h5>\n    <ion-input [(ngModel)]=\"cvv\" type=“text” class=name placeholder=\"xxx\"></ion-input>\n \n  </ion-card>\n\n </ion-content>\n\n <h6 class=center style=\"display: inline-flex; font-size: 13px; font-weight:300; color: rgb(170, 170, 170);\"><ion-icon  style=\"display: inline-flex; font-size: 13px; color: rgb(170, 170, 170);\" name=\"lock\"></ion-icon>Secure Payments</h6>\n\n<ion-button (click)=paymentMethod() class=\"addbutton\">AGREGAR</ion-button>\n"

/***/ }),

/***/ "./src/app/agregar-tarjetas/agregar-tarjetas.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/agregar-tarjetas/agregar-tarjetas.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".label-input {\n  margin-left: 5px;\n  font-weight: 300;\n  font-size: 12px;\n  color: #a3a3a3; }\n\n.add-towing-card {\n  box-shadow: none; }\n\n.name {\n  border-bottom: 1px solid #aaaaaa; }\n\n.addbutton {\n  width: auto;\n  height: 100px;\n  background: #6561AB;\n  margin: 0; }\n\n.text {\n  height: 80px; }\n\n.center {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvYWdyZWdhci10YXJqZXRhcy9hZ3JlZ2FyLXRhcmpldGFzLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGNBQXlCLEVBQUE7O0FBRzdCO0VBQ0ksZ0JBQWdCLEVBQUE7O0FBR3BCO0VBQ0MsZ0NBQTJDLEVBQUE7O0FBSTVDO0VBQ0ksV0FBVztFQUNYLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsU0FBUyxFQUFBOztBQUdiO0VBQ0ksWUFBWSxFQUFBOztBQUdoQjtFQUNJLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvYWdyZWdhci10YXJqZXRhcy9hZ3JlZ2FyLXRhcmpldGFzLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sYWJlbC1pbnB1dCB7XG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBjb2xvcjogcmdiKDE2MywgMTYzLCAxNjMpO1xuICAgfVxuXG4uYWRkLXRvd2luZy1jYXJkIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgfVxuXG4ubmFtZSB7XG4gYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYigxNzAsIDE3MCwgMTcwKTtcbiBcbn1cblxuLmFkZGJ1dHRvbntcbiAgICB3aWR0aDogYXV0bztcbiAgICBoZWlnaHQ6IDEwMHB4O1xuICAgIGJhY2tncm91bmQ6ICM2NTYxQUI7XG4gICAgbWFyZ2luOiAwOyBcbn1cblxuLnRleHR7XG4gICAgaGVpZ2h0OiA4MHB4O1xufVxuXG4uY2VudGVye1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/agregar-tarjetas/agregar-tarjetas.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/agregar-tarjetas/agregar-tarjetas.page.ts ***!
  \***********************************************************/
/*! exports provided: AgregarTarjetasPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AgregarTarjetasPage", function() { return AgregarTarjetasPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_native_stripe_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/stripe/ngx */ "./node_modules/@ionic-native/stripe/ngx/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_6__);








var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var AgregarTarjetasPage = /** @class */ (function () {
    function AgregarTarjetasPage(nav, nativePageTransitions, location, alertCtrl, stripe) {
        this.nav = nav;
        this.nativePageTransitions = nativePageTransitions;
        this.location = location;
        this.alertCtrl = alertCtrl;
        this.stripe = stripe;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_6__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    }
    AgregarTarjetasPage.prototype.ngOnInit = function () {
        //console.log(Parse.User.current().get('email'));
    };
    AgregarTarjetasPage.prototype.navigateBack = function () {
        var options = {
            direction: 'right',
            duration: 200,
            slowdownfactor: -1,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 100,
        };
        console.log('transition');
        this.location.back();
        this.nativePageTransitions.slide(options);
    };
    AgregarTarjetasPage.prototype.paymentMethod = function () {
        var _this = this;
        this.stripe.setPublishableKey('pk_test_boV42rnD9DvyVn4MwCIRM5n000I3LHrkcY');
        var card = {
            number: this.numTarjeta,
            expMonth: parseInt(this.month),
            expYear: parseInt(this.year),
            cvc: this.cvv
        };
        this.stripe.createCardToken(card)
            .then(function (token) {
            parse__WEBPACK_IMPORTED_MODULE_6__["Cloud"].run('createStripeUser', { cardToken: token.id, email: parse__WEBPACK_IMPORTED_MODULE_6__["User"].current().get('email')
            }).then(function (result) {
                _this.successAdd();
                _this.location.back();
            }, function (error) {
                _this.errorAlert(error);
                console.log(error);
            });
        })
            .catch(function (error) {
            _this.errorAlert(error);
            console.log(error);
        });
    };
    AgregarTarjetasPage.prototype.back = function () {
        this.location.back();
    };
    AgregarTarjetasPage.prototype.navigate = function () {
        this.location.back();
    };
    AgregarTarjetasPage.prototype.successAdd = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Listo',
                            message: '¡Su tarjeta ha sido grabada exitósamente!',
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
    AgregarTarjetasPage.prototype.errorAlert = function (error) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
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
    AgregarTarjetasPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-agregar-tarjetas',
            template: __webpack_require__(/*! ./agregar-tarjetas.page.html */ "./src/app/agregar-tarjetas/agregar-tarjetas.page.html"),
            styles: [__webpack_require__(/*! ./agregar-tarjetas.page.scss */ "./src/app/agregar-tarjetas/agregar-tarjetas.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"], _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_2__["NativePageTransitions"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"], _ionic_native_stripe_ngx__WEBPACK_IMPORTED_MODULE_5__["Stripe"]])
    ], AgregarTarjetasPage);
    return AgregarTarjetasPage;
}());



/***/ })

}]);
//# sourceMappingURL=agregar-tarjetas-agregar-tarjetas-module.js.map
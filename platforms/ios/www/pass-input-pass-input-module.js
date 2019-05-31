(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pass-input-pass-input-module"],{

/***/ "./src/app/pass-input/pass-input.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pass-input/pass-input.module.ts ***!
  \*************************************************/
/*! exports provided: PassInputPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PassInputPageModule", function() { return PassInputPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _pass_input_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pass-input.page */ "./src/app/pass-input/pass-input.page.ts");







var routes = [
    {
        path: '',
        component: _pass_input_page__WEBPACK_IMPORTED_MODULE_6__["PassInputPage"]
    }
];
var PassInputPageModule = /** @class */ (function () {
    function PassInputPageModule() {
    }
    PassInputPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_pass_input_page__WEBPACK_IMPORTED_MODULE_6__["PassInputPage"]]
        })
    ], PassInputPageModule);
    return PassInputPageModule;
}());



/***/ }),

/***/ "./src/app/pass-input/pass-input.page.html":
/*!*************************************************!*\
  !*** ./src/app/pass-input/pass-input.page.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=header>\n\n  <ion-button class=\"btnBack\" (click)=navigateBack()>\n    <ion-icon class=\"icon\" ios=\"ios-arrow-back\" md=\"ios-arrow-back\"></ion-icon>\n  </ion-button>\n\n    <img class=logo src= \"assets/logowhite.png\">\n    <h1 class=passTitle padding>Ingrese Contraseña</h1>\n  \n  </div>\n  \n  <div class=passInput>\n      <ion-input [(ngModel)]=\"password\" class=input type=\"password\" placeholder=\" Contraseña\"></ion-input><br>\n      <ion-input [(ngModel)]=\"verifiedPassword\" class=input type=\"password\" placeholder=\" Confirmar Contraseña\"></ion-input><br><br>\n    <ion-button expand=\"block\" (click)=\"confirmPass()\">Confirmar</ion-button>\n  </div>\n\n"

/***/ }),

/***/ "./src/app/pass-input/pass-input.page.scss":
/*!*************************************************!*\
  !*** ./src/app/pass-input/pass-input.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  background-color: #6561AB;\n  height: 230px; }\n\n.passInput {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 250px;\n  padding: 30px; }\n\n.logo {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 45px;\n  height: 7%; }\n\n.passTitle {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  font-size: 30px;\n  color: white;\n  margin-top: 60px;\n  padding: 30px;\n  text-align: center; }\n\n.btnBack {\n  margin-top: 40px !important;\n  --background: transparent;\n  --background-activated: transparent;\n  --box-shadow: none; }\n\n.input {\n  border-radius: 10px;\n  border: 1px solid #dadada;\n  --padding-start: 15px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvcGFzcy1pbnB1dC9wYXNzLWlucHV0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHlCQUF5QjtFQUN6QixhQUFhLEVBQUE7O0FBR2pCO0VBQ0ksa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsYUFBYSxFQUFBOztBQUlqQjtFQUNJLGtCQUFrQjtFQUNqQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLFVBQVUsRUFBQTs7QUFHZjtFQUNJLGtCQUFrQjtFQUNsQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGtCQUFrQixFQUFBOztBQUd0QjtFQUVJLDJCQUEyQjtFQUMzQix5QkFBYTtFQUNiLG1DQUF1QjtFQUN2QixrQkFBYSxFQUFBOztBQUdqQjtFQUNJLG1CQUFtQjtFQUNuQix5QkFBa0M7RUFDbEMscUJBQWdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9wYXNzLWlucHV0L3Bhc3MtaW5wdXQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlcntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjU2MUFCO1xuICAgIGhlaWdodDogMjMwcHg7XG4gfVxuXG4ucGFzc0lucHV0e1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OjA7XG4gICAgcmlnaHQ6MDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgbWFyZ2luLXRvcDogMjUwcHg7XG4gICAgcGFkZGluZzogMzBweDtcbiAgICBcbn1cblxuLmxvZ297XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICBsZWZ0OjA7XG4gICAgIHJpZ2h0OjA7XG4gICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgIG1hcmdpbi10b3A6IDQ1cHg7XG4gICAgIGhlaWdodDogNyU7XG59XG5cbi5wYXNzVGl0bGV7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBmb250LXNpemU6IDMwcHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG1hcmdpbi10b3A6IDYwcHg7XG4gICAgcGFkZGluZzogMzBweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5idG5CYWNre1xuICAgIFxuICAgIG1hcmdpbi10b3A6IDQwcHggIWltcG9ydGFudDtcbiAgICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IHRyYW5zcGFyZW50O1xuICAgIC0tYm94LXNoYWRvdzogbm9uZTtcbn1cblxuLmlucHV0e1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDIxOCwyMTgsMjE4KTtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDE1cHg7XG59XG5cblxuICAgXG4gICAiXX0= */"

/***/ }),

/***/ "./src/app/pass-input/pass-input.page.ts":
/*!***********************************************!*\
  !*** ./src/app/pass-input/pass-input.page.ts ***!
  \***********************************************/
/*! exports provided: PassInputPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PassInputPage", function() { return PassInputPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");







var PassInputPage = /** @class */ (function () {
    function PassInputPage(nativePageTransitions, nav, alert, provider, location) {
        this.nativePageTransitions = nativePageTransitions;
        this.nav = nav;
        this.alert = alert;
        this.provider = provider;
        this.location = location;
    }
    PassInputPage.prototype.ngOnInit = function () {
    };
    PassInputPage.prototype.navigate = function () {
        var options = {
            direction: 'left',
            duration: 200,
            slowdownfactor: -1,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 100,
        };
        console.log('transition');
        console.log("entrando al navigate");
        this.provider.sendCode(this.verifiedPassword);
        this.nativePageTransitions.slide(options);
        // this.nav.navigateRoot("/num-verification");
    };
    PassInputPage.prototype.navigateBack = function () {
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
    PassInputPage.prototype.confirmPass = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert_1;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.provider.password = this.password;
                        if (!(this.password == this.verifiedPassword && this.provider.signUserUp() == true)) return [3 /*break*/, 1];
                        //this.provider.signUserUp();
                        this.navigate();
                        return [3 /*break*/, 5];
                    case 1:
                        if (!(this.password != this.verifiedPassword)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.alert.create({
                                header: 'Error',
                                message: 'Las contraseñas no son iguales',
                                buttons: [{
                                        text: 'OK',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                        handler: function () {
                                            console.log('Confirm Cancel');
                                        }
                                    }]
                            })];
                    case 2:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        if (this.password == this.verifiedPassword && (this.provider.signUserUp() == false)) {
                            console.log("no se guardo la data");
                            this.presentAlert();
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PassInputPage.prototype.presentAlert = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alert.create({
                            header: 'Error',
                            message: 'Ya existe un usario con ese correo electronico',
                            buttons: [{
                                    text: 'OK',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                        _this.nav.navigateRoot('/registro');
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
    PassInputPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-pass-input',
            template: __webpack_require__(/*! ./pass-input.page.html */ "./src/app/pass-input/pass-input.page.html"),
            styles: [__webpack_require__(/*! ./pass-input.page.scss */ "./src/app/pass-input/pass-input.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_2__["NativePageTransitions"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _gruprovider_service__WEBPACK_IMPORTED_MODULE_4__["GruproviderService"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"]])
    ], PassInputPage);
    return PassInputPage;
}());



/***/ })

}]);
//# sourceMappingURL=pass-input-pass-input-module.js.map
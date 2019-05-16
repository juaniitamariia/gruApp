(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["escoger-carro-escoger-carro-module"],{

/***/ "./src/app/escoger-carro/escoger-carro.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/escoger-carro/escoger-carro.module.ts ***!
  \*******************************************************/
/*! exports provided: EscogerCarroPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EscogerCarroPageModule", function() { return EscogerCarroPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _escoger_carro_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./escoger-carro.page */ "./src/app/escoger-carro/escoger-carro.page.ts");







var routes = [
    {
        path: '',
        component: _escoger_carro_page__WEBPACK_IMPORTED_MODULE_6__["EscogerCarroPage"]
    }
];
var EscogerCarroPageModule = /** @class */ (function () {
    function EscogerCarroPageModule() {
    }
    EscogerCarroPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_escoger_carro_page__WEBPACK_IMPORTED_MODULE_6__["EscogerCarroPage"]]
        })
    ], EscogerCarroPageModule);
    return EscogerCarroPageModule;
}());



/***/ }),

/***/ "./src/app/escoger-carro/escoger-carro.page.html":
/*!*******************************************************!*\
  !*** ./src/app/escoger-carro/escoger-carro.page.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border style=\"border-bottom: solid rgb(196, 196, 196) 1px;\">\n  <ion-toolbar style=\"background:whitesmoke;\">\n    <ion-button (click)=navigateBack() fill=clear class=\"arrow-btn\" style=\"color:black;\"><ion-icon name=md-arrow-round-back></ion-icon></ion-button>\n    <ion-title class=\"choose-car-title\" style=\"font-weight:300;\">Escoger carro</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n<ion-list [(ngModel)]=\"carro\" lines=none > \n    <ion-item id=\"cars\" *ngFor=\"let car of cars\">\n        <ion-card class=\"card\">\n          <button class=\"boton\" (click)=navigate(car)>\n            <ion-grid>\n                <ion-row>\n                    <ion-col size=\"4\">\n                        <ion-img style=\"margin-top: 5px; height: 50px;\" src=\"assets/document.png\"></ion-img>\n                    </ion-col>\n                    <ion-col size=\"6\">\n                        <h4 style=\"text-align: left; margin: 0px;\">{{car.get('make')}}</h4>\n                        <h6 style=\"text-align: left; color: lightgray; font-size: 15px; margin: 0px;\">Tablilla: {{car.get('licensePlateNum')}}</h6>\n                        <h6 style=\"text-align: left; color: lightgray; font-size: 15px; margin: 0px;\">Año: {{car.get('year')}}</h6>\n                        <h6 style=\"text-align: left; color: lightgray; font-size: 15px; margin: 0px;\">Color: {{car.get('color')}}</h6>\n                    </ion-col>\n                    <!-- <ion-col size=\"4\">\n                        <ion-radio [value]=\"car\"></ion-radio>\n                   <input type=\"radio\" name=\"car\" value={{car.id}} style=\"margin: 17px; float: right;\">\n                    </ion-col> -->\n                </ion-row>\n            </ion-grid>\n          </button>\n        </ion-card>\n    </ion-item>\n</ion-list>\n\n\n   <!-- <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n      <ion-fab-button href=\"/addcar\" style=\"border-radius: 50%; border: solid white 2px;\">\n        <ion-icon name=\"md-add\"></ion-icon>\n      </ion-fab-button>\n    </ion-fab> -->\n  </ion-content>\n\n  <ion-button expand='block' (click)=add() class=add-car>Añadir Carro</ion-button>\n  <!-- <ion-button expand='block' (click)=navigate() class=select-button>Seleccionar</ion-button> -->\n\n\n"

/***/ }),

/***/ "./src/app/escoger-carro/escoger-carro.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/escoger-carro/escoger-carro.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".select-button {\n  margin: 20px; }\n\n.add-car {\n  margin: 20px;\n  margin-bottom: 20px; }\n\n.arrow-btn {\n  margin-top: 40px; }\n\n.choose-car-title {\n  margin-top: 20px; }\n\n.boton {\n  background: transparent; }\n\n.active, .boton:hover {\n  background-color: silver;\n  color: white; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0Rlc2t0b3AvR3J1QXBwIGNvcHkgMi9zcmMvYXBwL2VzY29nZXItY2Fycm8vZXNjb2dlci1jYXJyby5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDSSxZQUFZLEVBQUE7O0FBR2hCO0VBQ0ksWUFBWTtFQUNaLG1CQUFtQixFQUFBOztBQUd2QjtFQUNJLGdCQUFnQixFQUFBOztBQUdwQjtFQUNJLGdCQUFnQixFQUFBOztBQUdwQjtFQUNJLHVCQUF1QixFQUFBOztBQUczQjtFQUNJLHdCQUFvQztFQUNwQyxZQUFZLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9lc2NvZ2VyLWNhcnJvL2VzY29nZXItY2Fycm8ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG5cbi5zZWxlY3QtYnV0dG9ue1xuICAgIG1hcmdpbjogMjBweDtcbn1cblxuLmFkZC1jYXIge1xuICAgIG1hcmdpbjogMjBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uYXJyb3ctYnRuIHtcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xufVxuXG4uY2hvb3NlLWNhci10aXRsZSB7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbn1cblxuLmJvdG9ue1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG4uYWN0aXZlLCAuYm90b246aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxOTIsIDE5MiwgMTkyKTtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cblxuIl19 */"

/***/ }),

/***/ "./src/app/escoger-carro/escoger-carro.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/escoger-carro/escoger-carro.page.ts ***!
  \*****************************************************/
/*! exports provided: EscogerCarroPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EscogerCarroPage", function() { return EscogerCarroPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");







var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var EscogerCarroPage = /** @class */ (function () {
    function EscogerCarroPage(location, nav, provider, nativePageTransitions) {
        this.location = location;
        this.nav = nav;
        this.provider = provider;
        this.nativePageTransitions = nativePageTransitions;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_4__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    }
    EscogerCarroPage.prototype.ngOnInit = function () {
        this.getCars();
    };
    EscogerCarroPage.prototype.navigateBack = function () {
        this.transitionBack();
        this.location.back();
    };
    EscogerCarroPage.prototype.navigate = function (selectedcar) {
        if (this.provider.service == 'especial') {
            this.transition();
            this.nav.navigateRoot('/photo');
        }
        else {
            this.transition();
            this.provider.selectedCar = selectedcar;
            console.log(selectedcar);
            this.nav.navigateRoot('/pagar');
        }
    };
    EscogerCarroPage.prototype.add = function () {
        this.transition();
        this.nav.navigateRoot('/addcar');
    };
    EscogerCarroPage.prototype.getCars = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_4__["Cloud"].run('getCars', { userId: parse__WEBPACK_IMPORTED_MODULE_4__["User"].current().id }).then(function (result) {
            _this.cars = result;
        });
    };
    EscogerCarroPage.prototype.transition = function () {
        var options = {
            direction: 'left',
            duration: 200,
            slowdownfactor: -1,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 100,
        };
        this.nativePageTransitions.slide(options);
    };
    EscogerCarroPage.prototype.transitionBack = function () {
        var options = {
            direction: 'right',
            duration: 200,
            slowdownfactor: -1,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 100,
        };
        this.nativePageTransitions.slide(options);
    };
    EscogerCarroPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-escoger-carro',
            template: __webpack_require__(/*! ./escoger-carro.page.html */ "./src/app/escoger-carro/escoger-carro.page.html"),
            styles: [__webpack_require__(/*! ./escoger-carro.page.scss */ "./src/app/escoger-carro/escoger-carro.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_5__["GruproviderService"],
            _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_6__["NativePageTransitions"]])
    ], EscogerCarroPage);
    return EscogerCarroPage;
}());



/***/ })

}]);
//# sourceMappingURL=escoger-carro-escoger-carro-module.js.map
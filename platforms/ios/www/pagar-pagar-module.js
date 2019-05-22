(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pagar-pagar-module"],{

/***/ "./src/app/pagar/pagar.module.ts":
/*!***************************************!*\
  !*** ./src/app/pagar/pagar.module.ts ***!
  \***************************************/
/*! exports provided: PagarPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagarPageModule", function() { return PagarPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _pagar_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pagar.page */ "./src/app/pagar/pagar.page.ts");







var routes = [
    {
        path: '',
        component: _pagar_page__WEBPACK_IMPORTED_MODULE_6__["PagarPage"]
    }
];
var PagarPageModule = /** @class */ (function () {
    function PagarPageModule() {
    }
    PagarPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_pagar_page__WEBPACK_IMPORTED_MODULE_6__["PagarPage"]]
        })
    ], PagarPageModule);
    return PagarPageModule;
}());



/***/ }),

/***/ "./src/app/pagar/pagar.page.html":
/*!***************************************!*\
  !*** ./src/app/pagar/pagar.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n    <ion-toolbar style=\"--background:#6561AB;\">\n      <ion-button class=\"arrow-btn\" fill=clear style=\"color:white;\" (click)=\"navigateBack()\"><ion-icon name=md-arrow-round-back></ion-icon></ion-button>\n      <ion-title class=\"pay-title\" style=\"font-weight:300; color:white\">Resumen de Pago</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-card class=\"div\">\n    <ion-content class=\"content\">\n\n      <ion-grid>\n          <ion-row>\n              <ion-col>\n                  <h1 class=\"titulo\">Nombre: </h1>\n              </ion-col>\n              <ion-col >\n                  <h1 class=\"respuesta\" >{{currentUser}}</h1>\n              </ion-col>\n            </ion-row>\n        <!-- <ion-row>\n          <ion-col>\n              <h1 class=\"titulo\">Ubicación Actual: </h1>\n          </ion-col>\n          <ion-col>\n              <h1 class=\"respuesta\">Ciudad Jardin, Caguas</h1>\n          </ion-col>\n        </ion-row> -->\n        <!-- <ion-row> -->\n          <!-- <ion-col>\n              <h1 class=\"titulo\">Destino: </h1>\n          </ion-col>\n          <ion-col *ngIf=\"servicio == 'Goma' || servicio == 'llaves' || servicio == 'Bateria' || servicio == 'Gasolina'\">\n              <h1 class=\"respuesta\">Mi Ubicación Actual</h1>\n          </ion-col> -->\n          <!-- <ion-col *ngIf=\"servicio == 'grua'\">\n              <h1 class=\"respuesta\">otra ubicacion actual</h1>\n          </ion-col> -->\n          <!-- <ion-col *ngIf=\"servicio == 'especial'\">\n              <h1 class=\"respuesta\">otra ubicacion actual</h1>\n          </ion-col> -->\n        <!-- </ion-row> -->\n        <ion-row>\n          <ion-col>\n              <h1 class=\"titulo\">Servicio: </h1>\n          </ion-col>\n          <ion-col>\n              <h1 class=\"respuesta\">{{servicio}}</h1>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col *ngIf=\"servicio == 'Grua' || servicio == 'Servicio Especial'\">\n              <h1 class=\"titulo\">Millas:</h1>\n          </ion-col>\n          <ion-col *ngIf=\"servicio == 'Grua' || servicio == 'Servicio Especial'\">\n              <h1 class=\"respuesta\">${{totalCost}}.00</h1>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n              <h1 class=\"titulo\">Carro:</h1>\n          </ion-col>\n          <ion-col>\n              <h1 class=\"respuesta\">{{marcaCarro}}</h1>\n              <h1 class=\"respuesta\">{{modeloCarro}}</h1>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n              <h1 class=\"titulo\">Tablilla:</h1>\n          </ion-col>\n          <ion-col>\n              <h1 class=\"respuesta\">{{tablilla}}</h1>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n              <h1 style=\"font-weight: 300;\">TOTAL:</h1>\n          </ion-col>\n          <ion-col>\n              <h1 class=\"total\">${{total}}.00</h1>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-content>\n  </ion-card>\n\n  <ion-button (click)=\"navigate()\" fill=\"solid\"  class=\"boton\">\n    PROCEDER A PAGAR\n  </ion-button>\n  \n  \n"

/***/ }),

/***/ "./src/app/pagar/pagar.page.scss":
/*!***************************************!*\
  !*** ./src/app/pagar/pagar.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".div {\n  position: absolute;\n  height: 300px;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 150px;\n  width: 330px; }\n\n.respuesta {\n  font-size: 13px;\n  font-weight: 600;\n  margin: 0px; }\n\n.titulo {\n  font-size: 13px;\n  font-weight: 300;\n  margin: 0px; }\n\n.total {\n  color: #f84f4f; }\n\n.boton {\n  font-weight: 800;\n  color: white;\n  margin: 30px; }\n\n.arrow-btn {\n  margin-top: 40px; }\n\n.pay-title {\n  margin-top: 20px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvcGFnYXIvcGFnYXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLFlBQVksRUFBQTs7QUFHaEI7RUFDSSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLFdBQVcsRUFBQTs7QUFJZjtFQUNDLGVBQWU7RUFDZixnQkFBZ0I7RUFDaEIsV0FBVyxFQUFBOztBQUlaO0VBQ0ksY0FBdUIsRUFBQTs7QUFHM0I7RUFDSSxnQkFBZ0I7RUFDaEIsWUFBWTtFQUNaLFlBQVksRUFBQTs7QUFHaEI7RUFDSSxnQkFBZ0IsRUFBQTs7QUFHcEI7RUFDSSxnQkFBZ0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3BhZ2FyL3BhZ2FyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kaXZ7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGhlaWdodDogMzAwcHg7XG4gICAgbGVmdDowO1xuICAgIHJpZ2h0OjA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIG1hcmdpbi10b3A6IDE1MHB4O1xuICAgIHdpZHRoOiAzMzBweDtcbn1cblxuLnJlc3B1ZXN0YXtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBtYXJnaW46IDBweDtcblxufVxuXG4udGl0dWxve1xuIGZvbnQtc2l6ZTogMTNweDtcbiBmb250LXdlaWdodDogMzAwO1xuIG1hcmdpbjogMHB4O1xuXG59XG5cbi50b3RhbHtcbiAgICBjb2xvcjogcmdiKDI0OCwgNzksIDc5KTtcbn1cblxuLmJvdG9ue1xuICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG1hcmdpbjogMzBweDtcbn1cblxuLmFycm93LWJ0biB7XG4gICAgbWFyZ2luLXRvcDogNDBweDtcbn1cblxuLnBheS10aXRsZSB7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICAvL21hcmdpbi1ib3R0b206IDEwcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/pagar/pagar.page.ts":
/*!*************************************!*\
  !*** ./src/app/pagar/pagar.page.ts ***!
  \*************************************/
/*! exports provided: PagarPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagarPage", function() { return PagarPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../gruprovider.service */ "./src/app/gruprovider.service.ts");








var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var PagarPage = /** @class */ (function () {
    function PagarPage(location, nav, provider, nativePageTransitions, alerCtrl) {
        this.location = location;
        this.nav = nav;
        this.provider = provider;
        this.nativePageTransitions = nativePageTransitions;
        this.alerCtrl = alerCtrl;
        this.servicio = this.provider.service;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_5__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    }
    PagarPage.prototype.ngOnInit = function () {
        this.userInfo();
        console.log(this.provider.service);
        //this.totalCost = this.provider.distance * 3;
    };
    PagarPage.prototype.navigateBack = function () {
        this.transition();
        this.location.back();
    };
    PagarPage.prototype.transition = function () {
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
    };
    PagarPage.prototype.Listo = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert, options;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alerCtrl.create({
                            header: '¡Pedido Exitoso!',
                            message: 'Tu pedido ya se envió a los proveedores mas cercanos. En menos de 2 minutos tendrá una comfirmación de un proveedor.',
                            buttons: ['¡Listo!']
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        options = {
                            direction: 'left',
                            duration: 200,
                            slowdownfactor: -1,
                            slidePixels: 20,
                            iosdelay: 100,
                            androiddelay: 100,
                        };
                        console.log('transition');
                        this.nativePageTransitions.slide(options);
                        this.nav.navigateRoot("/serviceoptions"); //pedido exitoso lleva a pagina de rating del servicio
                        return [2 /*return*/];
                }
            });
        });
    };
    PagarPage.prototype.navigate = function () {
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
        this.nav.navigateRoot("/escoger-pago");
    };
    PagarPage.prototype.userInfo = function () {
        this.currentUser = parse__WEBPACK_IMPORTED_MODULE_5__["User"].current().get('name');
        this.marcaCarro = this.provider.selectedCar.get('make');
        this.modeloCarro = this.provider.selectedCar.get('model');
        this.tablilla = this.provider.selectedCar.get('licensePlateNum');
        console.log(this.currentUser);
        this.total = this.provider.price;
        console.log(this.provider.price);
        if (this.provider.service == 'Grua' || this.provider.service == 'Servicio Especial') {
            this.total = this.provider.total;
            this.totalCost = this.provider.distance * 3;
        }
    };
    PagarPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-pagar',
            template: __webpack_require__(/*! ./pagar.page.html */ "./src/app/pagar/pagar.page.html"),
            styles: [__webpack_require__(/*! ./pagar.page.scss */ "./src/app/pagar/pagar.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_6__["GruproviderService"],
            _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_4__["NativePageTransitions"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
    ], PagarPage);
    return PagarPage;
}());



/***/ })

}]);
//# sourceMappingURL=pagar-pagar-module.js.map
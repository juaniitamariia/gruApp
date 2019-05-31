(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["request-request-module"],{

/***/ "./src/app/request/request.module.ts":
/*!*******************************************!*\
  !*** ./src/app/request/request.module.ts ***!
  \*******************************************/
/*! exports provided: RequestPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestPageModule", function() { return RequestPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _request_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./request.page */ "./src/app/request/request.page.ts");







var routes = [
    {
        path: '',
        component: _request_page__WEBPACK_IMPORTED_MODULE_6__["RequestPage"]
    }
];
var RequestPageModule = /** @class */ (function () {
    function RequestPageModule() {
    }
    RequestPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_request_page__WEBPACK_IMPORTED_MODULE_6__["RequestPage"]]
        })
    ], RequestPageModule);
    return RequestPageModule;
}());



/***/ }),

/***/ "./src/app/request/request.page.html":
/*!*******************************************!*\
  !*** ./src/app/request/request.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n  <ion-button class=\"btnBack\" (click)=navigateBack()>\n    <ion-icon name=\"ios-arrow-back\"></ion-icon>\n  </ion-button>\n\n  <img class='logo' src=\"assets/logowhite.png\">\n  <div class='header'>\n    <h3 padding style=\"font-size: 30px; color: white; font-weight: 300; margin-top: 20px;\">Solicitudes</h3>\n  </div>\n</ion-header>\n\n<ion-content>\n\n  <ion-list lines=none>\n    <ion-card *ngFor=\"let request of requests\" style=\"padding: 0;\">\n      <ion-item id=\"requests\">\n        <button class=\"boton\" expand=\"full\">\n          <ion-grid>\n\n\n            <ion-row>\n\n              <!-- FIRST COLUMN STARTS HERE -->\n              <ion-col size=\"6\">\n                <h6 class=\"left\" style=\"margin: 0px; color: darkgray\">Servicio:\n                  <span style=\"color: black\"> {{request.service}}</span></h6>\n\n                <!--<h6 style=\"color: lightgray; font-size: 15px; margin: 0px;\">{{car.get('licensePlateNum')}}</h6> -->\n                <!-- <h6 style=\"color: lightgray; font-size: 15px; margin: 0px;\">{{car.get('color')}}</h6> -->\n\n                <h6 class=\"left\" style=\"color: darkgray; font-size: 12px; margin: 0px;\">{{request.dateString}}</h6>\n              </ion-col>\n              <!-- FIRST COLUMN ENDS HERE -->\n\n              <!-- SECOND COLUMN STARTS HERE -->\n              <ion-col size=\"6\">\n                <p class=\"right\" style=\"color: darkgray; font-size: 15px; margin: 0px;\">Precio:\n                  <span style=\"color: rgb(54, 180, 54)\">${{request.price}}.00</span> </p>\n\n                <p class=\"right\" style=\"color: darkgray; font-size: 15px; margin: 0px;\">Carro:\n                  <span style=\"color: black\">{{request.clientCar.make}} {{request.clientCar.model}} </span></p>\n              </ion-col>\n              <!-- SECOND COLUMN ENDS HERE -->\n\n              <span *ngIf=\"request.service == 'Servicio Especial'\">\n                  <ion-button (click)=\"goTo(request.objectId, request)\" class=\"btn-cotizaciones\">VER COTIZACIONES</ion-button>\n              </span>\n\n              <span *ngIf=\"request.service != 'Servicio Especial'\">\n                  <ion-button (click)=\"seeDriver(request.objectId, request)\">CONFIRMAR</ion-button>\n              </span>\n\n            </ion-row>\n\n\n          </ion-grid>\n        </button>\n      </ion-item>\n    </ion-card>\n  </ion-list>\n</ion-content> "

/***/ }),

/***/ "./src/app/request/request.page.scss":
/*!*******************************************!*\
  !*** ./src/app/request/request.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  background: #6561AB;\n  box-shadow: none !important; }\n\n.logo {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 45px;\n  height: 15%;\n  box-shadow: none !important; }\n\n.btnBack {\n  z-index: 1000;\n  margin-top: 40px !important;\n  --box-shadow: none; }\n\n.boton {\n  background: transparent;\n  text-align: left;\n  width: 100vw; }\n\n.right {\n  text-align: right; }\n\n.left {\n  text-align: left; }\n\n.btn-aceptar {\n  --background: rgb(30, 219, 140);\n  --color: white;\n  font-size: 15px;\n  width: 50px; }\n\n.btn-cotizaciones {\n  --background: rgb(78, 172, 78); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvcmVxdWVzdC9yZXF1ZXN0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE4Q0E7RUFDRSxtQkFBbUI7RUFDbkIsMkJBQTJCLEVBQUE7O0FBRzdCO0VBQ0Usa0JBQWtCO0VBQ2xCLE9BQU87RUFDUCxRQUFRO0VBQ1IsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLDJCQUEyQixFQUFBOztBQUc3QjtFQUVFLGFBQWE7RUFDYiwyQkFBMkI7RUFDM0Isa0JBQWEsRUFBQTs7QUFHZjtFQUNFLHVCQUF1QjtFQUN2QixnQkFBZ0I7RUFDaEIsWUFBWSxFQUFBOztBQUdkO0VBQ0UsaUJBQWlCLEVBQUE7O0FBSW5CO0VBQ0UsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsK0JBQWE7RUFDYixjQUFRO0VBQ1IsZUFBZTtFQUNmLFdBQVcsRUFBQTs7QUFHYjtFQUNFLDhCQUFhLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9yZXF1ZXN0L3JlcXVlc3QucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gLnByZWNpb3tcbi8vICAgICBjb2xvcjogcmVkO1xuLy8gICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4vLyB9XG5cbi8vIC5ub21icmV7XG4vLyAgICAgZm9udC13ZWlnaHQ6IDgwMDtcbi8vIH1cblxuLy8gLmJ0bi1hY2VwdGFye1xuLy8gICAgIC0tYmFja2dyb3VuZDogcmdiKDMwLCAyMTksIDE0MCk7XG4vLyAgICAgLS1jb2xvcjogd2hpdGU7XG4vLyAgICAgZm9udC1zaXplOiAxNXB4O1xuLy8gICAgIHdpZHRoOiA1MHB4O1xuLy8gfVxuXG4vLyAuYnRuLWRlY2xpbmFye1xuLy8gICAgIC0tYmFja2dyb3VuZDpyZ2IoMjE5LCA2MSwgNjEpO1xuLy8gICAgIC0tY29sb3I6IHdoaXRlO1xuLy8gICAgIGZvbnQtc2l6ZTogMTVweDtcbi8vICAgICB3aWR0aDogNTBweDtcbi8vIH1cblxuLy8gLmVzcGFjaW97XG4vLyAgICAgbGVmdDogMDtcbi8vICAgICByaWdodDogMDtcbi8vICAgICBtYXJnaW4tbGVmdDogYXV0bztcbi8vICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4vLyAgICAgaGVpZ2h0OiAxMDB2aDtcbi8vIH1cblxuLy8gLnRpdHVsb3tcbi8vICAgICBmb250LXNpemU6IDEycHg7XG4vLyAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbi8vICAgICBtYXJnaW4tdG9wOiAyMHB4O1xuLy8gfVxuXG4vLyAuZXhwbGljYWNpb257XG4vLyAgICAgbGVmdDogMDtcbi8vICAgICByaWdodDogMDtcbi8vICAgICBtYXJnaW4tbGVmdDogYXV0bztcbi8vICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4vLyAgICAgbWFyZ2luLWJvdHRvbTogMHB4O1xuLy8gICAgIGZvbnQtc2l6ZTogMTBweDtcbi8vIH1cblxuLmhlYWRlciB7XG4gIGJhY2tncm91bmQ6ICM2NTYxQUI7XG4gIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cblxuLmxvZ28ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tdG9wOiA0NXB4O1xuICBoZWlnaHQ6IDE1JTtcbiAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuXG4uYnRuQmFjayB7XG5cbiAgei1pbmRleDogMTAwMDtcbiAgbWFyZ2luLXRvcDogNDBweCAhaW1wb3J0YW50O1xuICAtLWJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi5ib3RvbiB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB3aWR0aDogMTAwdnc7XG59XG5cbi5yaWdodCB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuXG59XG5cbi5sZWZ0IHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLmJ0bi1hY2VwdGFyIHtcbiAgLS1iYWNrZ3JvdW5kOiByZ2IoMzAsIDIxOSwgMTQwKTtcbiAgLS1jb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgd2lkdGg6IDUwcHg7XG59XG5cbi5idG4tY290aXphY2lvbmVze1xuICAtLWJhY2tncm91bmQ6IHJnYig3OCwgMTcyLCA3OCk7XG59Il19 */"

/***/ }),

/***/ "./src/app/request/request.page.ts":
/*!*****************************************!*\
  !*** ./src/app/request/request.page.ts ***!
  \*****************************************/
/*! exports provided: RequestPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestPage", function() { return RequestPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_5__);






var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var RequestPage = /** @class */ (function () {
    function RequestPage(location, control, provider) {
        this.location = location;
        this.control = control;
        this.provider = provider;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_5__["initialize"]('guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2', 'qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8');
    }
    RequestPage.prototype.ngOnInit = function () {
        this.getRequests();
    };
    RequestPage.prototype.navigateBack = function () {
        this.location.back();
    };
    RequestPage.prototype.getRequests = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_5__["Cloud"].run('getUsersRequests', { userId: parse__WEBPACK_IMPORTED_MODULE_5__["User"].current().id }).then(function (result) {
            if (result.length === 0) {
                console.log('No requests have been made');
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    result[i] = result[i].toJSON();
                }
                _this.requests = result;
                _this.provider.requests = result;
                _this.provider.requestQuantity = result.length; //devuelve la cantidad total de items en el array
                _this.service = _this.requests.service;
                console.log(_this.provider.requestQuantity);
                _this.provider.serviceId = _this.requests.objectid; //guarda el id del request                                              
            }
            // tslint:disable-next-line:no-unused-expression
        }), function (error) {
            console.log(error);
        };
    };
    RequestPage.prototype.seeDriver = function (objectId, request) {
        console.log(this.requests);
        this.provider.serviceId = objectId;
        this.provider.selectedRequest = request;
        this.control.navigateForward("/serviceoptions");
    };
    RequestPage.prototype.goTo = function (objectId, request) {
        this.provider.serviceId = objectId;
        this.provider.selectedRequest = request;
        this.control.navigateRoot('/cotizaciones');
    };
    RequestPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-request',
            template: __webpack_require__(/*! ./request.page.html */ "./src/app/request/request.page.html"),
            styles: [__webpack_require__(/*! ./request.page.scss */ "./src/app/request/request.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_4__["GruproviderService"]])
    ], RequestPage);
    return RequestPage;
}());



/***/ })

}]);
//# sourceMappingURL=request-request-module.js.map
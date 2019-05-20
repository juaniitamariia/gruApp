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

module.exports = "<ion-header no-border>\n  <ion-toolbar style=\"--background:#6561AB;\">\n    <ion-button class=\"arrow-btn\" fill=clear style=\"color:white;\" (click)=\"navigateBack()\"><ion-icon name=md-arrow-round-back></ion-icon></ion-button>\n    <ion-title class=\"pay-title\" style=\"font-weight:300; color:white\">Solicitudes</ion-title>\n  </ion-toolbar>\n</ion-header>\n<h6 class=\"explicacion\">\n  *COTIZACIONES DE GRUEROS QUE PUEDEN ATENDERTE*\n</h6>\n<div class=\"espacio\">\n  <ion-card>\n    <ion-grid>\n      <ion-row>\n        <ion-col size=\"4\">\n            <h6 class=\"titulo\">GRUERO:</h6> \n        </ion-col>\n        <ion-col size=\"5\">\n            <h6 class=\"nombre\">Carlos Aponte</h6> \n        </ion-col>\n        <ion-col size=\"3\">\n          <ion-button class=\"btn-aceptar\">\n              <ion-icon name=\"md-checkmark-circle\"></ion-icon>\n          </ion-button>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n          <ion-col size=\"4\">\n              <h6 class=\"titulo\">PRECIO:</h6> \n          </ion-col>\n          <ion-col size=\"5\">\n              <h6 class=\"precio\">$250.00</h6> \n          </ion-col>\n          <ion-col size=\"3\">\n              <ion-button class=\"btn-declinar\">\n                  <ion-icon name=\"md-close-circle\"></ion-icon>\n              </ion-button>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n  </ion-card>\n\n  <ion-card>\n      <ion-grid>\n        <ion-row>\n          <ion-col size=\"4\">\n              <h6 class=\"titulo\">GRUERO:</h6> \n          </ion-col>\n          <ion-col size=\"5\">\n              <h6 class=\"nombre\">Carlos Aponte</h6> \n          </ion-col>\n          <ion-col size=\"3\">\n            <ion-button class=\"btn-aceptar\">\n                <ion-icon name=\"md-checkmark-circle\"></ion-icon>\n            </ion-button>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col size=\"4\">\n                <h6 class=\"titulo\">PRECIO:</h6> \n            </ion-col>\n            <ion-col size=\"5\">\n                <h6 class=\"precio\">$250.00</h6> \n            </ion-col>\n            <ion-col size=\"3\">\n                <ion-button class=\"btn-declinar\">\n                    <ion-icon name=\"md-close-circle\"></ion-icon>\n                </ion-button>\n              </ion-col>\n          </ion-row>\n      </ion-grid>\n    </ion-card>\n</div>"

/***/ }),

/***/ "./src/app/request/request.page.scss":
/*!*******************************************!*\
  !*** ./src/app/request/request.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".precio {\n  color: red;\n  font-weight: 800; }\n\n.nombre {\n  font-weight: 800; }\n\n.btn-aceptar {\n  --background: rgb(30, 219, 140);\n  --color: white;\n  font-size: 15px;\n  width: 50px; }\n\n.btn-declinar {\n  --background:rgb(219, 61, 61);\n  --color: white;\n  font-size: 15px;\n  width: 50px; }\n\n.espacio {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  height: 100vh; }\n\n.titulo {\n  font-size: 12px;\n  margin-bottom: 20px;\n  margin-top: 20px; }\n\n.explicacion {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 0px;\n  font-size: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvcmVxdWVzdC9yZXF1ZXN0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFVBQVU7RUFDVixnQkFBZ0IsRUFBQTs7QUFHcEI7RUFDSSxnQkFBZ0IsRUFBQTs7QUFHcEI7RUFDSSwrQkFBYTtFQUNiLGNBQVE7RUFDUixlQUFlO0VBQ2YsV0FBVyxFQUFBOztBQUdmO0VBQ0ksNkJBQWE7RUFDYixjQUFRO0VBQ1IsZUFBZTtFQUNmLFdBQVcsRUFBQTs7QUFHZjtFQUNJLE9BQU87RUFDUCxRQUFRO0VBQ1IsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixhQUFhLEVBQUE7O0FBR2pCO0VBQ0ksZUFBZTtFQUNmLG1CQUFtQjtFQUNuQixnQkFBZ0IsRUFBQTs7QUFHcEI7RUFDSSxPQUFPO0VBQ1AsUUFBUTtFQUNSLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLGVBQWUsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3JlcXVlc3QvcmVxdWVzdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIucHJlY2lve1xuICAgIGNvbG9yOiByZWQ7XG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcbn1cblxuLm5vbWJyZXtcbiAgICBmb250LXdlaWdodDogODAwO1xufVxuXG4uYnRuLWFjZXB0YXJ7XG4gICAgLS1iYWNrZ3JvdW5kOiByZ2IoMzAsIDIxOSwgMTQwKTtcbiAgICAtLWNvbG9yOiB3aGl0ZTtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gICAgd2lkdGg6IDUwcHg7XG59XG5cbi5idG4tZGVjbGluYXJ7XG4gICAgLS1iYWNrZ3JvdW5kOnJnYigyMTksIDYxLCA2MSk7XG4gICAgLS1jb2xvcjogd2hpdGU7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIHdpZHRoOiA1MHB4O1xufVxuXG4uZXNwYWNpb3tcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBoZWlnaHQ6IDEwMHZoO1xufVxuXG4udGl0dWxve1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICAgIG1hcmdpbi10b3A6IDIwcHg7XG59XG5cbi5leHBsaWNhY2lvbntcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBtYXJnaW4tYm90dG9tOiAwcHg7XG4gICAgZm9udC1zaXplOiAxMHB4O1xufSJdfQ== */"

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



var RequestPage = /** @class */ (function () {
    function RequestPage(location) {
        this.location = location;
    }
    RequestPage.prototype.ngOnInit = function () {
    };
    RequestPage.prototype.navigateBack = function () {
        this.location.back();
    };
    RequestPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-request',
            template: __webpack_require__(/*! ./request.page.html */ "./src/app/request/request.page.html"),
            styles: [__webpack_require__(/*! ./request.page.scss */ "./src/app/request/request.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], RequestPage);
    return RequestPage;
}());



/***/ })

}]);
//# sourceMappingURL=request-request-module.js.map
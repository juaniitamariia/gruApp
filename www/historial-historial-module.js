(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["historial-historial-module"],{

/***/ "./src/app/historial/historial.module.ts":
/*!***********************************************!*\
  !*** ./src/app/historial/historial.module.ts ***!
  \***********************************************/
/*! exports provided: HistorialPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistorialPageModule", function() { return HistorialPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _historial_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./historial.page */ "./src/app/historial/historial.page.ts");







var routes = [
    {
        path: '',
        component: _historial_page__WEBPACK_IMPORTED_MODULE_6__["HistorialPage"]
    }
];
var HistorialPageModule = /** @class */ (function () {
    function HistorialPageModule() {
    }
    HistorialPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_historial_page__WEBPACK_IMPORTED_MODULE_6__["HistorialPage"]]
        })
    ], HistorialPageModule);
    return HistorialPageModule;
}());



/***/ }),

/***/ "./src/app/historial/historial.page.html":
/*!***********************************************!*\
  !*** ./src/app/historial/historial.page.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n  <ion-button class=\"btnBack\" href=\"/sidemenu\">\n    <ion-icon name=\"ios-arrow-back\"></ion-icon>\n  </ion-button>\n\n  <img class='logo' src=\"assets/logowhite.png\">\n  <div class='header'>\n    <h1 padding style=\"font-size: 40px; color: white; font-weight: 300; margin-top: 20px;\">Historial</h1>\n  </div>\n</ion-header>\n<ion-content>\n\n  <ion-list lines=none>\n    <ion-card *ngFor=\"let request of requests\" style=\"padding: 0;\">\n      <ion-item id=\"requests\">\n        <button class=\"boton\" expand=\"full\">\n          <ion-grid>\n            <ion-row>\n\n              <!-- FIRST COLUMN STARTS HERE -->\n              <ion-col size=\"6\" >\n                <h6 class=\"left\" style=\"margin: 0px; color: darkgray\">Servicio: <span style=\"color: black\">{{request.service}}</span></h6>\n\n                <!--<h6 style=\"color: lightgray; font-size: 15px; margin: 0px;\">{{car.get('licensePlateNum')}}</h6> -->\n                <!-- <h6 style=\"color: lightgray; font-size: 15px; margin: 0px;\">{{car.get('color')}}</h6> -->\n\n                <h6 class=\"left\" style=\"color: darkgray; font-size: 12px; margin: 0px;\">{{request.dateString}}</h6>\n              </ion-col>\n              <!-- FIRST COLUMN ENDS HERE -->\n\n              <!-- SECOND COLUMN STARTS HERE -->\n              <ion-col size=\"6\">\n                <p class=\"right\" style=\"color: darkgray; font-size: 15px; margin: 0px;\">Precio: <span style=\"color: rgb(54, 180, 54)\">${{request.price}}.00</span> </p>\n\n                <p class=\"right\" style=\"color: darkgray; font-size: 15px; margin: 0px;\">Carro: <span style=\"color: black\">{{request.clientCar.make}} {{request.clientCar.model}} </span></p>\n              </ion-col>\n              <!-- SECOND COLUMN ENDS HERE -->\n            </ion-row>\n\n          </ion-grid>\n        </button>\n      </ion-item>\n    </ion-card>\n  </ion-list>\n"

/***/ }),

/***/ "./src/app/historial/historial.page.scss":
/*!***********************************************!*\
  !*** ./src/app/historial/historial.page.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  background: #6561AB;\n  box-shadow: none !important; }\n\n.logo {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 45px;\n  height: 15%;\n  box-shadow: none !important; }\n\n.btnBack {\n  z-index: 1000;\n  margin-top: 40px !important;\n  --box-shadow: none; }\n\n.boton {\n  background: transparent;\n  text-align: left;\n  width: 100vw; }\n\n.right {\n  text-align: right; }\n\n.left {\n  text-align: left; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvaGlzdG9yaWFsL2hpc3RvcmlhbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBa0I7RUFDbEIsMkJBQTJCLEVBQUE7O0FBRy9CO0VBQ0ssa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsV0FBVztFQUNYLDJCQUEyQixFQUFBOztBQUdoQztFQUVJLGFBQVk7RUFDWiwyQkFBMkI7RUFDM0Isa0JBQWEsRUFBQTs7QUFHakI7RUFDRSx1QkFBdUI7RUFDdkIsZ0JBQWdCO0VBQ2hCLFlBQVksRUFBQTs7QUFHZDtFQUNFLGlCQUFpQixFQUFBOztBQUduQjtFQUNFLGdCQUFnQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvaGlzdG9yaWFsL2hpc3RvcmlhbC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVye1xuICAgIGJhY2tncm91bmQ6IzY1NjFBQjtcbiAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG5cbi5sb2dve1xuICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgIGxlZnQ6MDtcbiAgICAgcmlnaHQ6MDtcbiAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICAgbWFyZ2luLXRvcDogNDVweDtcbiAgICAgaGVpZ2h0OiAxNSU7XG4gICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cblxuLmJ0bkJhY2t7XG4gICAgXG4gICAgei1pbmRleDoxMDAwO1xuICAgIG1hcmdpbi10b3A6IDQwcHggIWltcG9ydGFudDtcbiAgICAtLWJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi5ib3RvbntcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHdpZHRoOiAxMDB2dztcbn1cblxuLnJpZ2h0IHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG5cbn1cbi5sZWZ0IHtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/historial/historial.page.ts":
/*!*********************************************!*\
  !*** ./src/app/historial/historial.page.ts ***!
  \*********************************************/
/*! exports provided: HistorialPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistorialPage", function() { return HistorialPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _popover_popover_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../popover/popover.component */ "./src/app/popover/popover.component.ts");





var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var HistorialPage = /** @class */ (function () {
    function HistorialPage(alertCtrl, popover, popoverController) {
        this.alertCtrl = alertCtrl;
        this.popover = popover;
        this.popoverController = popoverController;
        this.historial = false;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_2__["initialize"]('guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2', 'qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8');
    }
    HistorialPage.prototype.ngOnInit = function () {
        this.getRequests();
    };
    HistorialPage.prototype.getRequests = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_2__["Cloud"].run('getUsersRequests', { userId: parse__WEBPACK_IMPORTED_MODULE_2__["User"].current().id }).then(function (result) {
            if (result.length === 0) {
                console.log('No requests have been made');
            }
            else {
                for (var i = 0; i < result.length; i++) {
                    result[i] = result[i].toJSON();
                }
                _this.requests = result;
                // console.log(this.requests);
                // console.log(this.requests.destination.latitude, this.requests.destination.longitude); // destination                                                       
            }
            // tslint:disable-next-line:no-unused-expression
        }), function (error) {
            console.log(error);
        };
    };
    HistorialPage.prototype.info = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.popover.service = 'historial';
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Recibo',
                                message: '',
                                buttons: [{
                                        text: 'OK',
                                        role: 'cancel',
                                        cssClass: 'secondary',
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
    HistorialPage.prototype.presentInfo = function (selectedRequest) {
        this.popover.service = 'historial';
        this.presentPopover();
    };
    HistorialPage.prototype.presentPopover = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var popover;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: _popover_popover_component__WEBPACK_IMPORTED_MODULE_4__["PopoverComponent"],
                            // event: event,
                            translucent: false,
                            backdropDismiss: false
                        })];
                    case 1:
                        popover = _a.sent();
                        console.log('pop working');
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    HistorialPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-historial',
            template: __webpack_require__(/*! ./historial.page.html */ "./src/app/historial/historial.page.html"),
            styles: [__webpack_require__(/*! ./historial.page.scss */ "./src/app/historial/historial.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"], _popover_popover_component__WEBPACK_IMPORTED_MODULE_4__["PopoverComponent"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"]])
    ], HistorialPage);
    return HistorialPage;
}());



/***/ })

}]);
//# sourceMappingURL=historial-historial-module.js.map
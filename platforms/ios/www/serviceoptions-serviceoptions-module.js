(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["serviceoptions-serviceoptions-module"],{

/***/ "./src/app/serviceoptions/serviceoptions.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/serviceoptions/serviceoptions.module.ts ***!
  \*********************************************************/
/*! exports provided: ServiceoptionsPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceoptionsPageModule", function() { return ServiceoptionsPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _serviceoptions_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./serviceoptions.page */ "./src/app/serviceoptions/serviceoptions.page.ts");







var routes = [
    {
        path: '',
        component: _serviceoptions_page__WEBPACK_IMPORTED_MODULE_6__["ServiceoptionsPage"]
    }
];
var ServiceoptionsPageModule = /** @class */ (function () {
    function ServiceoptionsPageModule() {
    }
    ServiceoptionsPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_serviceoptions_page__WEBPACK_IMPORTED_MODULE_6__["ServiceoptionsPage"]]
        })
    ], ServiceoptionsPageModule);
    return ServiceoptionsPageModule;
}());



/***/ }),

/***/ "./src/app/serviceoptions/serviceoptions.page.html":
/*!*********************************************************!*\
  !*** ./src/app/serviceoptions/serviceoptions.page.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "  <!-- Menu de Botones-->\n  <ion-card class=mainMenu>\n    <div *ngIf=\"service == 'bateria'\" class=center>\n      <ion-img style='margin: auto; margin-top: 20px; width: 15%;' src= \"assets/bateria.svg\"></ion-img> \n    </div>\n\n    <div class=center>\n        <ion-img *ngIf=\"service == 'grua'\" style='margin: auto; margin-top: 20px; width: 30%;' src= \"assets/grua.svg\"></ion-img> \n    </div>\n\n      <div class=center>\n          <ion-img *ngIf=\"service == 'gasolina'\" style='margin: auto; margin-top: 20px; width: 15%;' src= \"assets/gasolina.svg\"></ion-img> \n      </div>\n\n      <div class=center>\n          <ion-img *ngIf=\"service == 'especial'\" style='margin: auto; margin-top: 20px; width: 30%;' src= \"assets/choqueicon.svg\"></ion-img> \n      </div>\n\n      <div class=center>\n          <ion-img *ngIf=\"service == 'goma'\" style='margin: auto; margin-top: 20px; width: 30%;' src= \"assets/gomavacia.svg\"></ion-img> \n      </div>\n\n      <div class=center>\n          <ion-img *ngIf=\"service == 'llaves'\" style='margin: auto; margin-top: 20px; width: 15%;' src= \"assets/llaves.svg\"></ion-img> \n      </div>\n\n    <div>\n      <ion-button margin  style='font-size: 15px;' expand=block>Cambiar la ubicación</ion-button>\n      <ion-button margin  href=\"/rating\"  [disabled]=\"disabled\" style=\"font-size: 15px;\" expand=block>Servicio culminado</ion-button>\n      <!-- <ion-button margin  (click)='presentAlertPrompt()' style=\"font-size: 15px;\" expand=block>El servicio no fue brindado</ion-button> -->\n      <ion-button margin  (click)='Cancel()' style=\"--background: rgb(255, 75, 75); font-size: 15px;\" expand=block>Cancelar</ion-button>\n    </div>\n  </ion-card>\n\n\n  <!-- Map view -->\n  <ion-header>\n \n    <meta charset='utf-8' />\n    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />\n    <div  id='map4' style='width: 100%; height: 100vh;'>  \n      </div>\n\n    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>\n    <link href='https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />\n\n    <style>\n            body { margin:0; padding:0; }\n            #map { position:absolute; top:0; bottom:0; width:100%; }\n      </style>\n    \n</ion-header>\n\n<ion-content>   \n\n\n</ion-content>\n\n\n\n\n\n\n"

/***/ }),

/***/ "./src/app/serviceoptions/serviceoptions.page.scss":
/*!*********************************************************!*\
  !*** ./src/app/serviceoptions/serviceoptions.page.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".my-custom-menu {\n  --width: 285px;\n  z-index: 1000; }\n\n.boton {\n  margin-left: 20px;\n  width: 50px;\n  height: 50px;\n  z-index: 100;\n  border-radius: 50%;\n  background-color: #6561ab;\n  box-shadow: 50%;\n  margin-top: 40px; }\n\n.menuBtn {\n  height: 30px;\n  width: 30px;\n  color: white; }\n\n.menuColor {\n  color: white; }\n\n.menuBar {\n  height: 250px;\n  --background: #6561ab; }\n\n.mainMenu {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 450px;\n  height: 260px;\n  width: 330px;\n  background-color: white;\n  z-index: 100; }\n\ncenter {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto; }\n\n.greenBtn {\n  color: green !important; }\n\n.profilePic {\n  margin-top: 60px;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto; }\n\n.imagen-carro {\n  width: 60px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvc2VydmljZW9wdGlvbnMvc2VydmljZW9wdGlvbnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBUTtFQUNSLGFBQWEsRUFBQTs7QUFHZjtFQUNFLGlCQUFpQjtFQUNqQixXQUFVO0VBQ1YsWUFBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIseUJBQXlCO0VBQ3pCLGVBQWU7RUFDZixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLFlBQVksRUFBQTs7QUFHZDtFQUNFLFlBQVksRUFBQTs7QUFHZDtFQUNFLGFBQWE7RUFDYixxQkFBYSxFQUFBOztBQUdmO0VBQ0Usa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLFlBQVk7RUFDWix1QkFBdUI7RUFDdkIsWUFBWSxFQUFBOztBQUdkO0VBQ0Usa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLHVCQUF1QixFQUFBOztBQUd6QjtFQUNFLGdCQUFnQjtFQUNoQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQTs7QUFHcEI7RUFDQyxXQUFXLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9zZXJ2aWNlb3B0aW9ucy9zZXJ2aWNlb3B0aW9ucy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIubXktY3VzdG9tLW1lbnUge1xuICAgIC0td2lkdGg6IDI4NXB4O1xuICAgIHotaW5kZXg6IDEwMDA7XG4gIH1cblxuICAuYm90b257XG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gICAgd2lkdGg6NTBweDtcbiAgICBoZWlnaHQ6NTBweDtcbiAgICB6LWluZGV4OiAxMDA7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM2NTYxYWI7XG4gICAgYm94LXNoYWRvdzogNTAlO1xuICAgIG1hcmdpbi10b3A6IDQwcHg7XG4gIH1cblxuICAubWVudUJ0bntcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgd2lkdGg6IDMwcHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG5cbiAgLm1lbnVDb2xvcntcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cblxuICAubWVudUJhcntcbiAgICBoZWlnaHQ6IDI1MHB4O1xuICAgIC0tYmFja2dyb3VuZDogIzY1NjFhYjtcbiAgfVxuXG4gIC5tYWluTWVudXtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDowO1xuICAgIHJpZ2h0OjA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIG1hcmdpbi10b3A6IDQ1MHB4O1xuICAgIGhlaWdodDogMjYwcHg7XG4gICAgd2lkdGg6IDMzMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIHotaW5kZXg6IDEwMDtcbiAgfVxuXG4gIGNlbnRlcntcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDowO1xuICAgIHJpZ2h0OjA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICB9XG5cbiAgLmdyZWVuQnRue1xuICAgIGNvbG9yOiBncmVlbiAhaW1wb3J0YW50O1xuICB9XG5cbiAgLnByb2ZpbGVQaWN7XG4gICAgbWFyZ2luLXRvcDogNjBweDtcbiAgICBsZWZ0OjA7XG4gICAgcmlnaHQ6MDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIH1cblxuICAuaW1hZ2VuLWNhcnJve1xuICAgd2lkdGg6IDYwcHg7XG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/serviceoptions/serviceoptions.page.ts":
/*!*******************************************************!*\
  !*** ./src/app/serviceoptions/serviceoptions.page.ts ***!
  \*******************************************************/
/*! exports provided: ServiceoptionsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServiceoptionsPage", function() { return ServiceoptionsPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_4__);







var ServiceoptionsPage = /** @class */ (function () {
    function ServiceoptionsPage(grupovider, menu, popoverAlert, alerCtrl, nav) {
        this.grupovider = grupovider;
        this.menu = menu;
        this.popoverAlert = popoverAlert;
        this.alerCtrl = alerCtrl;
        this.nav = nav;
        this.disabled = true;
        this.service = this.grupovider.service;
        console.log(this.service);
        mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["accessToken"] = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';
    }
    ServiceoptionsPage.prototype.ngOnInit = function () {
        this.loadMap();
        this.menu.swipeEnable(false);
    };
    ServiceoptionsPage.prototype.loadMap = function () {
        this.map4 = new mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["Map"]({
            container: 'map4',
            style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',
        });
        console.log(this.map4);
    };
    ServiceoptionsPage.prototype.openCustom = function () {
        this.menu.enable(true, 'custom');
        this.menu.open('custom');
        console.log("is working");
    };
    ServiceoptionsPage.prototype.Cancel = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alerCtrl.create({
                            header: 'Cancelar',
                            message: '¿Estás seguro que quieres cancelar el servicio?',
                            buttons: [{
                                    text: 'No',
                                    role: 'navMenu()',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                },
                                {
                                    text: 'Si',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                        _this.navMenu();
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
    ServiceoptionsPage.prototype.navMenu = function () {
        this.nav.navigateRoot("/sidemenu");
    };
    ServiceoptionsPage.prototype.presentAlertPrompt = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alerCtrl.create({
                            header: 'Servicio no brindado',
                            inputs: [
                                {
                                    name: 'notas',
                                    type: 'text',
                                    placeholder: 'Notas'
                                }
                            ],
                            buttons: [
                                {
                                    text: 'Someter',
                                    cssClass: 'greenBtn',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                        _this.nav.navigateRoot('/sidemenu');
                                    }
                                }
                            ]
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
    ServiceoptionsPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-serviceoptions',
            template: __webpack_require__(/*! ./serviceoptions.page.html */ "./src/app/serviceoptions/serviceoptions.page.html"),
            styles: [__webpack_require__(/*! ./serviceoptions.page.scss */ "./src/app/serviceoptions/serviceoptions.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_gruprovider_service__WEBPACK_IMPORTED_MODULE_2__["GruproviderService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["MenuController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["PopoverController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"]])
    ], ServiceoptionsPage);
    return ServiceoptionsPage;
}());



/***/ })

}]);
//# sourceMappingURL=serviceoptions-serviceoptions-module.js.map
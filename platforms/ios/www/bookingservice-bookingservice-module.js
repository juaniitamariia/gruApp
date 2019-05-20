(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["bookingservice-bookingservice-module"],{

/***/ "./src/app/bookingservice/bookingservice.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/bookingservice/bookingservice.module.ts ***!
  \*********************************************************/
/*! exports provided: BookingservicePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingservicePageModule", function() { return BookingservicePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _bookingservice_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bookingservice.page */ "./src/app/bookingservice/bookingservice.page.ts");







var routes = [
    {
        path: '',
        component: _bookingservice_page__WEBPACK_IMPORTED_MODULE_6__["BookingservicePage"]
    }
];
var BookingservicePageModule = /** @class */ (function () {
    function BookingservicePageModule() {
    }
    BookingservicePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_bookingservice_page__WEBPACK_IMPORTED_MODULE_6__["BookingservicePage"]]
        })
    ], BookingservicePageModule);
    return BookingservicePageModule;
}());



/***/ }),

/***/ "./src/app/bookingservice/bookingservice.page.html":
/*!*********************************************************!*\
  !*** ./src/app/bookingservice/bookingservice.page.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"boton\" (click)='navigate()'><ion-icon style=\"color:gray;\" class=menuBtn name=\"ios-arrow-back\"></ion-icon></button>\n<!-- <ion-menu side=\"start\" menuId=\"custom\" class=\"my-custom-menu\">\n    <ion-header>\n      <ion-toolbar class=\"menuBar\">\n        <ion-img src= \"assets/profile.svg\" class=\"profilePic\" style=\"width: 100px;\"></ion-img>\n      </ion-toolbar>\n    </ion-header>\n    <ion-content>\n      <ion-list>\n        <ion-item ion-buttons href=\"/registro\" lines=\"none\">Inicio</ion-item>\n        <ion-item ion-buttons href=\"/registro\" lines=\"none\"><ion-img padding src= \"assets/Wallet.svg\"></ion-img>Método de Pago</ion-item>\n        <ion-item ion-buttons href=\"/registro\" lines=\"none\"><ion-img padding src= \"assets/historial.svg\"></ion-img>Historial</ion-item>\n        <ion-item ion-buttons href=\"/registro\" lines=\"none\"><ion-img padding src= \"assets/carro.svg\"></ion-img>Mi vehículo</ion-item>\n        <ion-item ion-buttons href=\"/registro\" lines=\"none\"><ion-img padding src= \"assets/invitefriends.svg\"></ion-img>Invitar amigos</ion-item>\n        <ion-item ion-buttons href=\"/registro\" lines=\"none\"><ion-img padding src= \"assets/Settings.svg\"></ion-img>Ajustes</ion-item>\n        <ion-item ion-buttons href=\"/registro\" lines=\"none\"><ion-img padding src= \"assets/logout.svg\"></ion-img>Cerrar</ion-item>\n      </ion-list>\n    </ion-content>\n\n    <ion-router-outlet main></ion-router-outlet>\n  </ion-menu> -->\n\n <!-- menu space -->\n  <ion-card class=mainMenu>\n      <ion-card-content>\n        <div margin style=\"width: 300px\">\n          <ion-img class=iconCar style=\"fill:black;\" src= \"assets/carro.svg\"></ion-img>\n\n          <div style=\"margin-left: 70px; margin-right: 5px;\" class=distancia>\n            <h6 style=\"font-size: 12px;\">DISTANCIA</h6>\n              <p style=\"position: absolute; margin-top: 20px; color: black;\">20.2 mi</p></div> <!-- distance front view -->\n\n          <div style=\"margin-right: 5px;\" class=distancia>\n            <h6 style=\"font-size: 12px;\">TIEMPO</h6>\n              <p style=\"position: absolute; margin-top: 20px; color: black;\">20 min</p></div> <!-- time front view -->\n\n          <div class=distancia><h6 style=\"font-size: 12px;\">PRECIO</h6>\n            <p style=\"position: absolute; margin-top: 20px; color: black;\">$90.00</p></div> <!-- price front view -->\n            </div>\n\n          <ion-button (click)='goFoward()' style=\"margin-top: 10px;\" expand=\"block\">Solicitar</ion-button>\n       \n      </ion-card-content>\n  </ion-card>\n\n  <!-- Map view -->\n<ion-header>\n \n    <meta charset='utf-8' />\n    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />\n    <div  id='map2' style='width: 100%; height: 100vh;'>  \n      </div>\n\n    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>\n    <link href='https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />\n\n    <style>\n            body { margin:0; padding:0; }\n            #map { position:absolute; top:0; bottom:0; width:100%; }\n      </style>\n    \n</ion-header>\n\n<ion-content>   \n\n   <div id='map2'></div>\n\n    <script>\n            mapboxgl.accessToken = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';\n            const map = new mapboxgl.Map({\n            container: 'map',\n            style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',\n            center: [-66.5901489, 18.2208328],\n            zoom: 13.6\n            });\n    </script>\n\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/bookingservice/bookingservice.page.scss":
/*!*********************************************************!*\
  !*** ./src/app/bookingservice/bookingservice.page.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "my-custom-menu {\n  --width: 285px;\n  z-index: 1000; }\n\n.boton {\n  position: absolute;\n  margin-left: 20px;\n  width: 50px;\n  height: 50px;\n  z-index: 100;\n  border-radius: 50%;\n  background-color: whitesmoke;\n  box-shadow: 50%;\n  margin-top: 40px; }\n\n.mainMenu {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 450px;\n  height: 1080px;\n  background-color: white;\n  z-index: 100; }\n\n.menuBtn {\n  height: 30px;\n  width: 30px;\n  color: white; }\n\n.menuBar {\n  height: 180px;\n  --background: #6561ab; }\n\n.mainMenu {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 450px;\n  height: 1080px;\n  background-color: white;\n  z-index: 100; }\n\n.iconCar {\n  position: absolute;\n  margin-top: 20px;\n  width: 50px; }\n\n.distancia {\n  z-index: 1000;\n  height: 60px;\n  width: 70px;\n  background-color: transparent;\n  display: inline-flex;\n  margin-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvYm9va2luZ3NlcnZpY2UvYm9va2luZ3NlcnZpY2UucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBUTtFQUNSLGFBQWEsRUFBQTs7QUFHZjtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsV0FBVTtFQUNWLFlBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLDRCQUE0QjtFQUM1QixlQUFlO0VBQ2YsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0Usa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLHVCQUF1QjtFQUN2QixZQUFZLEVBQUE7O0FBR2Q7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLFlBQVksRUFBQTs7QUFHZDtFQUNFLGFBQWE7RUFDYixxQkFBYSxFQUFBOztBQUdmO0VBQ0Usa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLHVCQUF1QjtFQUN2QixZQUFZLEVBQUE7O0FBR2Q7RUFDSSxrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLFdBQVcsRUFBQTs7QUFHZjtFQUNJLGFBQWE7RUFDYixZQUFZO0VBQ1osV0FBVztFQUNYLDZCQUE2QjtFQUM3QixvQkFBb0I7RUFDcEIsZ0JBQWdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9ib29raW5nc2VydmljZS9ib29raW5nc2VydmljZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJteS1jdXN0b20tbWVudSB7XG4gICAgLS13aWR0aDogMjg1cHg7XG4gICAgei1pbmRleDogMTAwMDtcbiAgfVxuXG4gIC5ib3RvbntcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gICAgd2lkdGg6NTBweDtcbiAgICBoZWlnaHQ6NTBweDtcbiAgICB6LWluZGV4OiAxMDA7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlc21va2U7XG4gICAgYm94LXNoYWRvdzogNTAlO1xuICAgIG1hcmdpbi10b3A6IDQwcHg7XG4gIH1cblxuICAubWFpbk1lbnV7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBtYXJnaW4tdG9wOiA0NTBweDtcbiAgICBoZWlnaHQ6IDEwODBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICB6LWluZGV4OiAxMDA7XG4gIH1cblxuICAubWVudUJ0bntcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgd2lkdGg6IDMwcHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG5cbiAgLm1lbnVCYXJ7XG4gICAgaGVpZ2h0OiAxODBweDtcbiAgICAtLWJhY2tncm91bmQ6ICM2NTYxYWI7XG4gIH1cblxuICAubWFpbk1lbnV7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBtYXJnaW4tdG9wOiA0NTBweDtcbiAgICBoZWlnaHQ6IDEwODBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICB6LWluZGV4OiAxMDA7XG4gIH1cblxuICAuaWNvbkNhcntcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gICAgICB3aWR0aDogNTBweDtcbiAgfVxuXG4gIC5kaXN0YW5jaWF7XG4gICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgaGVpZ2h0OiA2MHB4O1xuICAgICAgd2lkdGg6IDcwcHg7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgbWFyZ2luLXRvcDogMTBweDtcbiAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/bookingservice/bookingservice.page.ts":
/*!*******************************************************!*\
  !*** ./src/app/bookingservice/bookingservice.page.ts ***!
  \*******************************************************/
/*! exports provided: BookingservicePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookingservicePage", function() { return BookingservicePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");










var BookingservicePage = /** @class */ (function () {
    function BookingservicePage(menu, nav, grupovider, popoverController, alerCtrl, nativePageTransitions, location) {
        this.menu = menu;
        this.nav = nav;
        this.grupovider = grupovider;
        this.popoverController = popoverController;
        this.alerCtrl = alerCtrl;
        this.nativePageTransitions = nativePageTransitions;
        this.location = location;
        this.service = this.grupovider.service;
        console.log(this.service);
        mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["accessToken"] = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';
    }
    BookingservicePage.prototype.ngOnInit = function () {
        this.loadMap(); //loads map
        console.log('is loading map');
    };
    BookingservicePage.prototype.loadMap = function () {
        this.map2 = new mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["Map"]({
            container: 'map2',
            style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',
        });
        console.log(this.map2);
    };
    BookingservicePage.prototype.navigate = function () {
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
    BookingservicePage.prototype.Listo = function () {
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
                        this.nav.navigateRoot("/rating"); //pedido exitoso lleva a pagina de rating del servicio
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingservicePage.prototype.Cancel = function () {
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
        this.nav.navigateRoot("/sidemenu");
    };
    BookingservicePage.prototype.goFoward = function () {
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
    BookingservicePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-bookingservice',
            template: __webpack_require__(/*! ./bookingservice.page.html */ "./src/app/bookingservice/bookingservice.page.html"),
            styles: [__webpack_require__(/*! ./bookingservice.page.scss */ "./src/app/bookingservice/bookingservice.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["MenuController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
            _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__["GruproviderService"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_5__["NativePageTransitions"],
            _angular_common__WEBPACK_IMPORTED_MODULE_6__["Location"]])
    ], BookingservicePage);
    return BookingservicePage;
}());



/***/ })

}]);
//# sourceMappingURL=bookingservice-bookingservice-module.js.map
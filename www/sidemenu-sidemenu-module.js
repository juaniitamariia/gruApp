(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["sidemenu-sidemenu-module"],{

/***/ "./src/app/sidemenu/sidemenu.module.ts":
/*!*********************************************!*\
  !*** ./src/app/sidemenu/sidemenu.module.ts ***!
  \*********************************************/
/*! exports provided: SidemenuPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidemenuPageModule", function() { return SidemenuPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _sidemenu_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sidemenu.page */ "./src/app/sidemenu/sidemenu.page.ts");







var routes = [
    {
        path: '',
        component: _sidemenu_page__WEBPACK_IMPORTED_MODULE_6__["SidemenuPage"]
    }
];
var SidemenuPageModule = /** @class */ (function () {
    function SidemenuPageModule() {
    }
    SidemenuPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_sidemenu_page__WEBPACK_IMPORTED_MODULE_6__["SidemenuPage"]]
        })
    ], SidemenuPageModule);
    return SidemenuPageModule;
}());



/***/ }),

/***/ "./src/app/sidemenu/sidemenu.page.html":
/*!*********************************************!*\
  !*** ./src/app/sidemenu/sidemenu.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- sidemenu code -->\n<button class=\"boton\" (click)='openCustom()'>\n    <ion-icon class=menuBtn name=\"menu\"></ion-icon>\n</button>\n<ion-menu side=\"start\" menuId=\"custom\" class=\"my-custom-menu\">\n    <ion-header no-border>\n        <ion-toolbar class=\"menuBar\">\n            <ion-img src=\"assets/logowhite.png\" class=\"logo\" style=\"width: 200px;\"></ion-img>\n            <h6 class=center style=\"text-align: center; font-weight: 300; font-size: 20px; color: white;\">{{user}}</h6>\n        </ion-toolbar>\n    </ion-header>\n    <ion-content>\n        <ion-list>\n            <ion-item ion-buttons (click)='close()' lines=\"none\">\n                <ion-img padding style=\"padding-right: 10px; width: 60px; margin-right: 0px; padding-left: 10px;\"\n                    src=\"assets/homegruapp.svg\"></ion-img>Inicio\n            </ion-item>\n            <ion-item ion-buttons (click)=metodoPago() lines=\"none\">\n                <ion-img style=\"width: 55px;\" padding src=\"assets/Wallet.svg\"></ion-img>Método de Pago\n            </ion-item>\n            <ion-item ion-buttons (click)='solicitudes()' lines=\"none\">\n                <ion-icon style=\"width: 55px; color: rgb(189, 189, 189)\" name=\"person-add\"></ion-icon>Solicitudes\n                \n                <ion-badge *ngIf= \"requestCount > 0\" slot=\"end\" color=\"danger\">{{requestCount}}</ion-badge>\n            </ion-item>\n            <ion-item ion-buttons (click)='navHistorial()' lines=\"none\">\n                <ion-img style=\"height: 35px; width: 58px; margin: 0px;\" src=\"assets/historial.png\"></ion-img>Historial\n            </ion-item>\n            <ion-item ion-buttons (click)='miVehiculo()' lines=\"none\">\n                <ion-img padding class=\"imagen-carro\" src=\"assets/carro.svg\"></ion-img>Mi vehículo\n            </ion-item>\n            <ion-item ion-buttons (click)=inviteFriends() lines=\"none\">\n                <ion-img style=\"height: 35px; width: 58px; margin: 0px;\" src=\"assets/invite.png\"></ion-img>Invitar amigos\n            </ion-item>\n            <ion-item ion-buttons (click)=profile() lines=\"none\">\n                <ion-img style=\"width: 60px;\" padding src=\"assets/Settings.svg\"></ion-img>Ajustes\n            </ion-item>\n            <ion-item ion-buttons (click)='logOut()' lines=\"none\">\n                <ion-img style=\"width: 55px;\" padding src=\"assets/logout.png\"></ion-img>Cerrar\n            </ion-item>\n        </ion-list>\n    </ion-content>\n\n    <ion-router-outlet main></ion-router-outlet>\n</ion-menu>\n\n<ion-card class=mainMenu>\n        <div class=\"instruction\" margin=10px expand=\"block\">\n                <h5 style=\"padding: 15px; font-size: 15px; margin-bottom: 0px;\">*Escoja el servicio que desea*</h5>\n            </div>\n\n    <!-- Services button icons(1) -->\n    <div class=divElem>\n        <ion-grid>\n            <ion-row>\n                <ion-col size=\"4\">\n                    <button (click)=\"alerts('grua')\" class=btnIcon>\n                        <ion-img style=\"margin-left: 20px; object-fit: contain;\" src=\"assets/grua.svg\"></ion-img>\n                        <h6 style=\"font-weight: 200; margin-top: 5px; font-size: 12px;\">GRÚA</h6>\n                    </button>\n                </ion-col>\n                <ion-col size=\"4\">\n                    <button (click)=\"alerts('goma')\" class=btnIcon>\n                        <ion-img style=\"object-fit: contain;\" src=\"assets/gomavacia.svg\"></ion-img>\n                        <h6 style=\"font-weight: 200; margin-top: 5px; font-size: 12px;\">GOMA</h6>\n                    </button>\n                </ion-col>\n                <ion-col size=\"4\">\n                    <button (click)=\"alerts('gasolina')\" class=btnIcon>\n                        <ion-img style=\"object-fit: contain; width: 30px; margin-left: 35px;\" src=\"assets/gasolina.svg\">\n                        </ion-img>\n                        <h6 style=\"font-weight: 200; margin-top: 5px; font-size: 12px;\">GASOLINA</h6>\n                    </button>\n                </ion-col>\n            </ion-row>\n            <!-- Services button icons(2) -->\n            <ion-row>\n                <ion-col size=\"4\">\n                    <button (click)=\"alerts('especial')\" class=btnIcon2>\n                        <ion-img padding style=\"object-fit: contain; margin-left: 10px;\" src=\"assets/choqueicon.svg\">\n                        </ion-img>\n                        <h6 style=\"font-weight: 200; margin-top: 0px; font-size: 12px; text-align: center;\">SERVICIO\n                            ESPECIAL</h6>\n                    </button>\n                </ion-col>\n                <ion-col size=\"4\">\n                    <button (click)=\"alerts('bateria')\" class=btnIcon2>\n                        <ion-img padding style=\"object-fit: contain; width: 90px;\" src=\"assets/bateria.svg\"></ion-img>\n                        <h6 style=\"font-weight: 200; margin-top: 0px; font-size: 12px;\">BATERÍA</h6>\n                    </button>\n                </ion-col>\n                <ion-col size=\"4\">\n                    <button (click)=\"alerts('llaves')\" class=btnIcon2>\n                        <ion-img padding style=\"object-fit: contain; width: 75px; margin-left: 15px;\"\n                            src=\"assets/llaves.svg\">\n                        </ion-img>\n                        <h6 style=\"font-weight: 200; margin-top: 0px; font-size: 12px;\">CERRAJERO</h6>\n                    </button>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </div>\n\n</ion-card>\n\n<!-- Map view -->\n\n<ion-header>\n\n    <meta charset='utf-8' />\n    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />\n    <div id='mapindex' style='width: 100%; height: 70vh;'></div>\n\n    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>\n    <link href='https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />\n\n    <style>\n        body {\n            margin: 0;\n            padding: 0;\n        }\n\n        #map {\n            position: absolute;\n            top: 0;\n            bottom: 0;\n            width: 100%;\n        }\n    </style>\n\n</ion-header>\n\n<ion-content>\n\n\n</ion-content>"

/***/ }),

/***/ "./src/app/sidemenu/sidemenu.page.scss":
/*!*********************************************!*\
  !*** ./src/app/sidemenu/sidemenu.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".my-custom-menu {\n  --width: 285px;\n  z-index: 1000; }\n\n.boton {\n  position: absolute;\n  margin-left: 20px;\n  width: 50px;\n  height: 50px;\n  z-index: 100;\n  border-radius: 50%;\n  background-color: #6561ab;\n  box-shadow: 50%;\n  margin-top: 40px; }\n\n.menuBtn {\n  height: 30px;\n  width: 30px;\n  color: white; }\n\n.menuColor {\n  color: white; }\n\n.menuBar {\n  height: 250px;\n  --background: #6561ab; }\n\n.mainMenu {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin: 0;\n  bottom: 0;\n  background-color: white;\n  z-index: 100;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.carDescr {\n  border-radius: 0;\n  z-index: 150;\n  margin: 0;\n  background-color: whitesmoke;\n  box-shadow: none; }\n\n.carActive {\n  margin: 10px;\n  padding-top: 5px; }\n\n.carBrand {\n  display: inline;\n  position: absolute; }\n\n.text {\n  margin: 0px !important;\n  padding: 0px !important; }\n\n.btnIcon {\n  width: 110px;\n  height: 70px;\n  background-color: transparent;\n  margin-top: 15px;\n  font-size: 12px;\n  color: #515151; }\n\n.btnIcon:active {\n  background-color: transparent;\n  border-color: transparent; }\n\n.divElem {\n  font-size: 12px;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto; }\n\n.btnIcon2 {\n  width: 110px;\n  height: 110px;\n  background-color: transparent;\n  margin-top: -20px;\n  font-size: 12px;\n  color: #515151; }\n\n.instruction {\n  color: gray;\n  text-align: center;\n  margin-top: 0px;\n  margin-bottom: 0px; }\n\n.changeBtn {\n  font-size: 18px;\n  font-weight: 300;\n  background-color: transparent;\n  float: right;\n  margin-top: 15px; }\n\n.final-location {\n  margin: 0;\n  color: #afafaf;\n  font-weight: 300; }\n\n.add-car {\n  margin: 0;\n  color: #5c5c5c;\n  font-weight: 300;\n  margin-bottom: 5px; }\n\n.logo {\n  margin-top: 60px;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto; }\n\n.selectedCar {\n  position: absolute;\n  display: inline-flex;\n  top: -13px;\n  margin-bottom: 0px;\n  display: inline-flex;\n  font-size: 16px;\n  font-weight: 200; }\n\n.changeDescr {\n  font-size: 12px;\n  font-weight: 200;\n  display: inline-flex;\n  color: gray;\n  margin: 0px;\n  height: 20px;\n  box-align: center; }\n\n.responsive {\n  height: 100vh; }\n\n.center {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto; }\n\n.imagen-carro {\n  width: 60px; }\n\n.marker {\n  background-image: url(\"/src/assets/mapbox-icon.png\");\n  background-size: cover;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  cursor: pointer; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0Rlc2t0b3AvR3J1QXBwIGNvcHkgMi9zcmMvYXBwL3NpZGVtZW51L3NpZGVtZW51LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGNBQVE7RUFDUixhQUFhLEVBQUE7O0FBSWY7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLFdBQVU7RUFDVixZQUFXO0VBQ1gsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsZUFBZTtFQUNmLGdCQUFnQixFQUFBOztBQUdsQjtFQUVFLFlBQVk7RUFDWixXQUFXO0VBQ1gsWUFBWSxFQUFBOztBQUdkO0VBRUUsWUFBWSxFQUFBOztBQUdkO0VBQ0UsYUFBYTtFQUNiLHFCQUFhLEVBQUE7O0FBR2Y7RUFDRSxrQkFBa0I7RUFDbEIsT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxTQUFTO0VBQ1QsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWiw0QkFBNEI7RUFDNUIsNkJBQTZCLEVBQUE7O0FBRy9CO0VBQ0UsZ0JBQWdCO0VBQ2hCLFlBQVk7RUFDWixTQUFTO0VBQ1QsNEJBQTRCO0VBQzVCLGdCQUFnQixFQUFBOztBQUdsQjtFQUNFLFlBQVk7RUFDWixnQkFBZ0IsRUFBQTs7QUFJbEI7RUFDRSxlQUFlO0VBQ2Ysa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0Usc0JBQXNCO0VBQ3RCLHVCQUF1QixFQUFBOztBQUd6QjtFQUNFLFlBQVk7RUFDWixZQUFZO0VBQ1osNkJBQTZCO0VBRTdCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsY0FBYyxFQUFBOztBQUdoQjtFQUNFLDZCQUE2QjtFQUM3Qix5QkFBeUIsRUFBQTs7QUFLM0I7RUFDRSxlQUFlO0VBQ2YsT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCLEVBQUE7O0FBR3BCO0VBRUUsWUFBWTtFQUNaLGFBQWE7RUFDYiw2QkFBNkI7RUFDN0IsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZixjQUFjLEVBQUE7O0FBSWhCO0VBQ0UsV0FBVztFQUNYLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2Ysa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0UsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQiw2QkFBNkI7RUFDN0IsWUFBWTtFQUNaLGdCQUFnQixFQUFBOztBQUdsQjtFQUNFLFNBQVM7RUFDVCxjQUF5QjtFQUN6QixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxTQUFTO0VBQ1QsY0FBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLGdCQUFnQjtFQUNoQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLFVBQVU7RUFDVixrQkFBa0I7RUFDbEIsb0JBQW9CO0VBQ3BCLGVBQWU7RUFDZixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtFQUNwQixXQUFXO0VBQ1gsV0FBVztFQUNYLFlBQVk7RUFDWixpQkFBaUIsRUFBQTs7QUFHbkI7RUFDRSxhQUFhLEVBQUE7O0FBR2Y7RUFFRSxPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxXQUFXLEVBQUE7O0FBR1o7RUFDQyxvREFBb0Q7RUFDcEQsc0JBQXNCO0VBQ3RCLFdBQVc7RUFDWCxZQUFZO0VBQ1osa0JBQWtCO0VBQ2xCLGVBQWUsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NpZGVtZW51L3NpZGVtZW51LnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5teS1jdXN0b20tbWVudSB7XG4gICAgLS13aWR0aDogMjg1cHg7XG4gICAgei1pbmRleDogMTAwMDtcbiAgICAkbWVudS1pb3MtYm94c2hhZG93OiBub25lO1xuICB9XG5cbiAgLmJvdG9ue1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcbiAgICB3aWR0aDo1MHB4O1xuICAgIGhlaWdodDo1MHB4O1xuICAgIHotaW5kZXg6IDEwMDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzY1NjFhYjtcbiAgICBib3gtc2hhZG93OiA1MCU7XG4gICAgbWFyZ2luLXRvcDogNDBweDtcbiAgfVxuXG4gIC5tZW51QnRue1xuICAgIFxuICAgIGhlaWdodDogMzBweDtcbiAgICB3aWR0aDogMzBweDtcbiAgICBjb2xvcjogd2hpdGU7XG4gIH1cblxuICAubWVudUNvbG9ye1xuICAgIFxuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxuXG4gIC5tZW51QmFye1xuICAgIGhlaWdodDogMjUwcHg7XG4gICAgLS1iYWNrZ3JvdW5kOiAjNjU2MWFiO1xuICB9XG5cbiAgLm1haW5NZW51e1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OjA7XG4gICAgcmlnaHQ6MDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICB6LWluZGV4OiAxMDA7XG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDtcbiAgfVxuXG4gIC5jYXJEZXNjcntcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIHotaW5kZXg6IDE1MDtcbiAgICBtYXJnaW46IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGVzbW9rZTtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICB9XG5cbiAgLmNhckFjdGl2ZXtcbiAgICBtYXJnaW46IDEwcHg7XG4gICAgcGFkZGluZy10b3A6IDVweDtcbiAgICBcbiAgfVxuXG4gIC5jYXJCcmFuZHtcbiAgICBkaXNwbGF5OiBpbmxpbmU7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICB9XG5cbiAgLnRleHR7XG4gICAgbWFyZ2luOiAwcHggIWltcG9ydGFudDtcbiAgICBwYWRkaW5nOiAwcHggIWltcG9ydGFudDtcbiAgfVxuXG4gIC5idG5JY29ue1xuICAgIHdpZHRoOiAxMTBweDtcbiAgICBoZWlnaHQ6IDcwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICBcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBjb2xvcjogIzUxNTE1MTtcbiAgfVxuXG4gIC5idG5JY29uOmFjdGl2ZXtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICB9XG5cblxuICBcbiAgLmRpdkVsZW17XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgfVxuXG4gIC5idG5JY29uMntcbiAgICBcbiAgICB3aWR0aDogMTEwcHg7XG4gICAgaGVpZ2h0OiAxMTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBtYXJnaW4tdG9wOiAtMjBweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgY29sb3I6ICM1MTUxNTE7XG5cbiAgfVxuXG4gIC5pbnN0cnVjdGlvbntcbiAgICBjb2xvcjogZ3JheTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luLXRvcDogMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDBweDtcbiAgfVxuXG4gIC5jaGFuZ2VCdG57XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIG1hcmdpbi10b3A6IDE1cHg7XG4gICAgfVxuXG4gIC5maW5hbC1sb2NhdGlvbiB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGNvbG9yOiByZ2IoMTc1LCAxNzUsIDE3NSk7XG4gICAgZm9udC13ZWlnaHQ6IDMwMDtcbiAgfVxuXG4gIC5hZGQtY2FyIHtcbiAgICBtYXJnaW46IDA7XG4gICAgY29sb3I6IHJnYig5MiwgOTIsIDkyKTtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgfVxuXG4gIC5sb2dve1xuICAgIG1hcmdpbi10b3A6IDYwcHg7XG4gICAgbGVmdDowO1xuICAgIHJpZ2h0OjA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICB9XG5cbiAgLnNlbGVjdGVkQ2Fye1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICB0b3A6IC0xM3B4O1xuICAgIG1hcmdpbi1ib3R0b206IDBweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgZm9udC13ZWlnaHQ6IDIwMDtcbiAgfVxuXG4gIC5jaGFuZ2VEZXNjcntcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgZm9udC13ZWlnaHQ6IDIwMDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBjb2xvcjogZ3JheTtcbiAgICBtYXJnaW46IDBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgYm94LWFsaWduOiBjZW50ZXI7XG4gIH1cblxuICAucmVzcG9uc2l2ZXtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICB9XG4gIFxuICAuY2VudGVye1xuICAgIC8vcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgfVxuXG4gIC5pbWFnZW4tY2Fycm97XG4gICAgd2lkdGg6IDYwcHg7XG4gICB9XG5cbiAgIC5tYXJrZXJ7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCcvc3JjL2Fzc2V0cy9tYXBib3gtaWNvbi5wbmcnKTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIHdpZHRoOiA1MHB4O1xuICAgIGhlaWdodDogNTBweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICB9Il19 */"

/***/ }),

/***/ "./src/app/sidemenu/sidemenu.page.ts":
/*!*******************************************!*\
  !*** ./src/app/sidemenu/sidemenu.page.ts ***!
  \*******************************************/
/*! exports provided: SidemenuPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidemenuPage", function() { return SidemenuPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/social-sharing/ngx */ "./node_modules/@ionic-native/social-sharing/ngx/index.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _popover_popover_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../popover/popover.component */ "./src/app/popover/popover.component.ts");
/* harmony import */ var _share_share_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../share/share.component */ "./src/app/share/share.component.ts");
















var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var SidemenuPage = /** @class */ (function () {
    function SidemenuPage(menu, nav, router, gruprovider, viewchild, alerCtrl, socialSharing, nativePageTransitions, popoverController, modalCtrl, geolocation) {
        this.menu = menu;
        this.nav = nav;
        this.router = router;
        this.gruprovider = gruprovider;
        this.viewchild = viewchild;
        this.alerCtrl = alerCtrl;
        this.socialSharing = socialSharing;
        this.nativePageTransitions = nativePageTransitions;
        this.popoverController = popoverController;
        this.modalCtrl = modalCtrl;
        this.geolocation = geolocation;
        mapbox_gl__WEBPACK_IMPORTED_MODULE_5__["accessToken"] = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_8__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    }
    SidemenuPage.prototype.ngOnInit = function () {
        // this.userLocation();
        this.loadMap();
        this.getName();
        this.getPhoto();
        this.getLocation();
        this.getQuote();
    };
    SidemenuPage.prototype.ngOnDestroy = function () {
        this.mapindex.remove();
    };
    SidemenuPage.prototype.loadMap = function () {
        this.mapindex = new mapbox_gl__WEBPACK_IMPORTED_MODULE_5__["Map"]({
            container: 'mapindex',
            style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5'
        });
        this.mapindex.dragRotate.disable();
        var geolocate = new mapbox_gl__WEBPACK_IMPORTED_MODULE_5__["GeolocateControl"]({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        this.mapindex.addControl(geolocate);
        this.mapindex.on('load', function () {
            geolocate.trigger();
        });
    };
    SidemenuPage.prototype.metodoPago = function () {
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
        this.nav.navigateRoot('/metodo-pago');
    };
    SidemenuPage.prototype.getQuote = function () {
        this.requestCount = 0;
    };
    SidemenuPage.prototype.profile = function () {
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
        this.nav.navigateRoot('/profile');
    };
    SidemenuPage.prototype.alerts = function (service) {
        console.log("pop working");
        this.gruprovider.service = service;
        console.log(service);
        if (service == 'grua' || service == 'goma' || service == 'gasolina' || service == 'llaves' || service == 'bateria') {
            this.presentPopover();
        }
        if (service == 'goma') {
            this.Goma();
        }
        else if (service == 'gasolina') {
            this.Gasolina();
        }
        else if (service == 'especial') {
            this.Especial();
        }
        else if (service == 'llaves') {
            this.Llaves();
        }
        else if (service == 'bateria') {
            this.Bateria();
        }
    };
    SidemenuPage.prototype.openCustom = function () {
        this.menu.enable(true, 'custom');
        this.menu.open('custom');
        console.log("is working");
    };
    SidemenuPage.prototype.navlocationPage = function (service) {
        this.gruprovider.map = this.mapindex;
        this.gruprovider.mapboxgl = this.mapboxgl;
        this.gruprovider.service = service;
        console.log(service);
        //this.Grua();
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
        console.log('transition working');
        this.nav.navigateForward(["/locatio-marker"]); //cambia de pagina
    };
    SidemenuPage.prototype.Goma = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alerCtrl.create({
                            header: '¡ALERTA!',
                            message: 'Para este servicio solo cambiamos la goma por la repuesta de su vehículo o le proporcionamos aire.',
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
    SidemenuPage.prototype.Gasolina = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alerCtrl.create({
                            header: '¡ALERTA!',
                            message: 'Le llevamos solo $5 de gasolina para que pueda llegar a la estación de gasolina más cercana. No aplica para gasolina diesel.',
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
    SidemenuPage.prototype.Especial = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alerCtrl.create({
                            header: '¡ALERTA!',
                            message: 'Si su vehículo se encuentra fuera de carretera, no está en un sótano y tampoco en un multipiso debe ser cotizado como un servicio especial. Al dar Ok lo estará llevando a servicio especial para que haga todo el proceso.',
                            buttons: [{
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        _this.nav.navigateRoot("/photo");
                                    }
                                }
                            ],
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
    SidemenuPage.prototype.Llaves = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alerCtrl.create({
                            header: '¡ALERTA!',
                            message: 'Abrimos la principal para que pueda tener acceso al vehículo.',
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
    SidemenuPage.prototype.Bateria = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alerCtrl.create({
                            header: '¡ALERTA!',
                            message: 'En este servicio no reemplazamos la batería, sólo recargamos su misma batería.',
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
    // async Grua(){
    //   const alert = await this.alerCtrl.create({
    //     header: '¡ALERTA!',
    //     message: 'El servicio de remolque sólo aplica cuando el vehículo se encuentre en un espacio accesible para la grúa y solo vehículos que tengan solo cuatro ruedas y no tenga carga. No camiones.',
    //     buttons: [{
    //       text: 'OK',
    //       role: 'cancel',
    //       cssClass: 'secondary',
    //       handler: () => {
    //         console.log('Confirm Cancel');      
    //       }
    //     }]
    //   });
    //   await alert.present();
    //   //this.nav.navigateRoot('/locatio-marker');
    // }
    SidemenuPage.prototype.inviteFriends = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var modal;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: _share_share_component__WEBPACK_IMPORTED_MODULE_11__["ShareComponent"],
                            componentProps: {
                                value: 123
                            }
                        })];
                    case 1:
                        modal = _a.sent();
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // async presentPopover(service : string) {
    //   const popover = await this.popoverController.create({
    //     component: PopoverComponent,
    //     //event: event,
    //     translucent: false
    //   });
    //   return await popover.present();
    // }
    SidemenuPage.prototype.navigateFoward = function () {
        this.nav.navigateRoot('/escoger-pago');
    };
    SidemenuPage.prototype.logOut = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_8__["User"].logOut().then(function (resp) {
            console.log('Logged out successfully', resp);
            _this.nav.navigateRoot('/registro');
        }, function (err) {
            //console.log('Error logging out', err);
        });
    };
    SidemenuPage.prototype.presentPopover = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var popover;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: _popover_popover_component__WEBPACK_IMPORTED_MODULE_10__["PopoverComponent"],
                            //event: event,
                            translucent: false,
                            backdropDismiss: false
                        })];
                    case 1:
                        popover = _a.sent();
                        console.log("pop working");
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SidemenuPage.prototype.getName = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_8__["Cloud"].run('getName', {
            userId: parse__WEBPACK_IMPORTED_MODULE_8__["User"].current().id
        }).then(function (result) {
            _this.user = result;
            console.log(_this.user);
        }, function (error) {
            console.log(error);
        });
    };
    SidemenuPage.prototype.getPhoto = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_8__["Cloud"].run('getUser', {
            userId: parse__WEBPACK_IMPORTED_MODULE_8__["User"].current().id
        }).then(function (result) {
            if (result.get('profilePic') == null) {
                console.log("photo object is null");
                _this.photo = "assets/profile.svg";
            }
            else {
                _this.photo = result.get('profilePic');
            }
            console.log(_this.photo);
        });
    };
    SidemenuPage.prototype.transition = function () {
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
    };
    SidemenuPage.prototype.navHistorial = function () {
        this.transition();
        this.nav.navigateRoot('/historial');
    };
    SidemenuPage.prototype.miVehiculo = function () {
        this.transition();
        this.nav.navigateRoot('/mi-vehiculo');
    };
    SidemenuPage.prototype.solicitudes = function () {
        this.transition();
        this.nav.navigateRoot('/request');
    };
    SidemenuPage.prototype.close = function () {
        this.menu.close('custom');
    };
    SidemenuPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.gruprovider.lat = resp.coords.latitude;
            _this.gruprovider.long = resp.coords.longitude;
            console.log(_this.gruprovider.long, _this.gruprovider.lat);
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    SidemenuPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sidemenu',
            template: __webpack_require__(/*! ./sidemenu.page.html */ "./src/app/sidemenu/sidemenu.page.html"),
            styles: [__webpack_require__(/*! ./sidemenu.page.scss */ "./src/app/sidemenu/sidemenu.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["MenuController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _gruprovider_service__WEBPACK_IMPORTED_MODULE_4__["GruproviderService"], _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _ionic_native_social_sharing_ngx__WEBPACK_IMPORTED_MODULE_6__["SocialSharing"],
            _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_7__["NativePageTransitions"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["ModalController"], _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_9__["Geolocation"]])
    ], SidemenuPage);
    return SidemenuPage;
}());



/***/ })

}]);
//# sourceMappingURL=sidemenu-sidemenu-module.js.map
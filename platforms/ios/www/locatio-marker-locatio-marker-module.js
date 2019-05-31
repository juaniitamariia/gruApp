(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["locatio-marker-locatio-marker-module"],{

/***/ "./src/app/locatio-marker/locatio-marker.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/locatio-marker/locatio-marker.module.ts ***!
  \*********************************************************/
/*! exports provided: LocatioMarkerPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocatioMarkerPageModule", function() { return LocatioMarkerPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _locatio_marker_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./locatio-marker.page */ "./src/app/locatio-marker/locatio-marker.page.ts");







var routes = [
    {
        path: '',
        component: _locatio_marker_page__WEBPACK_IMPORTED_MODULE_6__["LocatioMarkerPage"]
    }
];
var LocatioMarkerPageModule = /** @class */ (function () {
    function LocatioMarkerPageModule() {
    }
    LocatioMarkerPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_locatio_marker_page__WEBPACK_IMPORTED_MODULE_6__["LocatioMarkerPage"]]
        })
    ], LocatioMarkerPageModule);
    return LocatioMarkerPageModule;
}());



/***/ }),

/***/ "./src/app/locatio-marker/locatio-marker.page.html":
/*!*********************************************************!*\
  !*** ./src/app/locatio-marker/locatio-marker.page.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"boton\" (click)='navigate()'>\n  <ion-icon style=\"color:white\" name=\"ios-arrow-back\" class=menuBtn></ion-icon>\n</button>\n\n<!-- <ion-card class=mainMenu>\n      <ion-img class=locationIcon src= \"assets/locationicon.svg\"></ion-img>\n      <h6 class=actualLoc>Mi ubicación actual</h6> user's location viewport -->\n<!-- <h6 class=recoger>RECOGER</h6> -->\n<!-- <ion-input [(ngModel)]=\"destino\" (change)=\"setDestino()\" class=destination placeholder='DESTINO'></ion-input> destination viewport -->\n\n<ion-card class=menu>\n  <h6 class=\"instrucciones\">ESCRIBA O MARQUE EL LUGAR A DONDE QUIERE IR LUEGO DE SER ASISTIDO POR EL GRUERO</h6>\n  <p class=\"titulo-destino\">DESTINO <span *ngIf=\"this.distance != null\"\n      style=\"font-weight: bold; color: black;\">{{this.distance}} millas</span></p>\n  <ion-row style=\"margin-left: 5px; margin-right: 5px;\">\n    <ion-col size=\"10\">\n      <ion-input [(ngModel)]='destino' class=\"input-destino\" placeholder=\"Ej. Calle Hiedra, Cidra Puerto Rico.\"></ion-input>\n    </ion-col> <!-- (ngModelChange)=\"loadMap()\" -->\n    <ion-col size=\"2\">\n      <ion-button (click)=\"setDestino()\">\n        <ion-icon name=\"pin\"></ion-icon>\n      </ion-button>\n    </ion-col>\n  </ion-row>\n  <ion-grid class=\"grid-botones\">\n    <ion-row>\n      <ion-col>\n        <ion-button class=\"solicitar\" expand=\"block\" (click)=\"changePage()\">Solicitar</ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-card>\n\n\n<!-- Map view -->\n<ion-header>\n\n  <meta charset='utf-8' />\n  <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />\n  <div id='map1' style='width: 100%; height: 80vh;'></div>\n  <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>\n  <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />\n  <style>\n    body {\n      margin: 0;\n      padding: 0;\n    }\n\n    #map {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      width: 100%;\n    }\n  </style>\n\n\n</ion-header>"

/***/ }),

/***/ "./src/app/locatio-marker/locatio-marker.page.scss":
/*!*********************************************************!*\
  !*** ./src/app/locatio-marker/locatio-marker.page.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".solicitar {\n  margin-right: auto;\n  margin-left: auto;\n  left: 0;\n  right: 0;\n  width: 170px;\n  margin-bottom: 10px; }\n\n.titulo-destino {\n  font-size: 12px;\n  color: #bbb5b5;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: 0;\n  margin-top: 20px;\n  margin-bottom: 5px;\n  text-align: center; }\n\n.instrucciones {\n  color: gray;\n  font-size: 13px;\n  text-align: center;\n  margin: 20px;\n  margin-bottom: 5px; }\n\n.input-destino {\n  border: solid 1px #d4d0d0;\n  border-radius: 5px;\n  width: 100%;\n  height: 100%;\n  --padding-start: 8px; }\n\n.boton {\n  position: absolute;\n  margin-left: 20px;\n  width: 50px;\n  height: 50px;\n  z-index: 1000;\n  border-radius: 50%;\n  background-color: #6561ab;\n  box-shadow: 50%;\n  margin-top: 40px; }\n\n.menuBtn {\n  height: 30px;\n  width: 30px;\n  color: white; }\n\n.mainMenu {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 450px;\n  height: 1080px;\n  background-color: white;\n  z-index: 100;\n  margin-bottom: 20px;\n  border-radius: 15px;\n  background: transparent;\n  box-shadow: none; }\n\n.locationIcon {\n  width: 25px;\n  margin-left: 20px;\n  margin-top: 20px;\n  display: inline-flex; }\n\n.actualLoc {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 30px;\n  margin-left: 10px; }\n\n.recoger {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 15px;\n  font-size: 12px;\n  margin-left: 10px;\n  color: gray;\n  font-weight: 100; }\n\n.destination {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 100px;\n  margin-left: 10px; }\n\n.destino {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 85px;\n  font-size: 12px;\n  margin-left: 10px;\n  color: gray;\n  font-weight: 100; }\n\n.grid-botones {\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: 0;\n  width: 260px; }\n\n.menu {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin: 0;\n  bottom: 0;\n  background-color: white;\n  z-index: 1000;\n  width: 100vw;\n  height: 220px;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.mapboxgl-ctrl-geocoder {\n  margin-top: 100px !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvbG9jYXRpby1tYXJrZXIvbG9jYXRpby1tYXJrZXIucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixPQUFNO0VBQ04sUUFBTztFQUNQLFlBQVk7RUFDWixtQkFBbUIsRUFBQTs7QUFHckI7RUFDRSxlQUFlO0VBQ2YsY0FBeUI7RUFDekIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixPQUFPO0VBQ1AsUUFBUTtFQUNSLGdCQUFnQjtFQUNoQixrQkFBa0I7RUFDbEIsa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0UsV0FBVTtFQUNWLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsWUFBWTtFQUNaLGtCQUFrQixFQUFBOztBQUdwQjtFQUNFLHlCQUFvQztFQUNwQyxrQkFBa0I7RUFDbEIsV0FBVztFQUNYLFlBQVk7RUFDWixvQkFBZ0IsRUFBQTs7QUFHaEI7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLFdBQVU7RUFDVixZQUFXO0VBQ1gsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsZUFBZTtFQUNmLGdCQUFnQixFQUFBOztBQUdsQjtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsWUFBWSxFQUFBOztBQUdkO0VBQ0Usa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsY0FBYztFQUNkLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsb0JBQW9CLEVBQUE7O0FBSXRCO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsaUJBQWlCLEVBQUE7O0FBR25CO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsaUJBQWlCLEVBQUE7O0FBR25CO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNwQixPQUFPO0VBQ1AsUUFBUTtFQUNSLFlBQVksRUFBQTs7QUFHWjtFQUNFLGtCQUFrQjtFQUNsQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsU0FBUztFQUNULFNBQVM7RUFDVCx1QkFBdUI7RUFDdkIsYUFBYTtFQUNiLFlBQVk7RUFDWixhQUFhO0VBQ2IsNEJBQTRCO0VBQzVCLDZCQUE2QixFQUFBOztBQUtoQztFQUNFLDRCQUE0QixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9jYXRpby1tYXJrZXIvbG9jYXRpby1tYXJrZXIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNvbGljaXRhcntcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbGVmdDowO1xuICByaWdodDowO1xuICB3aWR0aDogMTcwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG59XG5cbi50aXR1bG8tZGVzdGlub3tcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogcmdiKDE4NywgMTgxLCAxODEpO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5pbnN0cnVjY2lvbmVze1xuICBjb2xvcjpncmF5O1xuICBmb250LXNpemU6IDEzcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiA1cHg7XG59XG5cbi5pbnB1dC1kZXN0aW5ve1xuICBib3JkZXI6IHNvbGlkIDFweCByZ2IoMjEyLCAyMDgsIDIwOCk7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG59XG5cbiAgLmJvdG9ue1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcbiAgICB3aWR0aDo1MHB4O1xuICAgIGhlaWdodDo1MHB4O1xuICAgIHotaW5kZXg6IDEwMDA7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM2NTYxYWI7XG4gICAgYm94LXNoYWRvdzogNTAlO1xuICAgIG1hcmdpbi10b3A6IDQwcHg7XG4gIH1cblxuICAubWVudUJ0bntcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgd2lkdGg6IDMwcHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG5cbiAgLm1haW5NZW51e1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OjA7XG4gICAgcmlnaHQ6MDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgbWFyZ2luLXRvcDogNDUwcHg7XG4gICAgaGVpZ2h0OiAxMDgwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgei1pbmRleDogMTAwO1xuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTVweDtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICB9XG5cbiAgLmxvY2F0aW9uSWNvbntcbiAgICB3aWR0aDogMjVweDtcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXG4gIH1cblxuICAuYWN0dWFsTG9je1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW4tdG9wOiAzMHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICB9XG5cbiAgLnJlY29nZXJ7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbi10b3A6IDE1cHg7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgIGNvbG9yOiBncmF5O1xuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XG4gIH1cblxuICAuZGVzdGluYXRpb257XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbi10b3A6IDEwMHB4O1xuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICB9XG5cbiAgLmRlc3Rpbm97XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbi10b3A6IDg1cHg7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgIGNvbG9yOiBncmF5O1xuICAgIGZvbnQtd2VpZ2h0OiAxMDA7XG4gIH1cblxuICAuZ3JpZC1ib3RvbmVze1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHdpZHRoOiAyNjBweDtcbiAgfVxuXG4gIC5tZW51e1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OjA7XG4gICAgcmlnaHQ6MDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIHdpZHRoOiAxMDB2dztcbiAgICBoZWlnaHQ6IDIyMHB4O1xuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDA7XG5cbiAgfVxuIC8vaW50ZW50b1xuXG4gLm1hcGJveGdsLWN0cmwtZ2VvY29kZXIge1xuICAgbWFyZ2luLXRvcDogMTAwcHggIWltcG9ydGFudDtcbiB9Il19 */"

/***/ }),

/***/ "./src/app/locatio-marker/locatio-marker.page.ts":
/*!*******************************************************!*\
  !*** ./src/app/locatio-marker/locatio-marker.page.ts ***!
  \*******************************************************/
/*! exports provided: LocatioMarkerPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocatioMarkerPage", function() { return LocatioMarkerPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var _popovergrua_popovergrua_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../popovergrua/popovergrua.component */ "./src/app/popovergrua/popovergrua.component.ts");
/* harmony import */ var _mapbox_mapbox_gl_directions_dist_mapbox_gl_directions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mapbox/mapbox-gl-directions/dist/mapbox-gl-directions */ "./node_modules/@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js");
/* harmony import */ var _mapbox_mapbox_gl_directions_dist_mapbox_gl_directions__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mapbox_mapbox_gl_directions_dist_mapbox_gl_directions__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");













//let mapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');
var MapboxGeocoder = __webpack_require__(/*! @mapbox/mapbox-gl-geocoder */ "./node_modules/@mapbox/mapbox-gl-geocoder/lib/index.js");
var LocatioMarkerPage = /** @class */ (function () {
    function LocatioMarkerPage(menu, nav, gruprovider, nativePageTransitions, popover, geolocation, alertCtrl, location) {
        this.menu = menu;
        this.nav = nav;
        this.gruprovider = gruprovider;
        this.nativePageTransitions = nativePageTransitions;
        this.popover = popover;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.location = location;
        this.destino = "";
        this.endingP = false;
        this.service = this.gruprovider.service; //igualando lo que esta en el provider
        mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["accessToken"] = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';
    }
    LocatioMarkerPage.prototype.ngOnInit = function () {
        this.loadMap();
        this.start = [this.gruprovider.long, this.gruprovider.lat];
    };
    LocatioMarkerPage.prototype.ngOnDestroy = function () {
        this.map1.remove();
    };
    LocatioMarkerPage.prototype.setDestino = function () {
        this.destination = this.mapboxDirections.setDestination(this.destino);
        this.distanceEquation();
    };
    //carga el mapa y le añade todos los atributos
    LocatioMarkerPage.prototype.loadMap = function () {
        var _this = this;
        this.map1 = new mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["Map"]({
            container: 'map1',
            style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5'
        }); //añadir el mapa
        this.map1.dragRotate.disable(); //evita que el mapa rote
        var geolocate = new mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["GeolocateControl"]({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }); //punto azul de localización actual del usuario
        this.map1.addControl(geolocate); //añade el control (cuadro) 
        this.mapboxDirections = new _mapbox_mapbox_gl_directions_dist_mapbox_gl_directions__WEBPACK_IMPORTED_MODULE_7___default.a({
            accessToken: mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["accessToken"],
            unit: 'metric',
            profile: 'mapbox/driving',
            controls: {
                profileSwitcher: false,
                instructions: false,
                inputs: false
            }
        }); //atributo de añadir direcciones al mapa 
        this.map1.addControl(this.mapboxDirections, 'bottom-left'); //añade control de las direcciones
        this.geolocation.getCurrentPosition().then(function (resp) {
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        var self = this; //scope
        this.map1.on('load', function () {
            self.mapboxDirections.setOrigin([self.gruprovider.long, self.gruprovider.lat]); //latitud y longitud de la ubicacion actual
            geolocate.trigger();
        });
        console.log("Map finished loading");
        console.log(this.destino);
        this.mapboxDirections.on("route", function (e) {
            var routes = e.route;
            _this.gruprovider.time = Math.ceil(routes[0].duration / 60);
            // Each route object has a distance property
            _this.distance = Math.ceil(routes[0].distance * 0.00062137);
            _this.gruprovider.distance = _this.distance; //guarda distancia (MILLAS)
            _this.gruprovider.destination = _this.destino; //guarda destino (PUNTOP B)
            console.log("Route lengths", routes);
            console.log('Millas', _this.distance);
            console.log(_this.time);
        });
    };
    //**navegar para pagina principal**
    LocatioMarkerPage.prototype.navigate = function () {
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
    //**/funcion que cambia el servicio**
    LocatioMarkerPage.prototype.changePage = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                if (this.mapboxDirections.getDestination().geometry == null) {
                    console.log("no puedes pasar");
                    this.emptyDestinou();
                    return [2 /*return*/];
                }
                console.log(this.mapboxDirections.getOrigin()); //extrae el origen de la ruta
                console.log(this.mapboxDirections.getDestination()); //extrae el destino de la ruta
                this.gruprovider.service = this.service;
                this.gruprovider.destination = this.mapboxDirections.getDestination().geometry.coordinates; //coordenadas del punto B(destino) en un array
                console.log("LEGS: " + this.mapboxDirections.getDestination().routes);
                this.distanceEquation();
                if (this.gruprovider.service == 'Servicio Especial') {
                    this.nav.navigateRoot("/escoger-carro");
                }
                else {
                    this.presentPopover();
                }
                return [2 /*return*/];
            });
        });
    };
    //Funcion ejecutada al momento de seleccionar el boton de Solicitar
    LocatioMarkerPage.prototype.presentPopover = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var popover;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popover.create({
                            component: _popovergrua_popovergrua_component__WEBPACK_IMPORTED_MODULE_6__["PopovergruaComponent"],
                            translucent: false
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
    //transiciones de las paginas
    LocatioMarkerPage.prototype.transition = function () {
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
    //Alerta cuando el usario no ha especificado un destino
    LocatioMarkerPage.prototype.emptyDestinou = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: '¡ALERTA!',
                            message: 'No ha especificado un destino.',
                            buttons: [{
                                    text: 'OK',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                        //this.popController.dismiss();
                                        //this.nav.navigateRoot("/sidemenu");
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
    //Funcion que calcula el costo de distancia por millas 
    LocatioMarkerPage.prototype.distanceEquation = function () {
        this.gruprovider.precioMilla = (this.distance * 3);
        this.distanceCost = (this.distance * 3) + this.gruprovider.price; //multiplica $3 x total de millas
        this.gruprovider.total = this.distanceCost;
        console.log(this.gruprovider.total);
    };
    LocatioMarkerPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-locatio-marker',
            template: __webpack_require__(/*! ./locatio-marker.page.html */ "./src/app/locatio-marker/locatio-marker.page.html"),
            styles: [__webpack_require__(/*! ./locatio-marker.page.scss */ "./src/app/locatio-marker/locatio-marker.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["MenuController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__["GruproviderService"],
            _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_5__["NativePageTransitions"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"],
            _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_8__["Geolocation"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"]])
    ], LocatioMarkerPage);
    return LocatioMarkerPage;
}());



/***/ })

}]);
//# sourceMappingURL=locatio-marker-locatio-marker-module.js.map
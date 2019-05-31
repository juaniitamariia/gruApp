(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["change-location-change-location-module"],{

/***/ "./src/app/change-location/change-location.module.ts":
/*!***********************************************************!*\
  !*** ./src/app/change-location/change-location.module.ts ***!
  \***********************************************************/
/*! exports provided: ChangeLocationPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeLocationPageModule", function() { return ChangeLocationPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _change_location_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./change-location.page */ "./src/app/change-location/change-location.page.ts");







var routes = [
    {
        path: '',
        component: _change_location_page__WEBPACK_IMPORTED_MODULE_6__["ChangeLocationPage"]
    }
];
var ChangeLocationPageModule = /** @class */ (function () {
    function ChangeLocationPageModule() {
    }
    ChangeLocationPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_change_location_page__WEBPACK_IMPORTED_MODULE_6__["ChangeLocationPage"]]
        })
    ], ChangeLocationPageModule);
    return ChangeLocationPageModule;
}());



/***/ }),

/***/ "./src/app/change-location/change-location.page.html":
/*!***********************************************************!*\
  !*** ./src/app/change-location/change-location.page.html ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"boton\" (click)='navigate()'>\n  <ion-icon style=\"color:white\" name=\"ios-arrow-back\" class=menuBtn></ion-icon>\n</button>\n\n<!-- <ion-card class=mainMenu>\n      <ion-img class=locationIcon src= \"assets/locationicon.svg\"></ion-img>\n      <h6 class=actualLoc>Mi ubicación actual</h6> user's location viewport -->\n<!-- <h6 class=recoger>RECOGER</h6> -->\n<!-- <ion-input [(ngModel)]=\"destino\" (change)=\"setDestino()\" class=destination placeholder='DESTINO'></ion-input> destination viewport -->\n\n<ion-card class=menu>\n  <h6 class=\"instrucciones\">ESCRIBA O MARQUE EL LUGAR A DONDE QUIERE IR LUEGO DE SER ASISTIDO POR EL GRUERO</h6>\n  <p class=\"titulo-destino\">DESTINO <span *ngIf=\"this.distance != null\"\n      style=\"font-weight: bold; color: black;\">{{this.distance}} millas</span></p>\n  <ion-row style=\"margin-left: 5px; margin-right: 5px;\">\n    <ion-col size=\"10\">\n      <ion-input [(ngModel)]='destino' class=\"input-destino\" placeholder=\"Ej. Calle Hiedra, Cidra Puerto Rico.\"></ion-input>\n    </ion-col> <!-- (ngModelChange)=\"loadMap()\" -->\n    <ion-col size=\"2\">\n      <ion-button (click)=\"setDestino()\">\n        <ion-icon name=\"pin\"></ion-icon>\n      </ion-button>\n    </ion-col>\n  </ion-row>\n  <ion-grid class=\"grid-botones\">\n    <ion-row>\n      <ion-col>\n        <ion-button class=\"solicitar\" expand=\"block\" (click)=\"changePage()\">Solicitar</ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-card>\n\n\n<!-- Map view -->\n<ion-header>\n\n  <meta charset='utf-8' />\n  <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />\n  <div id='changeMap' style='width: 100%; height: 80vh;'></div>\n  <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>\n  <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />\n  <style>\n    body {\n      margin: 0;\n      padding: 0;\n    }\n\n    #map {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      width: 100%;\n    }\n  </style>\n\n\n</ion-header>"

/***/ }),

/***/ "./src/app/change-location/change-location.page.scss":
/*!***********************************************************!*\
  !*** ./src/app/change-location/change-location.page.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".solicitar {\n  margin-right: auto;\n  margin-left: auto;\n  left: 0;\n  right: 0;\n  width: 170px;\n  margin-bottom: 10px; }\n\n.titulo-destino {\n  font-size: 12px;\n  color: #bbb5b5;\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: 0;\n  margin-top: 20px;\n  margin-bottom: 5px;\n  text-align: center; }\n\n.instrucciones {\n  color: gray;\n  font-size: 13px;\n  text-align: center;\n  margin: 20px;\n  margin-bottom: 5px; }\n\n.input-destino {\n  border: solid 1px #d4d0d0;\n  border-radius: 5px;\n  width: 100%;\n  height: 100%;\n  --padding-start: 8px; }\n\n.boton {\n  position: absolute;\n  margin-left: 20px;\n  width: 50px;\n  height: 50px;\n  z-index: 1000;\n  border-radius: 50%;\n  background-color: #6561ab;\n  box-shadow: 50%;\n  margin-top: 40px; }\n\n.menuBtn {\n  height: 30px;\n  width: 30px;\n  color: white; }\n\n.mainMenu {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 450px;\n  height: 1080px;\n  background-color: white;\n  z-index: 100;\n  margin-bottom: 20px;\n  border-radius: 15px;\n  background: transparent;\n  box-shadow: none; }\n\n.locationIcon {\n  width: 25px;\n  margin-left: 20px;\n  margin-top: 20px;\n  display: inline-flex; }\n\n.actualLoc {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 30px;\n  margin-left: 10px; }\n\n.recoger {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 15px;\n  font-size: 12px;\n  margin-left: 10px;\n  color: gray;\n  font-weight: 100; }\n\n.destination {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 100px;\n  margin-left: 10px; }\n\n.destino {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 85px;\n  font-size: 12px;\n  margin-left: 10px;\n  color: gray;\n  font-weight: 100; }\n\n.grid-botones {\n  margin-left: auto;\n  margin-right: auto;\n  left: 0;\n  right: 0;\n  width: 260px; }\n\n.menu {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin: 0;\n  bottom: 0;\n  background-color: white;\n  z-index: 1000;\n  width: 100vw;\n  height: 220px;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.mapboxgl-ctrl-geocoder {\n  margin-top: 100px !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvY2hhbmdlLWxvY2F0aW9uL2NoYW5nZS1sb2NhdGlvbi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLE9BQU07RUFDTixRQUFPO0VBQ1AsWUFBWTtFQUNaLG1CQUFtQixFQUFBOztBQUdyQjtFQUNFLGVBQWU7RUFDZixjQUF5QjtFQUN6QixpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLE9BQU87RUFDUCxRQUFRO0VBQ1IsZ0JBQWdCO0VBQ2hCLGtCQUFrQjtFQUNsQixrQkFBa0IsRUFBQTs7QUFHcEI7RUFDRSxXQUFVO0VBQ1YsZUFBZTtFQUNmLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osa0JBQWtCLEVBQUE7O0FBR3BCO0VBQ0UseUJBQW9DO0VBQ3BDLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsWUFBWTtFQUNaLG9CQUFnQixFQUFBOztBQUdoQjtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsV0FBVTtFQUNWLFlBQVc7RUFDWCxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixlQUFlO0VBQ2YsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxZQUFZLEVBQUE7O0FBR2Q7RUFDRSxrQkFBa0I7RUFDbEIsT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2QsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixtQkFBbUI7RUFDbkIsbUJBQW1CO0VBQ25CLHVCQUF1QjtFQUN2QixnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxXQUFXO0VBQ1gsaUJBQWlCO0VBQ2pCLGdCQUFnQjtFQUNoQixvQkFBb0IsRUFBQTs7QUFJdEI7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixpQkFBaUIsRUFBQTs7QUFHbkI7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQixpQkFBaUIsRUFBQTs7QUFHbkI7RUFDRSxvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixlQUFlO0VBQ2YsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxnQkFBZ0IsRUFBQTs7QUFHbEI7RUFDRSxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ3BCLE9BQU87RUFDUCxRQUFRO0VBQ1IsWUFBWSxFQUFBOztBQUdaO0VBQ0Usa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsU0FBUztFQUNULHVCQUF1QjtFQUN2QixhQUFhO0VBQ2IsWUFBWTtFQUNaLGFBQWE7RUFDYiw0QkFBNEI7RUFDNUIsNkJBQTZCLEVBQUE7O0FBS2hDO0VBQ0UsNEJBQTRCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9jaGFuZ2UtbG9jYXRpb24vY2hhbmdlLWxvY2F0aW9uLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5zb2xpY2l0YXJ7XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIHdpZHRoOiAxNzBweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICB9XG4gIFxuICAudGl0dWxvLWRlc3Rpbm97XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGNvbG9yOiByZ2IoMTg3LCAxODEsIDE4MSk7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICBtYXJnaW4tYm90dG9tOiA1cHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG4gIFxuICAuaW5zdHJ1Y2Npb25lc3tcbiAgICBjb2xvcjpncmF5O1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luOiAyMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDVweDtcbiAgfVxuICBcbiAgLmlucHV0LWRlc3Rpbm97XG4gICAgYm9yZGVyOiBzb2xpZCAxcHggcmdiKDIxMiwgMjA4LCAyMDgpO1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gIH1cbiAgXG4gICAgLmJvdG9ue1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gICAgICB3aWR0aDo1MHB4O1xuICAgICAgaGVpZ2h0OjUwcHg7XG4gICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzY1NjFhYjtcbiAgICAgIGJveC1zaGFkb3c6IDUwJTtcbiAgICAgIG1hcmdpbi10b3A6IDQwcHg7XG4gICAgfVxuICBcbiAgICAubWVudUJ0bntcbiAgICAgIGhlaWdodDogMzBweDtcbiAgICAgIHdpZHRoOiAzMHB4O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgIH1cbiAgXG4gICAgLm1haW5NZW51e1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDowO1xuICAgICAgcmlnaHQ6MDtcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICAgbWFyZ2luLXRvcDogNDUwcHg7XG4gICAgICBoZWlnaHQ6IDEwODBweDtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgICAgei1pbmRleDogMTAwO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgfVxuICBcbiAgICAubG9jYXRpb25JY29ue1xuICAgICAgd2lkdGg6IDI1cHg7XG4gICAgICBtYXJnaW4tbGVmdDogMjBweDtcbiAgICAgIG1hcmdpbi10b3A6IDIwcHg7XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgXG4gICAgfVxuICBcbiAgICAuYWN0dWFsTG9je1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBtYXJnaW4tdG9wOiAzMHB4O1xuICAgICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgfVxuICBcbiAgICAucmVjb2dlcntcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbWFyZ2luLXRvcDogMTVweDtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgICAgY29sb3I6IGdyYXk7XG4gICAgICBmb250LXdlaWdodDogMTAwO1xuICAgIH1cbiAgXG4gICAgLmRlc3RpbmF0aW9ue1xuICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBtYXJnaW4tdG9wOiAxMDBweDtcbiAgICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xuICAgIH1cbiAgXG4gICAgLmRlc3Rpbm97XG4gICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIG1hcmdpbi10b3A6IDg1cHg7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICAgIGNvbG9yOiBncmF5O1xuICAgICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgICB9XG4gIFxuICAgIC5ncmlkLWJvdG9uZXN7XG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHdpZHRoOiAyNjBweDtcbiAgICB9XG4gIFxuICAgIC5tZW51e1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDowO1xuICAgICAgcmlnaHQ6MDtcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgYm90dG9tOiAwO1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgICB6LWluZGV4OiAxMDAwO1xuICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgaGVpZ2h0OiAyMjBweDtcbiAgICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XG4gICAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDtcbiAgXG4gICAgfVxuICAgLy9pbnRlbnRvXG4gIFxuICAgLm1hcGJveGdsLWN0cmwtZ2VvY29kZXIge1xuICAgICBtYXJnaW4tdG9wOiAxMDBweCAhaW1wb3J0YW50O1xuICAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/change-location/change-location.page.ts":
/*!*********************************************************!*\
  !*** ./src/app/change-location/change-location.page.ts ***!
  \*********************************************************/
/*! exports provided: ChangeLocationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangeLocationPage", function() { return ChangeLocationPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var _popover_description_popover_description_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../popover-description/popover-description.component */ "./src/app/popover-description/popover-description.component.ts");
/* harmony import */ var _mapbox_mapbox_gl_directions_dist_mapbox_gl_directions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @mapbox/mapbox-gl-directions/dist/mapbox-gl-directions */ "./node_modules/@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js");
/* harmony import */ var _mapbox_mapbox_gl_directions_dist_mapbox_gl_directions__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_mapbox_mapbox_gl_directions_dist_mapbox_gl_directions__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_10__);














var MapboxGeocoder = __webpack_require__(/*! @mapbox/mapbox-gl-geocoder */ "./node_modules/@mapbox/mapbox-gl-geocoder/lib/index.js");
var ChangeLocationPage = /** @class */ (function () {
    function ChangeLocationPage(menu, nav, gruprovider, nativePageTransitions, popover, popoverDescription, geolocation, alertCtrl, location) {
        this.menu = menu;
        this.nav = nav;
        this.gruprovider = gruprovider;
        this.nativePageTransitions = nativePageTransitions;
        this.popover = popover;
        this.popoverDescription = popoverDescription;
        this.geolocation = geolocation;
        this.alertCtrl = alertCtrl;
        this.location = location;
        this.destino = "";
        this.endingP = false;
    }
    ChangeLocationPage.prototype.ngOnInit = function () {
        this.loadMap();
        this.start = [this.gruprovider.long, this.gruprovider.lat];
    };
    ChangeLocationPage.prototype.ngOnDestroy = function () {
        this.changeMap.remove();
    };
    ChangeLocationPage.prototype.setDestino = function () {
        this.destination = this.mapboxDirections.setDestination(this.destino);
        this.distanceEquation();
    };
    ChangeLocationPage.prototype.loadMap = function () {
        var _this = this;
        this.changeMap = new mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["Map"]({
            container: 'changeMap',
            style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5'
        }); //añadir el mapa
        this.changeMap.dragRotate.disable(); //evita que el mapa rote
        var geolocate = new mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["GeolocateControl"]({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }); //punto azul de localización actual del usuario
        this.changeMap.addControl(geolocate); //añade el control (cuadro) 
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
        this.changeMap.addControl(this.mapboxDirections, 'bottom-left'); //añade control de las direcciones
        this.geolocation.getCurrentPosition().then(function (resp) {
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        var self = this; //scope
        this.changeMap.on('load', function () {
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
    ChangeLocationPage.prototype.navigate = function () {
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
    //Alerta cuando el usario no ha especificado un destino
    ChangeLocationPage.prototype.emptyDestinou = function () {
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
    //**/funcion que cambia el servicio**
    ChangeLocationPage.prototype.changePage = function () {
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
    ChangeLocationPage.prototype.presentPopover = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var popover;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popover.create({
                            component: _popover_description_popover_description_component__WEBPACK_IMPORTED_MODULE_6__["PopoverDescriptionComponent"],
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
    //Funcion que calcula el costo de distancia por millas 
    ChangeLocationPage.prototype.distanceEquation = function () {
        this.gruprovider.precioMilla = (this.distance * 3);
        console.log("Precio Milla:", this.gruprovider.precioMilla);
        this.distanceCost = (this.distance * 3) + this.gruprovider.price; //multiplica $3 x total de millas
        console.log(this.distanceCost);
        this.gruprovider.total = this.gruprovider.precioMilla;
        console.log(this.gruprovider.total);
        console.log(this.gruprovider.serviceId);
        if (this.gruprovider.total != null) {
            console.log("Entrando al condicional");
            parse__WEBPACK_IMPORTED_MODULE_10__["Cloud"].run('updateServicePrice', {
                serviceId: this.gruprovider.serviceId,
                servicePrice: this.gruprovider.total
            }).then(function (result) {
                console.log(result);
            }, function (error) {
                console.log(error);
            });
        }
    };
    ChangeLocationPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-change-location',
            template: __webpack_require__(/*! ./change-location.page.html */ "./src/app/change-location/change-location.page.html"),
            styles: [__webpack_require__(/*! ./change-location.page.scss */ "./src/app/change-location/change-location.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["MenuController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__["GruproviderService"],
            _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_5__["NativePageTransitions"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"],
            _popover_description_popover_description_component__WEBPACK_IMPORTED_MODULE_6__["PopoverDescriptionComponent"], _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_8__["Geolocation"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["Location"]])
    ], ChangeLocationPage);
    return ChangeLocationPage;
}());



/***/ })

}]);
//# sourceMappingURL=change-location-change-location-module.js.map
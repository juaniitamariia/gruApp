(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["locationon-locationon-module"],{

/***/ "./src/app/locationon/locationon.module.ts":
/*!*************************************************!*\
  !*** ./src/app/locationon/locationon.module.ts ***!
  \*************************************************/
/*! exports provided: LocationonPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationonPageModule", function() { return LocationonPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _locationon_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./locationon.page */ "./src/app/locationon/locationon.page.ts");







var routes = [
    {
        path: '',
        component: _locationon_page__WEBPACK_IMPORTED_MODULE_6__["LocationonPage"]
    }
];
var LocationonPageModule = /** @class */ (function () {
    function LocationonPageModule() {
    }
    LocationonPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_locationon_page__WEBPACK_IMPORTED_MODULE_6__["LocationonPage"]]
        })
    ], LocationonPageModule);
    return LocationonPageModule;
}());



/***/ }),

/***/ "./src/app/locationon/locationon.page.html":
/*!*************************************************!*\
  !*** ./src/app/locationon/locationon.page.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n\n  <ion-img class=fotolocation position=\"center\"  src=\"assets/locationart.png\"></ion-img>\n<div class= text>\n  <h1 class=\"title\">¡Hola, un placer conocerte!</h1>\n  <p style=\"text-align: center; font-size: 20px; color:lightgray; font-weight: 300;\">Para poder utilizar esta aplicación debes darnos permiso a tu ubicación.</p>\n</div>\n\n<ion-button margin=20px expand=\"block\" fill= \"outline\" (click)=\"enableLocation()\">Usar mi ubicación actual</ion-button>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/locationon/locationon.page.scss":
/*!*************************************************!*\
  !*** ./src/app/locationon/locationon.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".fotolocation {\n  width: 100% !important;\n  height: auto;\n  -o-object-fit: cover;\n     object-fit: cover;\n  padding: 0;\n  margin-top: 120px; }\n\n.title {\n  left: 0;\n  right: 0;\n  font-size: 40px;\n  font-weight: 100;\n  text-align: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvbG9jYXRpb25vbi9sb2NhdGlvbm9uLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHNCQUFzQjtFQUN0QixZQUFZO0VBQ1osb0JBQWlCO0tBQWpCLGlCQUFpQjtFQUNqQixVQUFVO0VBQ1YsaUJBQWlCLEVBQUE7O0FBR3JCO0VBQ0ksT0FBTztFQUNQLFFBQU87RUFDUCxlQUFlO0VBQ2YsZ0JBQWdCO0VBQ2hCLGtCQUFrQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbG9jYXRpb25vbi9sb2NhdGlvbm9uLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mb3RvbG9jYXRpb257XG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW4tdG9wOiAxMjBweDtcbn1cblxuLnRpdGxle1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6MDtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIFxufSJdfQ== */"

/***/ }),

/***/ "./src/app/locationon/locationon.page.ts":
/*!***********************************************!*\
  !*** ./src/app/locationon/locationon.page.ts ***!
  \***********************************************/
/*! exports provided: LocationonPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationonPage", function() { return LocationonPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/location-accuracy/ngx */ "./node_modules/@ionic-native/location-accuracy/ngx/index.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");








var LocationonPage = /** @class */ (function () {
    function LocationonPage(nav, locationAccuracy, geolocation, gruprovider, nativePageTransitions) {
        this.nav = nav;
        this.locationAccuracy = locationAccuracy;
        this.geolocation = geolocation;
        this.gruprovider = gruprovider;
        this.nativePageTransitions = nativePageTransitions;
        this.map = this.gruprovider.map;
        this.mapboxgl = this.gruprovider.mapboxgl;
    }
    LocationonPage.prototype.ngOnInit = function () {
    };
    LocationonPage.prototype.loadMap = function () {
        this.map = new mapbox_gl__WEBPACK_IMPORTED_MODULE_5__["Map"]({
            container: 'map',
            style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',
        });
    };
    LocationonPage.prototype.enableLocation = function () {
        var _this = this;
        this.locationAccuracy.canRequest().then(function (canRequest) {
            if (canRequest) {
                // the accuracy option will be ignored by iOS
                _this.locationAccuracy.request(_this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(function () { return console.log('Request successful'); }, function (error) { return console.log('Error requesting location permissions', error); });
            }
        });
        this.geolocation.getCurrentPosition().then(function (resp) {
            // resp.coords.latitude
            // resp.coords.longitude
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        var watch = this.geolocation.watchPosition();
        watch.subscribe(function (data) {
            // data can be a set of coordinates, or an error (if an error occurred).
            // data.coords.latitude
            // data.coords.longitude
        });
        console.log("location enabled");
        this.navigate();
    };
    LocationonPage.prototype.navigate = function () {
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
        this.nav.navigateRoot('/registro');
    };
    LocationonPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-locationon',
            template: __webpack_require__(/*! ./locationon.page.html */ "./src/app/locationon/locationon.page.html"),
            styles: [__webpack_require__(/*! ./locationon.page.scss */ "./src/app/locationon/locationon.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"], _ionic_native_location_accuracy_ngx__WEBPACK_IMPORTED_MODULE_3__["LocationAccuracy"], _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_4__["Geolocation"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_6__["GruproviderService"], _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_7__["NativePageTransitions"]])
    ], LocationonPage);
    return LocationonPage;
}());



/***/ })

}]);
//# sourceMappingURL=locationon-locationon-module.js.map
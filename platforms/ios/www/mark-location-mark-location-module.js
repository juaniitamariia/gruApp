(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mark-location-mark-location-module"],{

/***/ "./src/app/mark-location/mark-location.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/mark-location/mark-location.module.ts ***!
  \*******************************************************/
/*! exports provided: MarkLocationPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkLocationPageModule", function() { return MarkLocationPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _mark_location_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mark-location.page */ "./src/app/mark-location/mark-location.page.ts");







var routes = [
    {
        path: '',
        component: _mark_location_page__WEBPACK_IMPORTED_MODULE_6__["MarkLocationPage"]
    }
];
var MarkLocationPageModule = /** @class */ (function () {
    function MarkLocationPageModule() {
    }
    MarkLocationPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_mark_location_page__WEBPACK_IMPORTED_MODULE_6__["MarkLocationPage"]]
        })
    ], MarkLocationPageModule);
    return MarkLocationPageModule;
}());



/***/ }),

/***/ "./src/app/mark-location/mark-location.page.html":
/*!*******************************************************!*\
  !*** ./src/app/mark-location/mark-location.page.html ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<button class=\"boton\" (click)='navigate()'><ion-icon style=\"color:white;\" name=\"ios-arrow-back\" class=menuBtn></ion-icon></button>\n\n  <ion-card class=mainMenu>\n      <ion-img class=locationIcon src= \"assets/your-location.png\"></ion-img>\n      <h6 class=actualLoc>Mi ubicación actual</h6> <!-- user's location viewport -->\n      \n      <ion-button style=\"margin-bottom: 20px; margin-top: 20px; margin-left: 15px; margin-right: 15px;\" expand=\"block\" (click)=\"changePage()\">Solicitar</ion-button>\n  </ion-card>\n\n<!-- Map view -->\n<ion-header>\n \n    <meta charset='utf-8' />\n    <meta name='viewport' content='initial-scale=1,maximum-scale=1,user-scalable=no' />\n    <div  id='mapMark' style='width: 100%; height: 100vh;'>  \n      </div>\n\n    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.js'></script>\n    <link href='https://api.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css' rel='stylesheet' />\n\n    <style>\n            body { margin:0; padding:0; }\n            #map { position:absolute; top:0; bottom:0; width:100%; }\n      </style>\n    \n</ion-header>\n\n<ion-content>   \n\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/mark-location/mark-location.page.scss":
/*!*******************************************************!*\
  !*** ./src/app/mark-location/mark-location.page.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".boton {\n  position: absolute;\n  margin-left: 20px;\n  width: 50px;\n  height: 50px;\n  z-index: 1000;\n  border-radius: 50%;\n  background-color: #6561ab;\n  box-shadow: 50%;\n  margin-top: 40px; }\n\n.menuBtn {\n  height: 30px;\n  width: 30px;\n  color: white; }\n\n.mainMenu {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin: 0;\n  bottom: 0;\n  background-color: white;\n  z-index: 100;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.locationIcon {\n  width: 25px;\n  margin-left: 20px;\n  margin-top: 25px;\n  display: inline-flex; }\n\n.actualLoc {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 30px;\n  margin-left: 10px; }\n\n.recoger {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 15px;\n  font-size: 12px;\n  margin-left: 10px;\n  color: gray;\n  font-weight: 100; }\n\n.destination {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 100px;\n  margin-left: 10px; }\n\n.destino {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 85px;\n  font-size: 12px;\n  margin-left: 10px;\n  color: gray;\n  font-weight: 100; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0Rlc2t0b3AvR3J1QXBwIGNvcHkgMi9zcmMvYXBwL21hcmstbG9jYXRpb24vbWFyay1sb2NhdGlvbi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLFdBQVU7RUFDVixZQUFXO0VBQ1gsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQix5QkFBeUI7RUFDekIsZUFBZTtFQUNmLGdCQUFnQixFQUFBOztBQUdsQjtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsWUFBWSxFQUFBOztBQUdkO0VBQ0Usa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsU0FBUztFQUNULHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osNEJBQTRCO0VBQzVCLDZCQUE2QixFQUFBOztBQUcvQjtFQUNFLFdBQVc7RUFDWCxpQkFBaUI7RUFDakIsZ0JBQWdCO0VBQ2hCLG9CQUFvQixFQUFBOztBQUl0QjtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGlCQUFpQixFQUFBOztBQUduQjtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsV0FBVztFQUNYLGdCQUFnQixFQUFBOztBQUdsQjtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGlCQUFpQixFQUFBOztBQUduQjtFQUNFLG9CQUFvQjtFQUNwQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLGVBQWU7RUFDZixpQkFBaUI7RUFDakIsV0FBVztFQUNYLGdCQUFnQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbWFyay1sb2NhdGlvbi9tYXJrLWxvY2F0aW9uLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5ib3RvbntcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gICAgd2lkdGg6NTBweDtcbiAgICBoZWlnaHQ6NTBweDtcbiAgICB6LWluZGV4OiAxMDAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjU2MWFiO1xuICAgIGJveC1zaGFkb3c6IDUwJTtcbiAgICBtYXJnaW4tdG9wOiA0MHB4O1xuICB9XG5cbiAgLm1lbnVCdG57XG4gICAgaGVpZ2h0OiAzMHB4O1xuICAgIHdpZHRoOiAzMHB4O1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgfVxuXG4gIC5tYWluTWVudXtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDowO1xuICAgIHJpZ2h0OjA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIG1hcmdpbjogMDtcbiAgICBib3R0b206IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgei1pbmRleDogMTAwO1xuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XG4gICAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDA7XG4gIH1cblxuICAubG9jYXRpb25JY29ue1xuICAgIHdpZHRoOiAyNXB4O1xuICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICAgIG1hcmdpbi10b3A6IDI1cHg7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG5cbiAgfVxuXG4gIC5hY3R1YWxMb2N7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbi10b3A6IDMwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIH1cblxuICAucmVjb2dlcntcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luLXRvcDogMTVweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgY29sb3I6IGdyYXk7XG4gICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgfVxuXG4gIC5kZXN0aW5hdGlvbntcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luLXRvcDogMTAwcHg7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIH1cblxuICAuZGVzdGlub3tcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luLXRvcDogODVweDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gICAgY29sb3I6IGdyYXk7XG4gICAgZm9udC13ZWlnaHQ6IDEwMDtcbiAgfVxuICBcbiAgIl19 */"

/***/ }),

/***/ "./src/app/mark-location/mark-location.page.ts":
/*!*****************************************************!*\
  !*** ./src/app/mark-location/mark-location.page.ts ***!
  \*****************************************************/
/*! exports provided: MarkLocationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MarkLocationPage", function() { return MarkLocationPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! mapbox-gl */ "./node_modules/mapbox-gl/dist/mapbox-gl.js");
/* harmony import */ var mapbox_gl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(mapbox_gl__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic-native/geolocation/ngx */ "./node_modules/@ionic-native/geolocation/ngx/index.js");









var MarkLocationPage = /** @class */ (function () {
    function MarkLocationPage(menu, nav, grupovider, nativePageTransitions, popover, geolocation) {
        this.menu = menu;
        this.nav = nav;
        this.grupovider = grupovider;
        this.nativePageTransitions = nativePageTransitions;
        this.popover = popover;
        this.geolocation = geolocation;
        this.service = this.grupovider.service; //igualando lo que esta en el provider
        mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["accessToken"] = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';
    }
    MarkLocationPage.prototype.ngOnInit = function () {
        this.loadMap();
        this.getLocation();
    };
    MarkLocationPage.prototype.loadMap = function () {
        this.mapMark = new mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["Map"]({
            container: 'mapMark',
            style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',
        });
        console.log(this.mapMark);
        this.mapMark.dragRotate.disable();
        var geolocate = new mapbox_gl__WEBPACK_IMPORTED_MODULE_4__["GeolocateControl"]({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        this.mapMark.addControl(geolocate);
        this.mapMark.on('load', function () {
            geolocate.trigger();
        });
    };
    MarkLocationPage.prototype.navigate = function () {
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
    MarkLocationPage.prototype.changePage = function () {
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
        console.log(this.service);
        this.grupovider.service = this.service;
        console.log(this.grupovider.service);
        //this.presentPopover();
        this.nav.navigateRoot("/escoger-carro");
        //service = this.grupovider.service;
        //console.log(service);
    };
    MarkLocationPage.prototype.getLocation = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.grupovider.lat = resp.coords.latitude;
            _this.grupovider.long = resp.coords.longitude;
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        console.log('Notas: ' + this.grupovider.messageNotes);
    };
    MarkLocationPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-mark-location',
            template: __webpack_require__(/*! ./mark-location.page.html */ "./src/app/mark-location/mark-location.page.html"),
            styles: [__webpack_require__(/*! ./mark-location.page.scss */ "./src/app/mark-location/mark-location.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["MenuController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__["GruproviderService"],
            _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_5__["NativePageTransitions"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["PopoverController"],
            _ionic_native_geolocation_ngx__WEBPACK_IMPORTED_MODULE_6__["Geolocation"]])
    ], MarkLocationPage);
    return MarkLocationPage;
}());



/***/ })

}]);
//# sourceMappingURL=mark-location-mark-location-module.js.map
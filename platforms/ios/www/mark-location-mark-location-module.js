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

module.exports = ".boton {\n  position: absolute;\n  margin-left: 20px;\n  width: 50px;\n  height: 50px;\n  z-index: 1000;\n  border-radius: 50%;\n  background-color: #6561ab;\n  box-shadow: 50%;\n  margin-top: 40px; }\n\n.menuBtn {\n  height: 30px;\n  width: 30px;\n  color: white; }\n\n.mainMenu {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin: 0;\n  bottom: 0;\n  background-color: white;\n  z-index: 100;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.locationIcon {\n  width: 25px;\n  margin-left: 20px;\n  margin-top: 25px;\n  display: inline-flex; }\n\n.actualLoc {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 30px;\n  margin-left: 10px; }\n\n.recoger {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 15px;\n  font-size: 12px;\n  margin-left: 10px;\n  color: gray;\n  font-weight: 100; }\n\n.destination {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 100px;\n  margin-left: 10px; }\n\n.destino {\n  display: inline-flex;\n  position: absolute;\n  margin-top: 85px;\n  font-size: 12px;\n  margin-left: 10px;\n  color: gray;\n  font-weight: 100; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvbWFyay1sb2NhdGlvbi9tYXJrLWxvY2F0aW9uLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsV0FBVTtFQUNWLFlBQVc7RUFDWCxhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLHlCQUF5QjtFQUN6QixlQUFlO0VBQ2YsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCxZQUFZLEVBQUE7O0FBR2Q7RUFDRSxrQkFBa0I7RUFDbEIsT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLFNBQVM7RUFDVCxTQUFTO0VBQ1QsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWiw0QkFBNEI7RUFDNUIsNkJBQTZCLEVBQUE7O0FBRy9CO0VBQ0UsV0FBVztFQUNYLGlCQUFpQjtFQUNqQixnQkFBZ0I7RUFDaEIsb0JBQW9CLEVBQUE7O0FBSXRCO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsaUJBQWlCLEVBQUE7O0FBR25CO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsZ0JBQWdCLEVBQUE7O0FBR2xCO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsaUJBQWlCLEVBQUE7O0FBR25CO0VBQ0Usb0JBQW9CO0VBQ3BCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsZ0JBQWdCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9tYXJrLWxvY2F0aW9uL21hcmstbG9jYXRpb24ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJvdG9ue1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW4tbGVmdDogMjBweDtcbiAgICB3aWR0aDo1MHB4O1xuICAgIGhlaWdodDo1MHB4O1xuICAgIHotaW5kZXg6IDEwMDA7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM2NTYxYWI7XG4gICAgYm94LXNoYWRvdzogNTAlO1xuICAgIG1hcmdpbi10b3A6IDQwcHg7XG4gIH1cblxuICAubWVudUJ0bntcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgd2lkdGg6IDMwcHg7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG5cbiAgLm1haW5NZW51e1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OjA7XG4gICAgcmlnaHQ6MDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgICB6LWluZGV4OiAxMDA7XG4gICAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDtcbiAgICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMDtcbiAgfVxuXG4gIC5sb2NhdGlvbkljb257XG4gICAgd2lkdGg6IDI1cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gICAgbWFyZ2luLXRvcDogMjVweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcblxuICB9XG5cbiAgLmFjdHVhbExvY3tcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luLXRvcDogMzBweDtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgfVxuXG4gIC5yZWNvZ2Vye1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW4tdG9wOiAxNXB4O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICBjb2xvcjogZ3JheTtcbiAgICBmb250LXdlaWdodDogMTAwO1xuICB9XG5cbiAgLmRlc3RpbmF0aW9ue1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW4tdG9wOiAxMDBweDtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgfVxuXG4gIC5kZXN0aW5ve1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW4tdG9wOiA4NXB4O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcbiAgICBjb2xvcjogZ3JheTtcbiAgICBmb250LXdlaWdodDogMTAwO1xuICB9XG4gIFxuICAiXX0= */"

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
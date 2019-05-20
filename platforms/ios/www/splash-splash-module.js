(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["splash-splash-module"],{

/***/ "./src/app/splash/splash.module.ts":
/*!*****************************************!*\
  !*** ./src/app/splash/splash.module.ts ***!
  \*****************************************/
/*! exports provided: SplashPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplashPageModule", function() { return SplashPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _splash_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./splash.page */ "./src/app/splash/splash.page.ts");







var routes = [
    {
        path: '',
        component: _splash_page__WEBPACK_IMPORTED_MODULE_6__["SplashPage"]
    }
];
var SplashPageModule = /** @class */ (function () {
    function SplashPageModule() {
    }
    SplashPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_splash_page__WEBPACK_IMPORTED_MODULE_6__["SplashPage"]]
        })
    ], SplashPageModule);
    return SplashPageModule;
}());



/***/ }),

/***/ "./src/app/splash/splash.page.html":
/*!*****************************************!*\
  !*** ./src/app/splash/splash.page.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n  <div class= splash>\n   \n  </div>\n  </ion-content>\n"

/***/ }),

/***/ "./src/app/splash/splash.page.scss":
/*!*****************************************!*\
  !*** ./src/app/splash/splash.page.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".splash {\n  height: 100vh;\n  background-image: url(\"/assets/gruapp.gif\");\n  background-size: cover;\n  background-position: center; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvc3BsYXNoL3NwbGFzaC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFhO0VBQ2IsMkNBQTJDO0VBQzNDLHNCQUFzQjtFQUN0QiwyQkFBMkIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3NwbGFzaC9zcGxhc2gucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNwbGFzaHtcbiAgICBoZWlnaHQ6IDEwMHZoO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi9hc3NldHMvZ3J1YXBwLmdpZlwiKTtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/splash/splash.page.ts":
/*!***************************************!*\
  !*** ./src/app/splash/splash.page.ts ***!
  \***************************************/
/*! exports provided: SplashPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SplashPage", function() { return SplashPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_4__);
// import { Component, OnInit } from '@angular/core';
// import {NavController} from '@ionic/angular';
// import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

// @Component({
//   selector: 'app-splash',
//   templateUrl: './splash.page.html',
//   styleUrls: ['./splash.page.scss'],
// })
// export class SplashPage implements OnInit {
//   constructor(public NavCtrl:NavController, private nativePageTransitions: NativePageTransitions) { }
//   ngOnInit() {
//     setTimeout(()=>{ this.goHome();},4200);
//   }
//   goHome(){
//     let options: NativeTransitionOptions = {
//       direction: 'left',
//       duration: 200,
//       slowdownfactor: -1,
//       slidePixels: 20,
//       iosdelay: 100, 
//       androiddelay: 100,
//      }
//   console.log('transition');
//    this.nativePageTransitions.fade(options);
//    console.log('transition working');
//     console.log("hey");
//     this.NavCtrl.navigateRoot("/home");
//   }
// }




var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var SplashPage = /** @class */ (function () {
    function SplashPage(NavCtrl, nativePageTransitions) {
        this.NavCtrl = NavCtrl;
        this.nativePageTransitions = nativePageTransitions;
    }
    SplashPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { _this.goHome(); }, 4200);
    };
    SplashPage.prototype.goHome = function () {
        var _this = this;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_4__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
        parse__WEBPACK_IMPORTED_MODULE_4__["User"].currentAsync().then(function (user) {
            console.log('Logged user', user);
            user != null ? _this.NavCtrl.navigateRoot('/sidemenu') : _this.NavCtrl.navigateRoot('/home');
        }, function (err) {
            console.log('Error getting logged user', err);
            var options = {
                direction: 'left',
                duration: 200,
                slowdownfactor: -1,
                slidePixels: 20,
                iosdelay: 100,
                androiddelay: 100,
            };
            _this.nativePageTransitions.slide(options);
            _this.NavCtrl.navigateRoot('/locationon');
        });
    };
    SplashPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-splash',
            template: __webpack_require__(/*! ./splash.page.html */ "./src/app/splash/splash.page.html"),
            styles: [__webpack_require__(/*! ./splash.page.scss */ "./src/app/splash/splash.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"], _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_3__["NativePageTransitions"]])
    ], SplashPage);
    return SplashPage;
}());



/***/ })

}]);
//# sourceMappingURL=splash-splash-module.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/home/home.page.ts");







var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                    {
                        path: '',
                        component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                    }
                ])
            ],
            declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]]
        })
    ], HomePageModule);
    return HomePageModule;
}());



/***/ }),

/***/ "./src/app/home/home.page.html":
/*!*************************************!*\
  !*** ./src/app/home/home.page.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-slides class= \"slide\" pager=\"true\" [options] = \"slideOpts\">\n\n    <ion-slide height = 500px >\n      <ion-card class= \"card\">\n\n          <ion-img  src=\"assets/gruapp slide 1.svg\"></ion-img>\n          <ion-card-subtitle> <br>\n           <h2>Solicitar un servicio</h2>\n          </ion-card-subtitle> <br>\n\n           <p>Desde cualquier lugar que te encuentres en la isla,\n             podrás solicitar uno de los siguientes servicios:\n             cerrajero, batería, gasolina grúa y servicio especial.</p> \n             \n      </ion-card>\n    </ion-slide>\n\n    <ion-slide>\n        <ion-card class= \"card\">\n        \n            <ion-img class=slide src=\"assets/gruapp slide 2.svg\"></ion-img>\n            <ion-card-subtitle> <br>\n             <h3>Confirmar el servicio</h3>\n            </ion-card-subtitle> <br>\n  \n             <p>Podrás confirmar el servicio solicitado, luego de haberte\n               calculado el costo dependiendo de la ubicación en la que te encuentres.</p> \n               \n            \n        </ion-card>\n    </ion-slide>\n\n    <ion-slide>\n        <ion-card class= \"card\">\n        \n            <ion-img class=slide-3-4 src=\"assets/gruappslidegrua3.png\"></ion-img>\n            <ion-card-subtitle> <br>\n             <h3>Tu servicio va de camino</h3>\n            </ion-card-subtitle> <br>\n  \n             <p>Una vez te acepten el servicios, podrás ver por dónde\n               viene la persona que te dará el servicio solicitado.</p>             \n            \n        </ion-card>\n    </ion-slide>\n\n    <ion-slide>\n        <ion-card class= \"card\">\n        \n            <ion-img class= slide position=\"center\"  src=\"assets/gruappslidelisto4.png\"></ion-img>\n            <ion-card-subtitle> <br>\n             <h2>¡Listo!</h2>\n            </ion-card-subtitle> <br>\n  \n             <p>Una vez terminado el servicio podrás evaluar el servicio brindado.</p> \n               \n               <!-- boton para comenzar y que lleva a prox pagina -->\n            <ion-button margin=20px expand=\"block\" (click)=navigate()> COMENZAR </ion-button>\n        </ion-card>\n    </ion-slide>\n\n  </ion-slides>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/home/home.page.scss":
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n  margin-top: 100px;\n  width: 100%;\n  height: 100%;\n  box-shadow: none !important; }\n\n.slides {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  height: 100%;\n  width: 100%; }\n\n.color {\n  color: #6561AB; }\n\n.splashScreen {\n  -webkit-animation-duration: 6s;\n          animation-duration: 6s;\n  height: auto;\n  width: auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVJLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsWUFBVztFQUNYLDJCQUEyQixFQUFBOztBQUkvQjtFQUNJLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixZQUFXO0VBQ1gsV0FBVyxFQUFBOztBQUtmO0VBQ0ksY0FBYyxFQUFBOztBQUdsQjtFQUNDLDhCQUFzQjtVQUF0QixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLFdBQVcsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2hvbWUvaG9tZS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZHtcbiAgICBcbiAgICBtYXJnaW4tdG9wOiAxMDBweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6MTAwJTtcbiAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG4gICBcbn1cblxuLnNsaWRlc3tcbiAgICBsZWZ0OjA7XG4gICAgcmlnaHQ6MDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgaGVpZ2h0OjEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG59XG5cblxuXG4uY29sb3J7XG4gICAgY29sb3I6ICM2NTYxQUI7XG59XG5cbi5zcGxhc2hTY3JlZW57XG4gYW5pbWF0aW9uLWR1cmF0aW9uOiA2cztcbiBoZWlnaHQ6IGF1dG87XG4gd2lkdGg6IGF1dG87XG5cbn1cblxuIl19 */"

/***/ }),

/***/ "./src/app/home/home.page.ts":
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");




var HomePage = /** @class */ (function () {
    function HomePage(nativePageTransitions, nav) {
        this.nativePageTransitions = nativePageTransitions;
        this.nav = nav;
        this.slideOpts = {
            effect: 'flip'
        };
        console.log("timer is working");
    }
    HomePage.prototype.runPage = function () {
        console.log("splash working");
    };
    HomePage.prototype.navigate = function () {
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
        this.nav.navigateRoot('/locationon');
    };
    HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.page.html */ "./src/app/home/home.page.html"),
            styles: [__webpack_require__(/*! ./home.page.scss */ "./src/app/home/home.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_2__["NativePageTransitions"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"]])
    ], HomePage);
    return HomePage;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map
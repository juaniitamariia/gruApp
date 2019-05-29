(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["rating-rating-module"],{

/***/ "./src/app/rating/rating.module.ts":
/*!*****************************************!*\
  !*** ./src/app/rating/rating.module.ts ***!
  \*****************************************/
/*! exports provided: RatingPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatingPageModule", function() { return RatingPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _rating_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rating.page */ "./src/app/rating/rating.page.ts");







var routes = [
    {
        path: '',
        component: _rating_page__WEBPACK_IMPORTED_MODULE_6__["RatingPage"]
    }
];
var RatingPageModule = /** @class */ (function () {
    function RatingPageModule() {
    }
    RatingPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            ],
            declarations: [_rating_page__WEBPACK_IMPORTED_MODULE_6__["RatingPage"]]
        })
    ], RatingPageModule);
    return RatingPageModule;
}());



/***/ }),

/***/ "./src/app/rating/rating.page.html":
/*!*****************************************!*\
  !*** ./src/app/rating/rating.page.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n        <ion-toolbar class='toolbar'>\n                <!-- <ion-button class=\"btnBack\" (click)= navigateBtn() fill=clear style=\"color:black;\"><ion-icon style=\"color: white;\" name=md-arrow-round-back></ion-icon></ion-button> -->\n                <ion-title class= center style=\"font-weight:300;\">Rating</ion-title>\n         </ion-toolbar>\n</ion-header>\n\n<ion-content>\n    <ion-img class=profilepic src=\"assets/profile.svg\"></ion-img>\n    <ion-card class=card>\n        <ion-card-content>\n\n            <h1 class=center style=\"font-weight:200; color: black; font-size: 17px; margin: 10px; margin-top: 40px;\"> Jane Doe </h1>\n            <h1 class=center style=\"font-weight:200; color: black; margin: 10px; margin-top: 30px;\"> ¿Cuál fue tu experiencia? </h1>\n            <p style=\"text-align: center; font-weight:200; color: gray; font-size: 15px;\">Tus sugerencias nos ayudará a ser mejores. ¡Esmérate!</p>\n    \n                <div class=\"center\" style=\"width: 230px; margin-top: 30px; margin-bottom: 30px;\">\n                            <ion-buttons>\n                                <ion-button [disabled]=\"readonly\" fill=\"clear\" [size]=\"size\" *ngFor=\"let current of [1, 2, 3, 4, 5]; let i = index\"\n                                (mouseover)=\"hoverRate = i + 1\" (mouseleave)=\"hoverRate = 0\">\n                                  <ion-icon slot=\"icon-only\" name=\"star\" [class.filled]=\"(i + 1 <= hoverRate || (!hoverRate && i + 1 <= rate))\"></ion-icon>\n                                </ion-button>\n                              </ion-buttons>\n                </div>\n\n                <div class=text-input>\n                    <ion-textarea [(ngModel)]='comentarios' class=input-text placeholder=\"Comentario\"></ion-textarea>\n                </div>\n\n                <ion-button (click)= validateRating() expand=block class=boton-someter>SOMETER RESEÑA</ion-button>\n\n        </ion-card-content>\n    </ion-card>\n</ion-content>\n\n\n\n"

/***/ }),

/***/ "./src/app/rating/rating.page.scss":
/*!*****************************************!*\
  !*** ./src/app/rating/rating.page.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-content {\n  --background: #6561ab; }\n\n.card {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  height: 500px;\n  background: whitesmoke;\n  margin: 20px;\n  margin-top: 100px; }\n\n.profilepic {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  z-index: 1000;\n  height: 90px;\n  margin-top: 60px; }\n\n.btnBack {\n  margin-top: 20px !important; }\n\n.center {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  text-align: center; }\n\n.toolbar {\n  --background: #6561ab;\n  --color: whitesmoke;\n  --border-width: 0px !important; }\n\n.text-input {\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  background: #ebebeb;\n  border-radius: 5px;\n  border: solid lightgray 1px;\n  height: 120px; }\n\n.boton-someter {\n  color: white;\n  left: 0;\n  right: 0;\n  position: absolute;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 20px;\n  width: 300px; }\n\nion-buttons {\n  display: flex;\n  justify-content: center; }\n\n[ion-button][disabled] {\n  opacity: 1; }\n\nion-icon {\n  color: gray; }\n\nion-icon.filled {\n  color: orange; }\n\n.input-text {\n  --padding-start:  5px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvcmF0aW5nL3JhdGluZy5wYWdlLnNjc3MiLCJzcmMvYXBwL3JhdGluZy9yYXRpbmcucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kscUJBQWEsRUFBQTs7QUFHakI7RUFDSSxrQkFBa0I7RUFDakIsT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsWUFBWTtFQUNaLGlCQUFpQixFQUFBOztBQUd0QjtFQUNJLGtCQUFrQjtFQUNsQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLFlBQVk7RUFDWixnQkFBZ0IsRUFBQTs7QUFJcEI7RUFHRSwyQkFBMkIsRUFBQTs7QUFJN0I7RUFFSSxPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsa0JBQWtCLEVBQUE7O0FBR3RCO0VBQ0UscUJBQWE7RUFDYixtQkFBUTtFQUNSLDhCQUFlLEVBQUE7O0FBSWpCO0VBQ0ksT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLG1CQUE4QjtFQUM5QixrQkFBa0I7RUFDbEIsMkJBQTJCO0VBQzNCLGFBQWEsRUFBQTs7QUFHakI7RUFDRSxZQUFZO0VBQ1osT0FBTTtFQUNOLFFBQU87RUFDUCxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsWUFBWSxFQUFBOztBQUdkO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QixFQUFBOztBQ1p6QjtFRGVFLFVBQVUsRUFBQTs7QUFFWjtFQUNFLFdBQVcsRUFBQTs7QUFFYjtFQUNFLGFBQWEsRUFBQTs7QUFHZjtFQUNFLHFCQUFnQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvcmF0aW5nL3JhdGluZy5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tY29udGVudHtcbiAgICAtLWJhY2tncm91bmQ6ICM2NTYxYWI7XG59XG5cbi5jYXJke1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgbGVmdDowO1xuICAgICByaWdodDowO1xuICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICBoZWlnaHQ6IDUwMHB4O1xuICAgICBiYWNrZ3JvdW5kOiB3aGl0ZXNtb2tlO1xuICAgICBtYXJnaW46IDIwcHg7XG4gICAgIG1hcmdpbi10b3A6IDEwMHB4O1xufVxuXG4ucHJvZmlsZXBpY3tcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDowO1xuICAgIHJpZ2h0OjA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIHotaW5kZXg6IDEwMDA7XG4gICAgaGVpZ2h0OiA5MHB4O1xuICAgIG1hcmdpbi10b3A6IDYwcHg7XG4gICAgXG59XG5cbi5idG5CYWNre1xuICAgIFxuXG4gIG1hcmdpbi10b3A6IDIwcHggIWltcG9ydGFudDtcblxufVxuXG4uY2VudGVye1xuICAvL3Bvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OjA7XG4gICAgcmlnaHQ6MDtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4udG9vbGJhcntcbiAgLS1iYWNrZ3JvdW5kOiAjNjU2MWFiO1xuICAtLWNvbG9yOiB3aGl0ZXNtb2tlO1xuICAtLWJvcmRlci13aWR0aDogMHB4ICFpbXBvcnRhbnQ7XG59XG5cblxuLnRleHQtaW5wdXR7XG4gICAgbGVmdDowO1xuICAgIHJpZ2h0OjA7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgIGJhY2tncm91bmQ6IHJnYigyMzUsIDIzNSwgMjM1KTtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgYm9yZGVyOiBzb2xpZCBsaWdodGdyYXkgMXB4O1xuICAgIGhlaWdodDogMTIwcHg7XG59XG5cbi5ib3Rvbi1zb21ldGVye1xuICBjb2xvcjogd2hpdGU7XG4gIGxlZnQ6MDtcbiAgcmlnaHQ6MDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICB3aWR0aDogMzAwcHg7XG59XG5cbmlvbi1idXR0b25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5baW9uLWJ1dHRvbl1bZGlzYWJsZWRdIHtcbiAgb3BhY2l0eTogMTtcbn1cbmlvbi1pY29uIHtcbiAgY29sb3I6IGdyYXk7XG59XG5pb24taWNvbi5maWxsZWQge1xuICBjb2xvcjogb3JhbmdlO1xufVxuXG4uaW5wdXQtdGV4dHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAgNXB4O1xufSIsImlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjNjU2MWFiOyB9XG5cbi5jYXJkIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbiAgaGVpZ2h0OiA1MDBweDtcbiAgYmFja2dyb3VuZDogd2hpdGVzbW9rZTtcbiAgbWFyZ2luOiAyMHB4O1xuICBtYXJnaW4tdG9wOiAxMDBweDsgfVxuXG4ucHJvZmlsZXBpYyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIHotaW5kZXg6IDEwMDA7XG4gIGhlaWdodDogOTBweDtcbiAgbWFyZ2luLXRvcDogNjBweDsgfVxuXG4uYnRuQmFjayB7XG4gIG1hcmdpbi10b3A6IDIwcHggIWltcG9ydGFudDsgfVxuXG4uY2VudGVyIHtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIHRleHQtYWxpZ246IGNlbnRlcjsgfVxuXG4udG9vbGJhciB7XG4gIC0tYmFja2dyb3VuZDogIzY1NjFhYjtcbiAgLS1jb2xvcjogd2hpdGVzbW9rZTtcbiAgLS1ib3JkZXItd2lkdGg6IDBweCAhaW1wb3J0YW50OyB9XG5cbi50ZXh0LWlucHV0IHtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIGJhY2tncm91bmQ6ICNlYmViZWI7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm9yZGVyOiBzb2xpZCBsaWdodGdyYXkgMXB4O1xuICBoZWlnaHQ6IDEyMHB4OyB9XG5cbi5ib3Rvbi1zb21ldGVyIHtcbiAgY29sb3I6IHdoaXRlO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICB3aWR0aDogMzAwcHg7IH1cblxuaW9uLWJ1dHRvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxuXG5baW9uLWJ1dHRvbl1bZGlzYWJsZWRdIHtcbiAgb3BhY2l0eTogMTsgfVxuXG5pb24taWNvbiB7XG4gIGNvbG9yOiBncmF5OyB9XG5cbmlvbi1pY29uLmZpbGxlZCB7XG4gIGNvbG9yOiBvcmFuZ2U7IH1cblxuLmlucHV0LXRleHQge1xuICAtLXBhZGRpbmctc3RhcnQ6ICA1cHg7IH1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/rating/rating.page.ts":
/*!***************************************!*\
  !*** ./src/app/rating/rating.page.ts ***!
  \***************************************/
/*! exports provided: RatingPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatingPage", function() { return RatingPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");






var RatingPage = /** @class */ (function () {
    function RatingPage(events, nativePageTransitions, nav, alertCtrl) {
        this.events = events;
        this.nativePageTransitions = nativePageTransitions;
        this.nav = nav;
        this.alertCtrl = alertCtrl;
    }
    RatingPage.prototype.ngOnInit = function () {
    };
    RatingPage.prototype.navigateBtn = function () {
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
    RatingPage.prototype.validateRating = function () {
        if (this.hoverRate == null) {
            this.error();
        }
        else {
            this.navigateBtn();
        }
    };
    RatingPage.prototype.error = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Error',
                            message: '¡No haz hecho tu rating!',
                            buttons: ['OK']
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
    RatingPage.prototype.saveRating = function (driver, service) {
        driver = driver.toJSON();
        service = service.toJSON();
        Parse.Cloud.run('createReview', {
            user: Parse.User.current(),
            rating: this.hoverRate,
            driverId: driver.objectId,
            serviceId: service.objectId,
            reviewContent: this.comentarios,
        }).then(function (result) {
            console.log(result);
            //this.navigate.navigateRoot('/mi-vehiculo');
        }, function (error) {
            console.log(error);
        });
    };
    RatingPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-rating',
            template: __webpack_require__(/*! ./rating.page.html */ "./src/app/rating/rating.page.html"),
            styles: [__webpack_require__(/*! ./rating.page.scss */ "./src/app/rating/rating.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__["Events"], _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_3__["NativePageTransitions"], _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["NavController"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_2__["AlertController"]])
    ], RatingPage);
    return RatingPage;
}());



/***/ })

}]);
//# sourceMappingURL=rating-rating-module.js.map
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-profile-module"],{

/***/ "./src/app/profile/profile.module.ts":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.module.ts ***!
  \*******************************************/
/*! exports provided: ProfilePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePageModule", function() { return ProfilePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _profile_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./profile.page */ "./src/app/profile/profile.page.ts");







var routes = [
    {
        path: '',
        component: _profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]
    }
];
var ProfilePageModule = /** @class */ (function () {
    function ProfilePageModule() {
    }
    ProfilePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_profile_page__WEBPACK_IMPORTED_MODULE_6__["ProfilePage"]]
        })
    ], ProfilePageModule);
    return ProfilePageModule;
}());



/***/ }),

/***/ "./src/app/profile/profile.page.html":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.page.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n  <ion-button class=\"btnBack\" (click)=navBack()>\n    <ion-icon name=\"ios-arrow-back\"></ion-icon>\n  </ion-button>\n\n\n<div class='header'>\n  <h1 padding style=\"margin-top: -3px; display: inline-flex; font-size: 40px; color: white; font-weight: 300;\">Mi Cuenta</h1>\n  \n</div>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label>Nombre</ion-label>\n      <ion-input type=\"text\" style=\"font-size: 15px; text-align: right;\" placeholder=\"{{name}}\"></ion-input>\n      <ion-button fill=clear slot=\"end\"><ion-icon name=ios-arrow-forward></ion-icon></ion-button>\n      </ion-item>\n    <ion-item>\n      <ion-label>Email</ion-label>\n      <ion-input type=\"email\" style=\"font-size: 15px; text-align: right;\" placeholder=\"{{email}}\"></ion-input>\n      <ion-button fill=clear slot=\"end\"><ion-icon name=ios-arrow-forward></ion-icon></ion-button>\n      </ion-item>\n    <ion-item>\n      <ion-label>Número de licencia</ion-label>\n      <ion-input type=\"numeric\" style=\"font-size: 15px; text-align: right;\" placeholder=\"########\"></ion-input>\n      <ion-button  fill=clear slot=\"end\"><ion-icon name=ios-arrow-forward></ion-icon></ion-button>\n      </ion-item>\n    <ion-item>\n      <ion-label>Teléfono</ion-label>\n      <ion-input type=\"tel\" style=\"font-size: 15px; text-align: right;\" placeholder=\"{{phoneNumber}}\"></ion-input>\n      <ion-button fill=clear slot=\"end\"><ion-icon name=ios-arrow-forward></ion-icon></ion-button>\n      </ion-item>\n  </ion-list>\n</ion-content>\n\n\n<ion-button (click)=navBack() class=\"addbutton\">GUARDAR</ion-button>"

/***/ }),

/***/ "./src/app/profile/profile.page.scss":
/*!*******************************************!*\
  !*** ./src/app/profile/profile.page.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  background: #6561AB;\n  box-shadow: none !important; }\n\n.logo {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 45px;\n  height: 30%;\n  box-shadow: none !important; }\n\n.btnBack {\n  z-index: 1000;\n  margin-top: 40px !important;\n  box-shadow: none !important;\n  --box-shadow: none; }\n\n.camera {\n  height: 70px; }\n\n.addbutton {\n  width: auto;\n  height: 100px;\n  background: #6561AB;\n  margin: 0px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvcHJvZmlsZS9wcm9maWxlLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG1CQUFrQjtFQUNsQiwyQkFBMkIsRUFBQTs7QUFHL0I7RUFDSSxrQkFBa0I7RUFDakIsT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixXQUFXO0VBQ1gsMkJBQTJCLEVBQUE7O0FBR2hDO0VBRUksYUFBWTtFQUNaLDJCQUEyQjtFQUMzQiwyQkFBMkI7RUFDM0Isa0JBQWEsRUFBQTs7QUFJakI7RUFDSSxZQUFZLEVBQUE7O0FBSWhCO0VBQ0ksV0FBVztFQUNYLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsV0FBVyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvcHJvZmlsZS9wcm9maWxlLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5oZWFkZXJ7XG4gICAgYmFja2dyb3VuZDojNjU2MUFCO1xuICAgIGJveC1zaGFkb3c6IG5vbmUgIWltcG9ydGFudDtcbn1cblxuLmxvZ297XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICBsZWZ0OjA7XG4gICAgIHJpZ2h0OjA7XG4gICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgIG1hcmdpbi10b3A6IDQ1cHg7XG4gICAgIGhlaWdodDogMzAlO1xuICAgICBib3gtc2hhZG93OiBub25lICFpbXBvcnRhbnQ7XG59XG5cbi5idG5CYWNre1xuICAgIFxuICAgIHotaW5kZXg6MTAwMDtcbiAgICBtYXJnaW4tdG9wOiA0MHB4ICFpbXBvcnRhbnQ7XG4gICAgYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xuICAgIC0tYm94LXNoYWRvdzogbm9uZTtcblxufVxuXG4uY2FtZXJhe1xuICAgIGhlaWdodDogNzBweDtcbiAgICBcbn1cblxuLmFkZGJ1dHRvbntcbiAgICB3aWR0aDogYXV0bztcbiAgICBoZWlnaHQ6IDEwMHB4O1xuICAgIGJhY2tncm91bmQ6ICM2NTYxQUI7XG4gICAgbWFyZ2luOiAwcHg7XG4gICAgXG59Il19 */"

/***/ }),

/***/ "./src/app/profile/profile.page.ts":
/*!*****************************************!*\
  !*** ./src/app/profile/profile.page.ts ***!
  \*****************************************/
/*! exports provided: ProfilePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfilePage", function() { return ProfilePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/image-picker/ngx */ "./node_modules/@ionic-native/image-picker/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_5__);






var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var ProfilePage = /** @class */ (function () {
    function ProfilePage(imagePicker, nav, nativePageTransitions) {
        this.imagePicker = imagePicker;
        this.nav = nav;
        this.nativePageTransitions = nativePageTransitions;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_5__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    }
    ProfilePage.prototype.ngOnInit = function () {
        this.getName();
        this.getInfo();
        this.getPhoto();
    };
    ProfilePage.prototype.choosePic = function () {
        var options;
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, function (err) { });
    };
    ProfilePage.prototype.getName = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_5__["Cloud"].run('getName', { userId: parse__WEBPACK_IMPORTED_MODULE_5__["User"].current().id }).then(function (result) {
            _this.name = result;
            //console.log(this.name);
        });
    };
    ProfilePage.prototype.getInfo = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_5__["Cloud"].run('getUser', { userId: parse__WEBPACK_IMPORTED_MODULE_5__["User"].current().id }).then(function (result) {
            _this.email = result.getEmail();
            _this.phoneNumber = result.get('phoneNumber');
            console.log(result);
        }, function (error) {
            console.log(error);
        });
    };
    ProfilePage.prototype.getPhoto = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_5__["Cloud"].run('getUser', { userId: parse__WEBPACK_IMPORTED_MODULE_5__["User"].current().id }).then(function (result) {
            if (result.get('profilePic') == null) {
                console.log("this object is null");
                _this.photo = "assets/profile.svg";
            }
            else {
                _this.photo = result.get('profilePic');
            }
            console.log(_this.photo);
        });
    };
    ProfilePage.prototype.navBack = function () {
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
        this.nav.navigateRoot('/sidemenu');
    };
    ProfilePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(/*! ./profile.page.html */ "./src/app/profile/profile.page.html"),
            styles: [__webpack_require__(/*! ./profile.page.scss */ "./src/app/profile/profile.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_image_picker_ngx__WEBPACK_IMPORTED_MODULE_2__["ImagePicker"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"], _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_4__["NativePageTransitions"]])
    ], ProfilePage);
    return ProfilePage;
}());



/***/ })

}]);
//# sourceMappingURL=profile-profile-module.js.map
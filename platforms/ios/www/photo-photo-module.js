(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["photo-photo-module"],{

/***/ "./src/app/photo/photo.module.ts":
/*!***************************************!*\
  !*** ./src/app/photo/photo.module.ts ***!
  \***************************************/
/*! exports provided: PhotoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoPageModule", function() { return PhotoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _photo_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./photo.page */ "./src/app/photo/photo.page.ts");







var routes = [
    {
        path: '',
        component: _photo_page__WEBPACK_IMPORTED_MODULE_6__["PhotoPage"]
    }
];
var PhotoPageModule = /** @class */ (function () {
    function PhotoPageModule() {
    }
    PhotoPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_photo_page__WEBPACK_IMPORTED_MODULE_6__["PhotoPage"]]
        })
    ], PhotoPageModule);
    return PhotoPageModule;
}());



/***/ }),

/***/ "./src/app/photo/photo.page.html":
/*!***************************************!*\
  !*** ./src/app/photo/photo.page.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header>\n  <ion-toolbar style=\"background:transparent;\">\n    <ion-button (click)=navigateBack() fill=clear style=\"color:black;\"><ion-icon name=\"ios-arrow-back\"></ion-icon></ion-button>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n\n<ion-card style='background-color: orange; height: 430px; margin-top: 50px;'>\n  <ion-card-content>\n    <button (click)='openCamera()' class= \"center\" style=\"background-color: transparent; margin-top: 50px; width:200px; height: 200px\">\n      <ion-img src=\"assets/camera.svg\"></ion-img>\n    </button>\n  </ion-card-content>\n</ion-card>\n\n\n<h1 style=\"margin-top: 30px; text-align: center; font-weight: lighter;\">Sube una foto de lo ocurrido</h1>\n<ion-button (click)='navigateFoward()' class='center' style='width:200px; margin-top: 20px;' expand=block>Cotizar</ion-button>\n</ion-content>"

/***/ }),

/***/ "./src/app/photo/photo.page.scss":
/*!***************************************!*\
  !*** ./src/app/photo/photo.page.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".center {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0Rlc2t0b3AvR3J1QXBwIGNvcHkgMi9zcmMvYXBwL3Bob3RvL3Bob3RvLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFrQjtFQUNsQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL3Bob3RvL3Bob3RvLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jZW50ZXJ7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6MDtcbiAgICByaWdodDowO1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICB9Il19 */"

/***/ }),

/***/ "./src/app/photo/photo.page.ts":
/*!*************************************!*\
  !*** ./src/app/photo/photo.page.ts ***!
  \*************************************/
/*! exports provided: PhotoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhotoPage", function() { return PhotoPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/camera/ngx */ "./node_modules/@ionic-native/camera/ngx/index.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_6__);







var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var PhotoPage = /** @class */ (function () {
    function PhotoPage(camera, nav, nativePageTransitions, location) {
        this.camera = camera;
        this.nav = nav;
        this.nativePageTransitions = nativePageTransitions;
        this.location = location;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_6__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    }
    PhotoPage.prototype.ngOnInit = function () { };
    PhotoPage.prototype.openCamera = function () {
        console.log('did enter');
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: this.camera.EncodingType.JPEG,
            targetWidth: 500,
            targetHeight: 500,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            saveToPhotoAlbum: true,
            cameraDirection: this.camera.Direction.BACK,
        };
        this.camera.getPicture(options).then(function (imageData) {
            var base64Image = imageData;
            var name = "photo.jpg";
            var parseFile = new parse__WEBPACK_IMPORTED_MODULE_6__["File"](name, {
                base64: base64Image
            });
            parseFile.save().then(function (savedFile) {
                console.log('file saved:' + savedFile);
            }, function (err) {
                console.log('error grabando file: ' + err);
            });
        }, function (err) {
            console.log('error de camara' + err);
        });
    };
    PhotoPage.prototype.navigateFoward = function () {
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
        this.nav.navigateRoot('/pagar');
    };
    PhotoPage.prototype.navigateBack = function () {
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
        //this.nav.navigateBack();
        this.location.back();
    };
    PhotoPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-photo',
            template: __webpack_require__(/*! ./photo.page.html */ "./src/app/photo/photo.page.html"),
            styles: [__webpack_require__(/*! ./photo.page.scss */ "./src/app/photo/photo.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_camera_ngx__WEBPACK_IMPORTED_MODULE_2__["Camera"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"], _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_3__["NativePageTransitions"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"]])
    ], PhotoPage);
    return PhotoPage;
}());



/***/ })

}]);
//# sourceMappingURL=photo-photo-module.js.map
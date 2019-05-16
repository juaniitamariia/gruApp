(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["num-verification-num-verification-module"],{

/***/ "./src/app/num-verification/num-verification.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/num-verification/num-verification.module.ts ***!
  \*************************************************************/
/*! exports provided: NumVerificationPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumVerificationPageModule", function() { return NumVerificationPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _num_verification_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./num-verification.page */ "./src/app/num-verification/num-verification.page.ts");







var routes = [
    {
        path: '',
        component: _num_verification_page__WEBPACK_IMPORTED_MODULE_6__["NumVerificationPage"]
    }
];
var NumVerificationPageModule = /** @class */ (function () {
    function NumVerificationPageModule() {
    }
    NumVerificationPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_num_verification_page__WEBPACK_IMPORTED_MODULE_6__["NumVerificationPage"]]
        })
    ], NumVerificationPageModule);
    return NumVerificationPageModule;
}());



/***/ }),

/***/ "./src/app/num-verification/num-verification.page.html":
/*!*************************************************************!*\
  !*** ./src/app/num-verification/num-verification.page.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=header>\n\n  <ion-button class=\"btnBack\" (click)= navigate()>\n    <ion-icon name=\"ios-arrow-back\"></ion-icon>\n  </ion-button>\n\n<img class=logo src= \"assets/logowhite.png\">\n\n</div>\n\n<div class=codigo>\n    \n    <div id=\"form\">\n        <ion-input id=\"one\" type=\"text\" class=\"verification-code\" placeholder=\"&bull;\" maxLength=\"1\" size=\"1\" min=\"0\" max=\"9\"\n         (onkeyup)=\"add(this)\"></ion-input>\n        <ion-input id=\"two\" type=\"text\" class=\"verification-code\" placeholder=\"&bull;\" maxLength=\"1\" size=\"1\" min=\"0\" max=“9”\n        (onkeyup)=\"add(this)\"></ion-input>\n        <ion-input id=\"three\" type=“text” class=\"verification-code\" placeholder=\"&bull;\" maxLength=\"1\" size=\"1\" min=\"0\" max=“9”\n        (onkeyup)=\"add(this)\"></ion-input>\n        <ion-input id=\"four\" type=“text” class=\"verification-code\" placeholder=\"&bull;\" maxLength=\"1\" size=\"1\" min=\"0\" max=“9”\n        (onkeyup)=\"add(this)\"></ion-input>\n      </div>\n\n      <ion-button margin=20px expand=\"block\" (click)= reSendCode()>Reenviar</ion-button>\n      <ion-button margin=20px expand=\"block\" (click)= navigateFoward()>Verificar</ion-button>\n\n</div>\n"

/***/ }),

/***/ "./src/app/num-verification/num-verification.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/num-verification/num-verification.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  background-color: #6561AB;\n  height: 230px; }\n\n.logo {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 45px;\n  height: 7%; }\n\n.codeconfirm {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  font-size: 22px;\n  color: white;\n  margin-top: 60px;\n  padding: 30px;\n  text-align: center;\n  font-weight: 300; }\n\n.codigo {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 50px;\n  margin-top: 170px; }\n\n.codigoInput {\n  border-bottom-color: gray;\n  width: 300px;\n  height: 50px;\n  border-top-color: 0; }\n\n.btnBack {\n  --background: transparent;\n  --background-activated: transparent;\n  margin-top: 40px !important;\n  --box-shadow:none; }\n\n#form {\n  padding-top: 30px;\n  display: flex;\n  width: 240px;\n  margin: auto; }\n\n.verification-code {\n  margin: 0 5px;\n  text-align: center;\n  line-height: 80px;\n  font-size: 50px;\n  border-bottom: solid 1px #ccc;\n  outline: none;\n  width: 20%;\n  transition: all .2s ease-in-out; }\n\n.verification-code:focus {\n    border-color: purple;\n    box-shadow: 0 0 5px purple inset; }\n\n.verification-code::-moz-selection {\n    background: transparent; }\n\n.verification-code::selection {\n    background: transparent; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0Rlc2t0b3AvR3J1QXBwIGNvcHkgMi9zcmMvYXBwL251bS12ZXJpZmljYXRpb24vbnVtLXZlcmlmaWNhdGlvbi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSx5QkFBeUI7RUFDekIsYUFBYSxFQUFBOztBQUdoQjtFQUNJLGtCQUFrQjtFQUNqQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZ0JBQWdCO0VBQ2hCLFVBQVUsRUFBQTs7QUFHZjtFQUNJLGtCQUFrQjtFQUNsQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsZUFBZTtFQUNmLFlBQVk7RUFDWixnQkFBZ0I7RUFDaEIsYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixnQkFBZ0IsRUFBQTs7QUFHcEI7RUFDQyxrQkFBa0I7RUFDbEIsT0FBTTtFQUNOLFFBQU87RUFDUCxpQkFBaUI7RUFDakIsa0JBQWtCO0VBQ2xCLGFBQWE7RUFDYixpQkFBaUIsRUFBQTs7QUFLbEI7RUFFSSx5QkFBeUI7RUFDekIsWUFBWTtFQUNaLFlBQVk7RUFDWixtQkFBbUIsRUFBQTs7QUFJdkI7RUFDQSx5QkFBYTtFQUNiLG1DQUF1QjtFQUN0QiwyQkFBMkI7RUFDM0IsaUJBQWEsRUFBQTs7QUFHZDtFQUNHLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsWUFBWTtFQUNaLFlBQVksRUFBQTs7QUFHZjtFQUNHLGFBQWE7RUFDYixrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLGVBQWU7RUFDZiw2QkFBNkI7RUFDN0IsYUFBYTtFQUNiLFVBQVU7RUFDViwrQkFBK0IsRUFBQTs7QUFSbEM7SUFXSyxvQkFBb0I7SUFDcEIsZ0NBQWdDLEVBQUE7O0FBWnJDO0lBZ0JLLHVCQUF1QixFQUFBOztBQWhCNUI7SUFnQkssdUJBQXVCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9udW0tdmVyaWZpY2F0aW9uL251bS12ZXJpZmljYXRpb24ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmhlYWRlcntcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjU2MUFCO1xuICAgIGhlaWdodDogMjMwcHg7XG4gfVxuIFxuIC5sb2dve1xuICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICBsZWZ0OjA7XG4gICAgICByaWdodDowO1xuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gICAgICBtYXJnaW4tdG9wOiA0NXB4O1xuICAgICAgaGVpZ2h0OiA3JTtcbiB9XG4gXG4gLmNvZGVjb25maXJte1xuICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgIGxlZnQ6MDtcbiAgICAgcmlnaHQ6MDtcbiAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICAgZm9udC1zaXplOiAyMnB4O1xuICAgICBjb2xvcjogd2hpdGU7XG4gICAgIG1hcmdpbi10b3A6IDYwcHg7XG4gICAgIHBhZGRpbmc6IDMwcHg7XG4gICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgZm9udC13ZWlnaHQ6IDMwMDtcbiB9XG4gXG4gLmNvZGlnb3tcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OjA7XG4gIHJpZ2h0OjA7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIHBhZGRpbmc6IDUwcHg7XG4gIG1hcmdpbi10b3A6IDE3MHB4O1xuICBcbiAgXG4gfVxuIFxuIC5jb2RpZ29JbnB1dHtcbiBcbiAgICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogZ3JheTtcbiAgICAgd2lkdGg6IDMwMHB4O1xuICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgIGJvcmRlci10b3AtY29sb3I6IDA7XG4gXG4gfVxuIFxuIC5idG5CYWNre1xuIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdHJhbnNwYXJlbnQ7XG4gIG1hcmdpbi10b3A6IDQwcHggIWltcG9ydGFudDtcbiAgLS1ib3gtc2hhZG93Om5vbmU7XG4gfVxuXG4gI2Zvcm0ge1xuICAgIHBhZGRpbmctdG9wOiAzMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgd2lkdGg6IDI0MHB4O1xuICAgIG1hcmdpbjogYXV0bztcbiAgIH1cblxuIC52ZXJpZmljYXRpb24tY29kZSB7XG4gICAgbWFyZ2luOiAwIDVweDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbGluZS1oZWlnaHQ6IDgwcHg7XG4gICAgZm9udC1zaXplOiA1MHB4O1xuICAgIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjY2NjO1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgd2lkdGg6IDIwJTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgLjJzIGVhc2UtaW4tb3V0O1xuICAgXG4gICAgJjpmb2N1cyB7XG4gICAgICBib3JkZXItY29sb3I6IHB1cnBsZTtcbiAgICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcHVycGxlIGluc2V0O1xuICAgIH1cbiAgIFxuICAgICY6OnNlbGVjdGlvbiB7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICB9XG4gICB9XG5cbiJdfQ== */"

/***/ }),

/***/ "./src/app/num-verification/num-verification.page.ts":
/*!***********************************************************!*\
  !*** ./src/app/num-verification/num-verification.page.ts ***!
  \***********************************************************/
/*! exports provided: NumVerificationPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NumVerificationPage", function() { return NumVerificationPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/native-page-transitions/ngx */ "./node_modules/@ionic-native/native-page-transitions/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_5__);






var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var NumVerificationPage = /** @class */ (function () {
    function NumVerificationPage(nativePageTransitions, nav, gru) {
        this.nativePageTransitions = nativePageTransitions;
        this.nav = nav;
        this.gru = gru;
    }
    NumVerificationPage.prototype.ngOnInit = function () {
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_5__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    };
    NumVerificationPage.prototype.navigate = function () {
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
        this.nav.navigateRoot('/registro');
    };
    NumVerificationPage.prototype.add = function (input) {
        this.numbers += input.toString();
        console.log(this.numbers);
    };
    NumVerificationPage.prototype.numbersOnly = function (input) {
        var regularExp = /[^0-9]/;
        input.value = input.value.replace(regularExp, "");
    };
    NumVerificationPage.prototype.navigateFoward = function () {
        var _this = this;
        var options = {
            direction: 'left',
            duration: 200,
            slowdownfactor: -1,
            slidePixels: 20,
            iosdelay: 100,
            androiddelay: 100,
        };
        this.numbers = document.getElementById("one").value.toString();
        this.numbers += document.getElementById("two").value.toString();
        this.numbers += document.getElementById("three").value.toString();
        this.numbers += document.getElementById("four").value.toString();
        if (this.gru.verificationCode == this.numbers) {
            console.log('transition');
            parse__WEBPACK_IMPORTED_MODULE_5__["Cloud"].run('setVerified', { userId: parse__WEBPACK_IMPORTED_MODULE_5__["User"].current().id })
                .then(function (result) {
                _this.nativePageTransitions.slide(options);
                _this.nav.navigateRoot('/metodo-pago');
            });
        }
        else if (this.gru.verificationCode != this.numbers) {
            console.log("Nope", this.gru.verificationCode);
        }
        console.log(this.numbers);
    };
    NumVerificationPage.prototype.reSendCode = function () {
        this.verificationCode = (Math.floor(Math.random() * 9999)).toString(10);
        if (this.verificationCode.length != 4) {
            this.verificationCode = this.verificationCode + "1";
        }
        parse__WEBPACK_IMPORTED_MODULE_5__["User"].current().set('verificationCode', this.verificationCode);
        parse__WEBPACK_IMPORTED_MODULE_5__["User"].current().save().then(function (savedUser) {
            parse__WEBPACK_IMPORTED_MODULE_5__["Cloud"].run('sendVerificationCode', {
                userId: parse__WEBPACK_IMPORTED_MODULE_5__["User"].current().id,
                phoneNumber: parse__WEBPACK_IMPORTED_MODULE_5__["User"].current().get('phoneNumber')
            }).then(function (result) {
                console.log(result);
                return true;
            }, function (error) {
                console.log(error);
                return false;
            });
        }, function (error) {
            console.log(error);
            return false;
        });
    };
    NumVerificationPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-num-verification',
            template: __webpack_require__(/*! ./num-verification.page.html */ "./src/app/num-verification/num-verification.page.html"),
            styles: [__webpack_require__(/*! ./num-verification.page.scss */ "./src/app/num-verification/num-verification.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_native_native_page_transitions_ngx__WEBPACK_IMPORTED_MODULE_2__["NativePageTransitions"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_4__["GruproviderService"]])
    ], NumVerificationPage);
    return NumVerificationPage;
}());



/***/ })

}]);
//# sourceMappingURL=num-verification-num-verification-module.js.map
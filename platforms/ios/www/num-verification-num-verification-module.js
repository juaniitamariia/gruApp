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

module.exports = "<div class=header>\n\n  <ion-button class=\"btnBack\" (click)= navigate()>\n    <ion-icon name=\"ios-arrow-back\"></ion-icon>\n  </ion-button>\n\n<img class=logo src= \"assets/logowhite.png\">\n\n</div>\n\n<div class=codigo>\n    \n    <div id=\"form\">\n        <ion-input maxlength = \"1\" id=\"one\" #one  type=\"tel\"  pattern = \"regularExp\" class=\"verification-code\" placeholder=\"&bull;\"  size=\"1\" min=\"0\" max=\"9\"\n        (keyup) = \"gotoNextField(two)\"  ></ion-input>\n        <ion-input maxlength = \"1\"  id=\"two\" #two type=\"tel\" class=\"verification-code\" placeholder=\"&bull;\"  size=\"1\" min=\"0\" max=\"9\"\n        (keyup)=\"gotoNextField(three)\"></ion-input>\n        <ion-input maxlength = \"1\"  id=\"three\" #three type=\"tel\" class=\"verification-code\" placeholder=\"&bull;\"  size=\"1\" min=\"0\" max=“9”\n        (keyup)=\"gotoNextField(four)\"></ion-input>\n        <ion-input maxlength = \"1\"  id=\"four\" #four type=\"tel\" class=\"verification-code\" placeholder=\"&bull;\"  size=\"1\" min=\"0\" max=\"9\"\n        ></ion-input>\n      </div>\n\n      <ion-button margin=20px expand=\"block\" (click)= reSendCode()>Reenviar</ion-button>\n      <ion-button margin=20px expand=\"block\" (click)= navigateFoward()>Verificar</ion-button>\n\n</div>\n"

/***/ }),

/***/ "./src/app/num-verification/num-verification.page.scss":
/*!*************************************************************!*\
  !*** ./src/app/num-verification/num-verification.page.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  background-color: #6561AB;\n  height: 230px; }\n\n.logo {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 45px;\n  height: 7%; }\n\n.codeconfirm {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  font-size: 22px;\n  color: white;\n  margin-top: 60px;\n  padding: 30px;\n  text-align: center;\n  font-weight: 300; }\n\n.codigo {\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 50px;\n  margin-top: 170px; }\n\n.codigoInput {\n  border-bottom-color: gray;\n  width: 300px;\n  height: 50px;\n  border-top-color: 0; }\n\n.btnBack {\n  --background: transparent;\n  --background-activated: transparent;\n  margin-top: 40px !important;\n  --box-shadow:none; }\n\n#form {\n  padding-top: 30px;\n  display: flex;\n  width: 240px;\n  margin: auto; }\n\n.verification-code {\n  margin: 0 5px;\n  text-align: center;\n  line-height: 80px;\n  font-size: 50px;\n  border-bottom: solid 1px #ccc;\n  outline: none;\n  width: 20%;\n  transition: all .2s ease-in-out; }\n\n.verification-code:focus {\n    border-color: purple;\n    box-shadow: 0 0 5px purple inset; }\n\n.verification-code::-moz-selection {\n    background: transparent; }\n\n.verification-code::selection {\n    background: transparent; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvbnVtLXZlcmlmaWNhdGlvbi9udW0tdmVyaWZpY2F0aW9uLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHlCQUF5QjtFQUN6QixhQUFhLEVBQUE7O0FBR2hCO0VBQ0ksa0JBQWtCO0VBQ2pCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixnQkFBZ0I7RUFDaEIsVUFBVSxFQUFBOztBQUdmO0VBQ0ksa0JBQWtCO0VBQ2xCLE9BQU07RUFDTixRQUFPO0VBQ1AsaUJBQWlCO0VBQ2pCLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGdCQUFnQixFQUFBOztBQUdwQjtFQUNDLGtCQUFrQjtFQUNsQixPQUFNO0VBQ04sUUFBTztFQUNQLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLGlCQUFpQixFQUFBOztBQUtsQjtFQUVJLHlCQUF5QjtFQUN6QixZQUFZO0VBQ1osWUFBWTtFQUNaLG1CQUFtQixFQUFBOztBQUl2QjtFQUNBLHlCQUFhO0VBQ2IsbUNBQXVCO0VBQ3RCLDJCQUEyQjtFQUMzQixpQkFBYSxFQUFBOztBQUdkO0VBQ0csaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixZQUFZO0VBQ1osWUFBWSxFQUFBOztBQUdmO0VBQ0csYUFBYTtFQUNiLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsZUFBZTtFQUNmLDZCQUE2QjtFQUM3QixhQUFhO0VBQ2IsVUFBVTtFQUNWLCtCQUErQixFQUFBOztBQVJsQztJQVdLLG9CQUFvQjtJQUNwQixnQ0FBZ0MsRUFBQTs7QUFackM7SUFnQkssdUJBQXVCLEVBQUE7O0FBaEI1QjtJQWdCSyx1QkFBdUIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL251bS12ZXJpZmljYXRpb24vbnVtLXZlcmlmaWNhdGlvbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVye1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM2NTYxQUI7XG4gICAgaGVpZ2h0OiAyMzBweDtcbiB9XG4gXG4gLmxvZ297XG4gICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGxlZnQ6MDtcbiAgICAgIHJpZ2h0OjA7XG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcbiAgICAgIG1hcmdpbi10b3A6IDQ1cHg7XG4gICAgICBoZWlnaHQ6IDclO1xuIH1cbiBcbiAuY29kZWNvbmZpcm17XG4gICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgbGVmdDowO1xuICAgICByaWdodDowO1xuICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICAgICBmb250LXNpemU6IDIycHg7XG4gICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgbWFyZ2luLXRvcDogNjBweDtcbiAgICAgcGFkZGluZzogMzBweDtcbiAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICBmb250LXdlaWdodDogMzAwO1xuIH1cbiBcbiAuY29kaWdve1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6MDtcbiAgcmlnaHQ6MDtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1hcmdpbi1yaWdodDogYXV0bztcbiAgcGFkZGluZzogNTBweDtcbiAgbWFyZ2luLXRvcDogMTcwcHg7XG4gIFxuICBcbiB9XG4gXG4gLmNvZGlnb0lucHV0e1xuIFxuICAgICBib3JkZXItYm90dG9tLWNvbG9yOiBncmF5O1xuICAgICB3aWR0aDogMzAwcHg7XG4gICAgIGhlaWdodDogNTBweDtcbiAgICAgYm9yZGVyLXRvcC1jb2xvcjogMDtcbiBcbiB9XG4gXG4gLmJ0bkJhY2t7XG4gLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB0cmFuc3BhcmVudDtcbiAgbWFyZ2luLXRvcDogNDBweCAhaW1wb3J0YW50O1xuICAtLWJveC1zaGFkb3c6bm9uZTtcbiB9XG5cbiAjZm9ybSB7XG4gICAgcGFkZGluZy10b3A6IDMwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICB3aWR0aDogMjQwcHg7XG4gICAgbWFyZ2luOiBhdXRvO1xuICAgfVxuXG4gLnZlcmlmaWNhdGlvbi1jb2RlIHtcbiAgICBtYXJnaW46IDAgNXB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBsaW5lLWhlaWdodDogODBweDtcbiAgICBmb250LXNpemU6IDUwcHg7XG4gICAgYm9yZGVyLWJvdHRvbTogc29saWQgMXB4ICNjY2M7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICB3aWR0aDogMjAlO1xuICAgIHRyYW5zaXRpb246IGFsbCAuMnMgZWFzZS1pbi1vdXQ7XG4gICBcbiAgICAmOmZvY3VzIHtcbiAgICAgIGJvcmRlci1jb2xvcjogcHVycGxlO1xuICAgICAgYm94LXNoYWRvdzogMCAwIDVweCBwdXJwbGUgaW5zZXQ7XG4gICAgfVxuICAgXG4gICAgJjo6c2VsZWN0aW9uIHtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgIH1cblxuIl19 */"

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
        console.log('transition');
        parse__WEBPACK_IMPORTED_MODULE_5__["Cloud"].run('setVerified', { userId: parse__WEBPACK_IMPORTED_MODULE_5__["User"].current().id, number: this.numbers })
            .then(function (result) {
            if (result.success == true) {
                _this.nativePageTransitions.slide(options);
                _this.nav.navigateRoot('/metodo-pago');
            }
            else {
                console.log('NO SON IGUALES LOS NUMEROS');
            }
        });
        // if (this.gru.verificationCode == this.numbers){
        // }
        // else if( this.gru.verificationCode != this.numbers){
        //    console.log("Nope",this.gru.verificationCode);
        // }
        console.log(this.numbers);
    };
    NumVerificationPage.prototype.gotoNextField = function (nextElement) {
        nextElement.setFocus();
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
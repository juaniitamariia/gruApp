(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["edit-car-edit-car-module"],{

/***/ "./src/app/edit-car/edit-car.module.ts":
/*!*********************************************!*\
  !*** ./src/app/edit-car/edit-car.module.ts ***!
  \*********************************************/
/*! exports provided: EditCarPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditCarPageModule", function() { return EditCarPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _edit_car_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./edit-car.page */ "./src/app/edit-car/edit-car.page.ts");







var routes = [
    {
        path: '',
        component: _edit_car_page__WEBPACK_IMPORTED_MODULE_6__["EditCarPage"]
    }
];
var EditCarPageModule = /** @class */ (function () {
    function EditCarPageModule() {
    }
    EditCarPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_edit_car_page__WEBPACK_IMPORTED_MODULE_6__["EditCarPage"]]
        })
    ], EditCarPageModule);
    return EditCarPageModule;
}());



/***/ }),

/***/ "./src/app/edit-car/edit-car.page.html":
/*!*********************************************!*\
  !*** ./src/app/edit-car/edit-car.page.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n  <ion-toolbar class=\"arrow-btn\" style=\"background:whitesmoke;\">\n    <ion-button (click)=navigateBack() fill=clear style=\"color:black;\"><ion-icon name=md-arrow-round-back></ion-icon></ion-button>\n    <ion-title style=\"font-weight:300;\">Edita el Vehículo</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-card class=add-towing-card>\n    <h5 class=label-input>Marca</h5>\n    <ion-input [(ngModel)]=\"make\" type=“text” class=name></ion-input>\n \n    <h5 class=label-input>Modelo</h5>\n    <ion-input [(ngModel)]=\"model\" type=“text” class=name></ion-input>\n \n    <h5 class=label-input>Año</h5>\n    <ion-input [(ngModel)]=\"year\" type=“text” class=name></ion-input>\n \n    <h5 class=label-input>Tablilla</h5>\n    <ion-input [(ngModel)]=\"licensePlateNum\" type=“text” class=name></ion-input>\n \n    <h5 class=label-input>Color</h5>\n    <ion-input [(ngModel)]=\"color\" type=“text” class=name></ion-input>\n \n  </ion-card>\n\n </ion-content>\n\n\n<ion-button (click)=\"save()\" class=\"addbutton\">GUARDAR</ion-button>\n\n"

/***/ }),

/***/ "./src/app/edit-car/edit-car.page.scss":
/*!*********************************************!*\
  !*** ./src/app/edit-car/edit-car.page.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".label-input {\n  margin-left: 5px;\n  font-weight: 300;\n  font-size: 12px; }\n\n.add-towing-card {\n  box-shadow: none; }\n\n.name {\n  border: 1px solid gray;\n  border-radius: 10px; }\n\n.addbutton {\n  width: auto;\n  height: 100px;\n  background: #6561AB;\n  margin: 0; }\n\n.arrow-btn {\n  margin-top: 30px !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0Rlc2t0b3AvR3J1QXBwIGNvcHkgMi9zcmMvYXBwL2VkaXQtY2FyL2VkaXQtY2FyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFnQjtFQUNoQixnQkFBZ0I7RUFDaEIsZUFBZSxFQUFBOztBQUduQjtFQUNJLGdCQUFnQixFQUFBOztBQUdwQjtFQUNDLHNCQUFzQjtFQUN0QixtQkFBbUIsRUFBQTs7QUFHcEI7RUFDSSxXQUFXO0VBQ1gsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixTQUFTLEVBQUE7O0FBSWI7RUFDSSwyQkFBMkIsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2VkaXQtY2FyL2VkaXQtY2FyLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sYWJlbC1pbnB1dCB7XG4gICAgbWFyZ2luLWxlZnQ6IDVweDtcbiAgICBmb250LXdlaWdodDogMzAwO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgIH1cblxuLmFkZC10b3dpbmctY2FyZCB7XG4gICAgYm94LXNoYWRvdzogbm9uZTtcbiAgIH1cblxuLm5hbWUge1xuIGJvcmRlcjogMXB4IHNvbGlkIGdyYXk7XG4gYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmFkZGJ1dHRvbntcbiAgICB3aWR0aDogYXV0bztcbiAgICBoZWlnaHQ6IDEwMHB4O1xuICAgIGJhY2tncm91bmQ6ICM2NTYxQUI7XG4gICAgbWFyZ2luOiAwO1xuICAgIFxufVxuXG4uYXJyb3ctYnRue1xuICAgIG1hcmdpbi10b3A6IDMwcHggIWltcG9ydGFudDtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/edit-car/edit-car.page.ts":
/*!*******************************************!*\
  !*** ./src/app/edit-car/edit-car.page.ts ***!
  \*******************************************/
/*! exports provided: EditCarPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditCarPage", function() { return EditCarPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../gruprovider.service */ "./src/app/gruprovider.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_5__);






var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var EditCarPage = /** @class */ (function () {
    function EditCarPage(location, provider, navigate) {
        this.location = location;
        this.provider = provider;
        this.navigate = navigate;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_5__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    }
    EditCarPage.prototype.ngOnInit = function () {
        console.log(this.provider.car);
        this.getCar(this.provider.car);
    };
    EditCarPage.prototype.navigateBack = function () {
        this.location.back();
    };
    EditCarPage.prototype.getCar = function (car) {
        car = car.toJSON();
        this.licensePlateNum = car.licensePlateNum;
        this.model = car.model;
        this.make = car.make;
        this.year = car.year;
        this.color = car.color;
        this.carId = car.objectId;
        console.log(this.model);
    };
    EditCarPage.prototype.save = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_5__["Cloud"].run('editCar', {
            carId: this.carId,
            color: this.color,
            make: this.make,
            year: this.year,
            model: this.model,
            licensePlateNum: this.licensePlateNum
        }).then(function (result) {
            console.log(result);
            _this.navigate.navigateRoot('/mi-vehiculo');
        }, function (error) {
            console.log(error);
        });
    };
    EditCarPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-edit-car',
            template: __webpack_require__(/*! ./edit-car.page.html */ "./src/app/edit-car/edit-car.page.html"),
            styles: [__webpack_require__(/*! ./edit-car.page.scss */ "./src/app/edit-car/edit-car.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_3__["GruproviderService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"]])
    ], EditCarPage);
    return EditCarPage;
}());



/***/ })

}]);
//# sourceMappingURL=edit-car-edit-car-module.js.map
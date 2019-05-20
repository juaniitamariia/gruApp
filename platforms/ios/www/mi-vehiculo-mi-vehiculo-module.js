(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["mi-vehiculo-mi-vehiculo-module"],{

/***/ "./src/app/mi-vehiculo/mi-vehiculo.module.ts":
/*!***************************************************!*\
  !*** ./src/app/mi-vehiculo/mi-vehiculo.module.ts ***!
  \***************************************************/
/*! exports provided: MiVehiculoPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MiVehiculoPageModule", function() { return MiVehiculoPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _mi_vehiculo_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mi-vehiculo.page */ "./src/app/mi-vehiculo/mi-vehiculo.page.ts");







var routes = [
    {
        path: '',
        component: _mi_vehiculo_page__WEBPACK_IMPORTED_MODULE_6__["MiVehiculoPage"]
    }
];
var MiVehiculoPageModule = /** @class */ (function () {
    function MiVehiculoPageModule() {
    }
    MiVehiculoPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_mi_vehiculo_page__WEBPACK_IMPORTED_MODULE_6__["MiVehiculoPage"]]
        })
    ], MiVehiculoPageModule);
    return MiVehiculoPageModule;
}());



/***/ }),

/***/ "./src/app/mi-vehiculo/mi-vehiculo.page.html":
/*!***************************************************!*\
  !*** ./src/app/mi-vehiculo/mi-vehiculo.page.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border style=\"border-bottom: solid rgb(196, 196, 196) 1px;\">\n    <ion-toolbar style=\"background:whitesmoke;\">\n        <ion-button (click)=navigateBack() fill=clear style=\"color:black;\">\n            <ion-icon name=md-arrow-round-back></ion-icon>\n        </ion-button>\n        <ion-title style=\"font-weight:300;\">Mi Vehículo</ion-title>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n    <ion-list lines=none>\n        <ion-item id=\"cars\" *ngFor=\"let car of cars\">\n            <ion-card class=\"card\">\n                <ion-grid>\n                    <ion-row>\n                        <ion-col size=\"4\">\n                            <ion-img style=\"margin-top: 5px; height: 50px;\" src=\"assets/document.png\"></ion-img>\n                        </ion-col>\n                        <ion-col size=\"4\">\n                            <h5 style=\"margin: 0px;\">{{car.get('make')}}</h5>\n                            <h6 style=\"color: lightgray; font-size: 15px; margin: 0px;\">{{car.get('licensePlateNum')}}</h6>\n                            <h6 style=\"color: lightgray; font-size: 15px; margin: 0px;\">{{car.get('year')}}</h6>\n                            <h6 style=\"color: lightgray; font-size: 15px; margin: 0px;\">{{car.get('color')}}</h6>\n                        </ion-col>\n                        <ion-col size=\"4\">\n                          <ion-button (click)=\"removeCar(car)\" fill=transparent>\n                              <ion-icon name=\"trash\"></ion-icon>\n                          </ion-button>\n                          <ion-button (click)=\"edit(car)\" fill=transparent>\n                              <ion-icon name=\"md-create\"></ion-icon>\n                          </ion-button>\n                        </ion-col>\n                    </ion-row>\n                </ion-grid>\n            </ion-card>\n        </ion-item>\n    </ion-list>\n\n    <!-- <ion-card class=\"card\">\n        <ion-grid>\n            <ion-row>\n                  <ion-col size=\"4\">\n                        <ion-img style=\"margin-top: 5px; height: 50px;\" src=\"assets/document.png\"></ion-img>\n                    </ion-col>\n                    <ion-col size=\"4\">\n                        <h5 style=\"margin: 0px; margin-top: 10px; margin-bottom: 5px;\">Mitsubishi Outlander</h5>\n                        <h6 style=\"color: lightgray; font-size: 15px; margin: 0px;\">234 987</h6>\n                    </ion-col>\n            </ion-row>\n        </ion-grid>\n    </ion-card> -->\n\n    <ion-fab vertical=\"bottom\" horizontal=\"end\" slot=\"fixed\">\n        <ion-fab-button href=\"/addcar\" style=\"border-radius: 50%; border: solid white 2px;\">\n            <ion-icon name=\"md-add\"></ion-icon>\n        </ion-fab-button>\n    </ion-fab>\n\n</ion-content>"

/***/ }),

/***/ "./src/app/mi-vehiculo/mi-vehiculo.page.scss":
/*!***************************************************!*\
  !*** ./src/app/mi-vehiculo/mi-vehiculo.page.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n  height: autopx; }\n\n.btn {\n  border-radius: 50%;\n  height: 50px;\n  width: 50px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvbWktdmVoaWN1bG8vbWktdmVoaWN1bG8ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksY0FBYyxFQUFBOztBQUdsQjtFQUNJLGtCQUFrQjtFQUNsQixZQUFZO0VBQ1osV0FBVyxFQUFBIiwiZmlsZSI6InNyYy9hcHAvbWktdmVoaWN1bG8vbWktdmVoaWN1bG8ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmR7XG4gICAgaGVpZ2h0OiBhdXRvcHg7XG59XG5cbi5idG57XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGhlaWdodDogNTBweDtcbiAgICB3aWR0aDogNTBweDtcbn1cblxuIl19 */"

/***/ }),

/***/ "./src/app/mi-vehiculo/mi-vehiculo.page.ts":
/*!*************************************************!*\
  !*** ./src/app/mi-vehiculo/mi-vehiculo.page.ts ***!
  \*************************************************/
/*! exports provided: MiVehiculoPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MiVehiculoPage", function() { return MiVehiculoPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _registro_registro_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../registro/registro.page */ "./src/app/registro/registro.page.ts");
/* harmony import */ var _gruprovider_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../gruprovider.service */ "./src/app/gruprovider.service.ts");







var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var MiVehiculoPage = /** @class */ (function () {
    function MiVehiculoPage(location, nav, registroPage, provider) {
        this.location = location;
        this.nav = nav;
        this.registroPage = registroPage;
        this.provider = provider;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_4__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    }
    MiVehiculoPage.prototype.ngOnInit = function () {
        this.getCars();
    };
    MiVehiculoPage.prototype.navigateBack = function () {
        this.location.back();
    };
    MiVehiculoPage.prototype.getCars = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_4__["Cloud"].run('getCars', {
            userId: parse__WEBPACK_IMPORTED_MODULE_4__["User"].current().id
        }).then(function (result) {
            _this.cars = result;
            // this.provider.car = result;
            // console.log(this.cars);
            // console.log(this.provider.car);
        });
    };
    MiVehiculoPage.prototype.removeCar = function (selectedCar) {
        var _this = this;
        var index;
        index = this.cars.indexOf(selectedCar);
        console.log(index);
        console.log('enter');
        parse__WEBPACK_IMPORTED_MODULE_4__["Cloud"].run('deleteCar', { carId: selectedCar.id }).then(function (result) {
            _this.cars.splice(index, 1);
            console.log(result);
        }, function (error) {
            console.log(error);
        });
    };
    MiVehiculoPage.prototype.edit = function (selectedCar) {
        this.provider.car = selectedCar;
        console.log(this.provider.car);
        this.nav.navigateRoot('/edit-car');
    };
    MiVehiculoPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-mi-vehiculo',
            template: __webpack_require__(/*! ./mi-vehiculo.page.html */ "./src/app/mi-vehiculo/mi-vehiculo.page.html"),
            styles: [__webpack_require__(/*! ./mi-vehiculo.page.scss */ "./src/app/mi-vehiculo/mi-vehiculo.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["NavController"], _registro_registro_page__WEBPACK_IMPORTED_MODULE_5__["RegistroPage"], _gruprovider_service__WEBPACK_IMPORTED_MODULE_6__["GruproviderService"]])
    ], MiVehiculoPage);
    return MiVehiculoPage;
}());



/***/ })

}]);
//# sourceMappingURL=mi-vehiculo-mi-vehiculo-module.js.map
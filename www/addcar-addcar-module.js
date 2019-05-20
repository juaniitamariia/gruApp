(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["addcar-addcar-module"],{

/***/ "./src/app/addcar/addcar.module.ts":
/*!*****************************************!*\
  !*** ./src/app/addcar/addcar.module.ts ***!
  \*****************************************/
/*! exports provided: AddcarPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddcarPageModule", function() { return AddcarPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _addcar_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./addcar.page */ "./src/app/addcar/addcar.page.ts");







var routes = [
    {
        path: '',
        component: _addcar_page__WEBPACK_IMPORTED_MODULE_6__["AddcarPage"]
    }
];
var AddcarPageModule = /** @class */ (function () {
    function AddcarPageModule() {
    }
    AddcarPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes)
            ],
            declarations: [_addcar_page__WEBPACK_IMPORTED_MODULE_6__["AddcarPage"]]
        })
    ], AddcarPageModule);
    return AddcarPageModule;
}());



/***/ }),

/***/ "./src/app/addcar/addcar.page.html":
/*!*****************************************!*\
  !*** ./src/app/addcar/addcar.page.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-header no-border>\n    <ion-toolbar class=\"arrow-btn\" style=\"background:whitesmoke;\">\n      <ion-button (click)=navigateBack() fill=clear style=\"color:black;\"><ion-icon name=md-arrow-round-back></ion-icon></ion-button>\n      <ion-title style=\"font-weight:300;\">Agregar Nuevo Vehículo</ion-title>\n    </ion-toolbar>\n  </ion-header>\n \n <ion-content>\n    <ion-card class=add-towing-card>\n      <h5 class=label-input>Marca</h5>\n      <ion-input [(ngModel)]=\"make\" type=“text” class=name></ion-input>\n      <!-- <select #select [(ngModel)]=\"make\" class=\"selector\">\n      <option *ngFor=\"let item of list\" [value]=\"item.id\">{{item.name}}</option>\n    </select> -->\n      <!-- <select [(ngModel)]=\"make\" class=\"selector\">\n        <ion-option value=\"Hyundai\">Hyundai</ion-option>\n        <ion-option value=\"Toyota\">Toyota</ion-option>\n        <ion-option value=\"Ford\">Ford</ion-option>\n        <ion-option value=\"Chevrolet\">Chevrolet</ion-option>\n        <ion-option value=\"Jeep\">Jeep</ion-option>\n        <ion-option value=\"Mini\">Mini</ion-option>\n        <ion-option value=\"Chrysler\">Chrysler</ion-option>\n        <ion-option value=\"Nissan\">Nissan</ion-option>\n        <ion-option value=\"Subaru\">Subary</ion-option>\n        <ion-option value=\"Honda\">Honda</ion-option>\n        <ion-option value=\"Acura\">Acura</ion-option>\n        <ion-option value=\"Dodge\">Dodge</ion-option>\n        <ion-option value=\"BMW\">BWM</ion-option>\n        <ion-option value=\"Porsche\">Porsche</ion-option>\n        <ion-option value=\"Buick\">Buick</ion-option>\n        <ion-option value=\"Cadillac\">Cadillac</ion-option>\n        <ion-option value=\"Fiat\">Fiat</ion-option>\n        <ion-option value=\"GMC\">GMC</ion-option>\n        <ion-option value=\"Infiniti\">Infiniti</ion-option>\n        <ion-option value=\"Jaguar\">Jaguar</ion-option>\n        <ion-option value=\"Kia\">Kia</ion-option>\n        <ion-option value=\"LandRover\">Land Rover</ion-option>\n        <ion-option value=\"Lexus\">Lexus</ion-option>\n        <ion-option value=\"Mazda\">Mazda</ion-option>\n        <ion-option value=\"Mitsubishi\">Mitsubishi</ion-option>\n        <ion-option value=\"Pontiac\">Pontiac</ion-option>\n        <ion-option value=\"Ram\">Ram</ion-option>\n        <ion-option value=\"Tesla\">Tesla</ion-option>\n        <ion-option value=\"Volkswagen\">Volkswagen</ion-option>\n        <ion-option value=\"Volvo\">Volvo</ion-option>\n        <ion-option value=\"Suzuki\">Suzuki</ion-option>\n        <ion-option value=\"Smart\">Smart</ion-option>\n        <ion-option value=\"Mercedes\">Mecedes</ion-option>\n        <ion-option value=\"Genesis\">Genesis</ion-option>\n      </select> -->\n\n   \n      <h5 class=label-input>Modelo</h5>\n      <ion-input [(ngModel)]=\"model\" type=“text” class=name></ion-input>\n   \n      <h5 class=label-input>Año</h5>\n      <ion-input [(ngModel)]=\"year\" type=“text” class=name></ion-input>\n   \n      <h5 class=label-input>Tablilla</h5>\n      <ion-input [(ngModel)]=\"licensePlateNum\" type=“text” class=name></ion-input>\n   \n      <h5 class=label-input>Color</h5>\n      <ion-input [(ngModel)]=\"color\" type=“text” class=name></ion-input>\n   \n    </ion-card>\n\n   </ion-content>\n\n  \n  <ion-button (click)=\"validateInputs()\" class=\"addbutton\">AGREGAR</ion-button>\n  "

/***/ }),

/***/ "./src/app/addcar/addcar.page.scss":
/*!*****************************************!*\
  !*** ./src/app/addcar/addcar.page.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".label-input {\n  margin-left: 5px;\n  font-weight: 300;\n  font-size: 12px; }\n\n.add-towing-card {\n  box-shadow: none; }\n\n.name {\n  border: 1px solid gray;\n  border-radius: 10px;\n  --padding-start: 5px; }\n\n.addbutton {\n  width: auto;\n  height: 100px;\n  background: #6561AB;\n  margin: 0; }\n\n.arrow-btn {\n  margin-top: 30px !important; }\n\nselect.selector {\n  height: 100%;\n  width: 100%;\n  max-width: 100% !important;\n  border: 1px solid gray;\n  border-radius: 100px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9qdWFuaXRhL0RvY3VtZW50cy9HaXRIdWIvZ3J1QXBwL3NyYy9hcHAvYWRkY2FyL2FkZGNhci5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxnQkFBZ0I7RUFDaEIsZ0JBQWdCO0VBQ2hCLGVBQWUsRUFBQTs7QUFHbkI7RUFDSSxnQkFBZ0IsRUFBQTs7QUFHcEI7RUFDQyxzQkFBc0I7RUFDdEIsbUJBQW1CO0VBQ25CLG9CQUFnQixFQUFBOztBQUdqQjtFQUNJLFdBQVc7RUFDWCxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLFNBQVMsRUFBQTs7QUFJYjtFQUNJLDJCQUEyQixFQUFBOztBQUUvQjtFQUNJLFlBQVc7RUFFWCxXQUFXO0VBQ1gsMEJBQTBCO0VBQzFCLHNCQUFzQjtFQUN0QixvQkFBb0IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2FkZGNhci9hZGRjYXIucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxhYmVsLWlucHV0IHtcbiAgICBtYXJnaW4tbGVmdDogNXB4O1xuICAgIGZvbnQtd2VpZ2h0OiAzMDA7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgfVxuXG4uYWRkLXRvd2luZy1jYXJkIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICAgfVxuXG4ubmFtZSB7XG4gYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiBib3JkZXItcmFkaXVzOiAxMHB4O1xuIC0tcGFkZGluZy1zdGFydDogNXB4O1xufVxuXG4uYWRkYnV0dG9ue1xuICAgIHdpZHRoOiBhdXRvO1xuICAgIGhlaWdodDogMTAwcHg7XG4gICAgYmFja2dyb3VuZDogIzY1NjFBQjtcbiAgICBtYXJnaW46IDA7XG4gICAgXG59XG5cbi5hcnJvdy1idG57XG4gICAgbWFyZ2luLXRvcDogMzBweCAhaW1wb3J0YW50O1xufVxuc2VsZWN0LnNlbGVjdG9ye1xuICAgIGhlaWdodDoxMDAlO1xuXG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyOiAxcHggc29saWQgZ3JheTtcbiAgICBib3JkZXItcmFkaXVzOiAxMDBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/addcar/addcar.page.ts":
/*!***************************************!*\
  !*** ./src/app/addcar/addcar.page.ts ***!
  \***************************************/
/*! exports provided: AddcarPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddcarPage", function() { return AddcarPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
/* harmony import */ var parse__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(parse__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");





var parse = __webpack_require__(/*! parse */ "./node_modules/parse/index.js");
var AddcarPage = /** @class */ (function () {
    // <ion-option value="Hyundai">Hyundai</ion-option>
    //     <ion-option value="Toyota">Toyota</ion-option>
    //     <ion-option value="Ford">Ford</ion-option>
    //     <ion-option value="Chevrolet">Chevrolet</ion-option>
    //     <ion-option value="Jeep">Jeep</ion-option>
    //     <ion-option value="Mini">Mini</ion-option>
    //     <ion-option value="Chrysler">Chrysler</ion-option>
    //     <ion-option value="Nissan">Nissan</ion-option>
    //     <ion-option value="Subaru">Subary</ion-option>
    //     <ion-option value="Honda">Honda</ion-option>
    //     <ion-option value="Acura">Acura</ion-option>
    //     <ion-option value="Dodge">Dodge</ion-option>
    //     <ion-option value="BMW">BWM</ion-option>
    //     <ion-option value="Porsche">Porsche</ion-option>
    //     <ion-option value="Buick">Buick</ion-option>
    //     <ion-option value="Cadillac">Cadillac</ion-option>
    //     <ion-option value="Fiat">Fiat</ion-option>
    //     <ion-option value="GMC">GMC</ion-option>
    //     <ion-option value="Infiniti">Infiniti</ion-option>
    //     <ion-option value="Jaguar">Jaguar</ion-option>
    //     <ion-option value="Kia">Kia</ion-option>
    //     <ion-option value="LandRover">Land Rover</ion-option>
    //     <ion-option value="Lexus">Lexus</ion-option>
    //     <ion-option value="Mazda">Mazda</ion-option>
    //     <ion-option value="Mitsubishi">Mitsubishi</ion-option>
    //     <ion-option value="Pontiac">Pontiac</ion-option>
    //     <ion-option value="Ram">Ram</ion-option>
    //     <ion-option value="Tesla">Tesla</ion-option>
    //     <ion-option value="Volkswagen">Volkswagen</ion-option>
    //     <ion-option value="Volvo">Volvo</ion-option>
    //     <ion-option value="Suzuki">Suzuki</ion-option>
    //     <ion-option value="Smart">Smart</ion-option>
    //     <ion-option value="Mercedes">Mecedes</ion-option>
    //     <ion-option value="Genesis">Genesis</ion-option>
    //   list: any = [
    //   {id: 1, name: 'one'},
    //   {id: 2, name: 'two'},
    //   {id: 3, name: 'three'}
    // ];
    // current = 2;
    function AddcarPage(location, alert) {
        this.location = location;
        this.alert = alert;
        parse.serverURL = 'https://parseapi.back4app.com/';
        parse__WEBPACK_IMPORTED_MODULE_2__["initialize"]("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    }
    AddcarPage.prototype.validateInputs = function () {
        if (this.licensePlateNum.length < 6 || this.licensePlateNum.length > 7) {
            this.eRROR = 'El número de tablilla debe ser un mínimo de 6 caracteres o un máximo de 7 caracteres ';
            this.errorAlert();
        }
        else {
            this.navigate();
        }
    };
    AddcarPage.prototype.ngOnInit = function () {
    };
    AddcarPage.prototype.car = function () {
        var _this = this;
        parse__WEBPACK_IMPORTED_MODULE_2__["Cloud"].run('addCar', { userId: parse__WEBPACK_IMPORTED_MODULE_2__["User"].current().id, color: this.color, make: this.make, year: this.year, model: this.model, licensePlateNum: this.licensePlateNum }).then(function (result) {
            _this.location.back();
        });
    };
    AddcarPage.prototype.navigate = function () {
        this.car();
    };
    AddcarPage.prototype.navigateBack = function () {
        this.location.back();
    };
    AddcarPage.prototype.errorAlert = function () {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var alert;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alert.create({
                            header: 'Error',
                            message: this.eRROR,
                            buttons: [
                                {
                                    text: 'OK',
                                    cssClass: 'greenBtn',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }
                            ]
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
    AddcarPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-addcar',
            template: __webpack_require__(/*! ./addcar.page.html */ "./src/app/addcar/addcar.page.html"),
            styles: [__webpack_require__(/*! ./addcar.page.scss */ "./src/app/addcar/addcar.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_3__["Location"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["AlertController"]])
    ], AddcarPage);
    return AddcarPage;
}());



/***/ })

}]);
//# sourceMappingURL=addcar-addcar-module.js.map
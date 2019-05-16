import {
  Component,
  OnInit
} from '@angular/core';
import {
  Location
} from "@angular/common";
import {
  GruproviderService
} from "./../gruprovider.service";
import {
  NavController
} from "@ionic/angular";
import * as Parse from 'parse';

let parse = require('parse');

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.page.html',
  styleUrls: ['./edit-car.page.scss'],
})
export class EditCarPage implements OnInit {

  make: any;
  model: any;
  year: any;
  licensePlateNum: any;
  color: any;
  carId: any;

  constructor(public location: Location, public provider: GruproviderService, public navigate: NavController) {
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
  }

  ngOnInit() {
    console.log(this.provider.car);
    this.getCar(this.provider.car);

  }

  navigateBack() {
    this.location.back();
  }

  getCar(car: any) {
    car = car.toJSON()
    this.licensePlateNum = car.licensePlateNum;
    this.model = car.model;
    this.make = car.make;
    this.year = car.year;
    this.color = car.color;
    this.carId = car.objectId;
    console.log(this.model);
  }

  save() {
    Parse.Cloud.run('editCar', {
      carId: this.carId,
      color: this.color,
      make: this.make,
      year: this.year,
      model: this.model,
      licensePlateNum: this.licensePlateNum
    }).then((result) => {
      console.log(result);
      this.navigate.navigateRoot('/mi-vehiculo');
    }, (error) =>{
      console.log(error);
    });
  }

  // edit() {
  //   this.save();
  //   this.navigate.navigateRoot('/mi-vehiculo');
  // }


}
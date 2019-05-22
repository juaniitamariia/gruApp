import {
  Component,
  OnInit
} from '@angular/core';
import {
  Location
} from "@angular/common";
import {
  NavController
} from "@ionic/angular";
import * as Parse from 'parse';
import {
  RegistroPage
} from "./../registro/registro.page";
import { response } from 'express';
import { GruproviderService } from "./../gruprovider.service";

let parse = require('parse');


@Component({
  selector: 'app-mi-vehiculo',
  templateUrl: './mi-vehiculo.page.html',
  styleUrls: ['./mi-vehiculo.page.scss'],
})
export class MiVehiculoPage implements OnInit {

  user: any;
  cars: any;
  deletedCar: any;

  constructor(public location: Location, public nav: NavController, public registroPage: RegistroPage, public provider : GruproviderService) {
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
  }

  ngOnInit() {
    this.getCars();
  }

  navigateBack() {

    this.location.back();

  }

  getCars(){
    Parse.Cloud.run('getCars', {
      userId: Parse.User.current().id
    }).then((result) => {
      this.cars = result;
      // this.provider.car = result;
      // console.log(this.cars);
      // console.log(this.provider.car);
    });
  }

  removeCar(selectedCar:any){
    let index : any;
    index = this.cars.indexOf(selectedCar); console.log(index);
    console.log('enter');
    Parse.Cloud.run('deleteQuotes', {carId: selectedCar.id}).then((result) =>  
    {
      this.cars.splice(index, 1);
      console.log(result);
  },(error) => {
    console.log(error);
  });
  }

  edit(selectedCar:any){
    this.provider.car = selectedCar;
    console.log(this.provider.car);
    this.nav.navigateRoot('/edit-car');
    
  }
}
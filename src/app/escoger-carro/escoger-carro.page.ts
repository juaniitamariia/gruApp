import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { NavController } from "@ionic/angular";
import * as Parse from 'parse';
import { GruproviderService } from "./../gruprovider.service";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

let parse = require('parse');


@Component({
  selector: 'app-escoger-carro',
  templateUrl: './escoger-carro.page.html',
  styleUrls: ['./escoger-carro.page.scss'],
})
export class EscogerCarroPage implements OnInit {

  constructor(public location : Location, public nav : NavController, public provider : GruproviderService,
              public nativePageTransitions: NativePageTransitions) { 
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
  }

  user: any;
  cars : any;

  ngOnInit() {
    this.getCars();
  }

  navigateBack(){
    this.transitionBack();
    this.location.back();
  }

  navigate(selectedcar:any){

    if (this.provider.service == 'especial'){
      this.transition();
      this.nav.navigateRoot('/photo');
    }else{
      this.transition();
      this.provider.selectedCar = selectedcar;
      console.log(selectedcar);
      this.nav.navigateRoot('/pagar');
    }
    
  }

  add(){
    this.transition();
    this.nav.navigateRoot('/addcar');
  }

  getCars(){
    Parse.Cloud.run('getCars', {userId: Parse.User.current().id}).then((result) =>  
    {
     this.cars=result;
  });
  }

  transition(){
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 200,
      slowdownfactor: -1,
      slidePixels: 20,
      iosdelay: 100, 
      androiddelay: 100,
     }
     this.nativePageTransitions.slide(options);
  }
  
  transitionBack(){
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 200,
      slowdownfactor: -1,
      slidePixels: 20,
      iosdelay: 100, 
      androiddelay: 100,
     }
     this.nativePageTransitions.slide(options);
  }

  

}

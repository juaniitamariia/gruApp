import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { Location } from "@angular/common";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { AlertController } from '@ionic/angular';
import * as Parse from 'parse';
import { GruproviderService } from "./../gruprovider.service";


let parse = require('parse');


@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage implements OnInit {

  currentUser : any;
  servicio : any = this.provider.service;
  marcaCarro : any;
  modeloCarro : any;
  tablilla : any;
  total: number;
  totalCost: number;
  millas: any = this.provider.distance;
  constructor (public location : Location, public nav: NavController, public provider : GruproviderService,
                public nativePageTransitions: NativePageTransitions, public alerCtrl : AlertController ) { 
                  parse.serverURL = 'https://parseapi.back4app.com/';
                  Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
                }

  ngOnInit() {
    this.userInfo();
    console.log(this.provider.service);
    //this.totalCost = this.provider.distance * 3;
  }

  navigateBack(){
    this.transition();
    this.location.back();
  }

  transition(){
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 200,
      slowdownfactor: -1,
      slidePixels: 20,
      iosdelay: 100, 
      androiddelay: 100,
     }
  console.log('transition');
   this.nativePageTransitions.slide(options);
  }
  
  async Listo() { //Alerta de pedido exitoso
    const alert = await this.alerCtrl.create({
      header: '¡Pedido Exitoso!',
      message: 'Tu pedido ya se envió a los proveedores mas cercanos. En menos de 2 minutos tendrá una comfirmación de un proveedor.',
      buttons: ['¡Listo!']
    });

    await alert.present();

    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 200,
      slowdownfactor: -1,
      slidePixels: 20,
      iosdelay: 100, 
      androiddelay: 100,
     }
  console.log('transition');
   this.nativePageTransitions.slide(options);
   this.nav.navigateRoot("/serviceoptions"); //pedido exitoso lleva a pagina de rating del servicio
  } 

  navigate(){
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 200,
      slowdownfactor: -1,
      slidePixels: 20,
      iosdelay: 100, 
      androiddelay: 100,
     }
  console.log('transition');
   this.nativePageTransitions.slide(options);
    this.nav.navigateRoot("/escoger-pago");
  }

  userInfo(){
    this.currentUser = Parse.User.current().get('name')
    this.marcaCarro = this.provider.selectedCar.get('make')
    this.modeloCarro = this.provider.selectedCar.get('model')
    this.tablilla = this.provider.selectedCar.get('licensePlateNum')
    console.log(this.currentUser);

      if(this.provider.service == 'Grua' || this.provider.service == 'Servicio Especial'){
        this.total = this.provider.total;
        this.totalCost = this.provider.distance * 3;
        console.log("total dentro de la condicion:" + this.total)
      }else{
      this.total = this.provider.price;
      this.provider.total = this.provider.price;
      console.log(this.provider.price);
      }
  }
}

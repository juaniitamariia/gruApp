import { Component, OnInit } from '@angular/core';
import { MenuController} from '@ionic/angular';
import {NavController} from '@ionic/angular';
import { PopoverController} from '@ionic/angular';
import { PopoverComponent } from "./../popover/popover.component";
import { GruproviderService } from "../gruprovider.service";
import * as mapboxgl from 'mapbox-gl';
import { AlertController } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { Location } from "@angular/common";


@Component({
  selector: 'app-bookingservice',
  templateUrl: './bookingservice.page.html',
  styleUrls: ['./bookingservice.page.scss'],
})
export class BookingservicePage implements OnInit {
 
  map2: mapboxgl.Map;
  mapboxgl:any;
  service:any;

  constructor(public menu: MenuController,
    private nav: NavController,
    public grupovider: GruproviderService, 
    public popoverController: PopoverController, public alerCtrl : AlertController, public nativePageTransitions: NativePageTransitions,
    public location : Location) { 

        this.service = this.grupovider.service;
        console.log(this.service);

        mapboxgl.accessToken = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';
              }

  ngOnInit() {   
    this.loadMap(); //loads map
    console.log('is loading map'); 
  }

  loadMap(){
   
    this.map2= new mapboxgl.Map({
      container: 'map2',
      style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',
     // zoom: 13,
      //center: [this.lng, this.lat]
    });
    
    console.log(this.map2);
  }

  navigate(){ //navigates back
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
   this.location.back();
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
    this.nav.navigateRoot("/rating"); //pedido exitoso lleva a pagina de rating del servicio
  } 
 
  Cancel(){ //cancelar el servicio. Navega al menu principal
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
    this.nav.navigateRoot("/sidemenu");
  }

  goFoward(){
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
}

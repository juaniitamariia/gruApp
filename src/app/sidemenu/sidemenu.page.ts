import {
  ViewChild,
  Component,
  OnInit
} from '@angular/core';
import {
  MenuController
} from '@ionic/angular';
import {
  NavController
} from '@ionic/angular';
import {
  Router
} from "@angular/router";
import {
  GruproviderService
} from "../gruprovider.service";
import * as mapboxgl from 'mapbox-gl';
import {
  AlertController
} from '@ionic/angular';
import {
  SocialSharing
} from '@ionic-native/social-sharing/ngx';
import {
  NativePageTransitions,
  NativeTransitionOptions
} from '@ionic-native/native-page-transitions/ngx';
import {
  PopoverController
} from '@ionic/angular';
import * as Parse from 'parse';
import {
  ModalController
} from '@ionic/angular';
import {
  Geolocation
} from '@ionic-native/geolocation/ngx';
import {
  PopoverComponent
} from "./../popover/popover.component";
import {
  ShareComponent
} from "./../share/share.component";
import {
  getAllRouteGuards
} from '@angular/router/src/utils/preactivation';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

let parse = require('parse');

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  // @ViewChild('map')
  mapindex: mapboxgl.Map;
  mapboxgl: any;
  service: string;
  directions: any;
  user: any;
  photo: any;
  start :any;
  coordenates : any[];
  requestCount: any;
  

  constructor(public menu: MenuController,
    public nav: NavController, public router: Router,
    public gruprovider: GruproviderService, public viewchild: ViewChild,
    public alerCtrl: AlertController, private socialSharing: SocialSharing,
    public nativePageTransitions: NativePageTransitions, public popoverController: PopoverController,
    public modalCtrl: ModalController, public geolocation: Geolocation) {
    mapboxgl.accessToken = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
  }

  ngOnInit() {

    this.loadMap();
    this.getName();
    this.getPhoto();
    this.getLocation();
    this.getQuote();
  }

  ngOnDestroy(){
    this.mapindex.remove();
  }


  loadMap() {
    this.mapindex = new mapboxgl.Map({
      container: 'mapindex',
      style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5'
    });
    this.mapindex.dragRotate.disable();
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true

    });
    
    this.mapindex.addControl(geolocate);
    this.mapindex.on('load', function () {
      geolocate.trigger();
    });
  }

  metodoPago(){
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

    this.nav.navigateRoot('/metodo-pago');
  }

  getQuote(){

    this.requestCount = this.gruprovider.requestQuantity; //cantidad de request 

  }

  profile(){
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

    this.nav.navigateRoot('/profile');
  }


  alerts(service: string) {
    console.log("usuario nuevo??" + this.gruprovider.whatUser)
    if(this.gruprovider.whatUser == true){
      this.serviceRequested(); //ya solicitaste un servicio, el usuario debe esperar
    }else{
      console.log("pop working");
      this.gruprovider.service = service;
      console.log(service);
  
      if (service == 'grua' || service == 'goma' || service == 'gasolina' || service == 'llaves' || service == 'bateria') {
        this.presentPopover();
      }
      
      if (service == 'goma') {
        this.Goma();
      } else if (service == 'gasolina') {
        this.Gasolina();
      } else if (service == 'especial') {
        this.Especial();
      } else if (service == 'llaves') {
        this.Llaves();
      } else if (service == 'bateria') {
        this.Bateria();
      }
  
    }
   
  }

  async serviceRequested() {
    const alert = await this.alerCtrl.create({
      header: '¡ALERTA!',
      message: 'Debes esperar que el grüero acepte tu solicitud de servicio',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }]
    });

    await alert.present();
  }



  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    console.log("is working");
  }

  navlocationPage(service: string) { //funcion que cambia el servicio
    this.gruprovider.map = this.mapindex;
    this.gruprovider.mapboxgl = this.mapboxgl;
    this.gruprovider.service = service;
    console.log(service);


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
    console.log('transition working');
    this.nav.navigateForward(["/locatio-marker"]); //cambia de pagina

  }

  async Goma() {
    const alert = await this.alerCtrl.create({
      header: '¡ALERTA!',
      message: 'Para este servicio solo cambiamos la goma por la repuesta de su vehículo o le proporcionamos aire.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }]
    });

    await alert.present();
    //this.navigateFoward();
  }

  async Gasolina() {
    const alert = await this.alerCtrl.create({
      header: '¡ALERTA!',
      message: 'Le llevamos solo $5 de gasolina para que pueda llegar a la estación de gasolina más cercana. No aplica para gasolina diesel.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }]
    });

    await alert.present();
    //this.navigateFoward();

  }

  async Especial() {
    this.presentPopover();
    const alert = await this.alerCtrl.create({
      header: '¡ALERTA!',
      message: 'Si su vehículo se encuentra fuera de carretera, no está en un sótano y tampoco en un multipiso debe ser cotizado como un servicio especial. Al dar Ok lo estará llevando a servicio especial para que haga todo el proceso.',
      buttons: [{
        text: 'Ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      },
    ],
      
    });

    await alert.present();
  }

  async Llaves() {
    const alert = await this.alerCtrl.create({
      header: '¡ALERTA!',
      message: 'Abrimos la principal para que pueda tener acceso al vehículo.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }]
    });

    await alert.present();
    //this.navigateFoward();

  }

  async Bateria() {
    const alert = await this.alerCtrl.create({
      header: '¡ALERTA!',
      message: 'En este servicio no reemplazamos la batería, sólo recargamos su misma batería.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }]
    });
    await alert.present();
    //this.navigateFoward();
  }

  async inviteFriends() {

    const modal = await this.modalCtrl.create({
      component: ShareComponent,
      componentProps: {
        value: 123
      }
    });
    return await modal.present();
  }


  

  navigateFoward() {
    this.nav.navigateRoot('/escoger-pago');

  }

  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);

      this.nav.navigateRoot('/registro');

    }, err => {
      //console.log('Error logging out', err);

    })
  }


  async presentPopover(){ //Popover de detalles del carro
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      //event: event,
      translucent: false,
      backdropDismiss: false
    });
    console.log("pop working");
    return await popover.present();

  }


  getName() {

    Parse.Cloud.run('getName', {
      userId: Parse.User.current().id
    }).then((result) => {
      this.user = result;
      console.log(this.user);

    }, (error) => {
      console.log(error);
    });
  }


  getPhoto() {
    Parse.Cloud.run('getUser', {
      userId: Parse.User.current().id
    }).then((result) => {
      if (result.get('profilePic') == null) {
        console.log("photo object is null");
        this.photo = "assets/profile.svg";

      } else {
        this.photo = result.get('profilePic');
      }
      console.log(this.photo);
    })
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

    console.log('transition');
    this.nativePageTransitions.slide(options);
  }

  navHistorial(){
    this.transition();
    this.nav.navigateRoot('/historial');
  }

  miVehiculo(){
    this.transition();
    this.nav.navigateRoot('/mi-vehiculo');
  }
  
  solicitudes(){
    this.transition();
    this.nav.navigateRoot('/request');
  }

  close(){
    this.menu.close('custom');
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.gruprovider.lat = resp.coords.latitude
      this.gruprovider.long = resp.coords.longitude
      console.log(this.gruprovider.long, this.gruprovider.lat);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  
}
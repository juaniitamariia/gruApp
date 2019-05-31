import {
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
  GruproviderService
} from "../gruprovider.service";
import * as mapboxgl from 'mapbox-gl';
import {
  NativePageTransitions,
  NativeTransitionOptions
} from '@ionic-native/native-page-transitions/ngx';
import {
  PopovergruaComponent
} from "./../popovergrua/popovergrua.component";
import {
  PopoverController
} from '@ionic/angular';
import {
  PopoverComponent
} from '../popover/popover.component';
import {
  PopoverDescriptionComponent
} from '../popover-description/popover-description.component';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  Geolocation
} from '@ionic-native/geolocation/ngx';
import {
  AlertController
} from "@ionic/angular";
import { Location } from "@angular/common";
import * as Parse from 'parse';

let MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

@Component({
  selector: 'app-change-location',
  templateUrl: './change-location.page.html',
  styleUrls: ['./change-location.page.scss'],
})
export class ChangeLocationPage implements OnInit {

  changeMap: mapboxgl.Map;
  mapboxgl: any;
  require: any;
  service: string;

  //directions : any;
  lat: any;
  long: any;
  end: any;
  start: any;
  destino: string = "";
  lugar: string;
  endingP: boolean = false;
  mapboxDirections: any;
  directions: any;
  map: any;
  destination: any;
  distance: number;
  distanceCost: number;
  time: number;
  whatUser: boolean;


  constructor(public menu: MenuController,
    private nav: NavController, public gruprovider: GruproviderService,
    public nativePageTransitions: NativePageTransitions, public popover: PopoverController,
    public popoverDescription: PopoverDescriptionComponent,public geolocation: Geolocation, public alertCtrl: AlertController, public location: Location) { }

  ngOnInit() 
  {
    this.loadMap();
    this.start = [this.gruprovider.long, this.gruprovider.lat];
  }
  ngOnDestroy() {
    this.changeMap.remove();
  }

  setDestino(){
    this.destination = this.mapboxDirections.setDestination(this.destino);
    this.distanceEquation();
  }

  loadMap() {

    this.changeMap = new mapboxgl.Map({
      container: 'changeMap',
      style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5'
    });  //añadir el mapa

    this.changeMap.dragRotate.disable(); //evita que el mapa rote
    const geolocate = new mapboxgl.GeolocateControl({ 
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    }); //punto azul de localización actual del usuario

    this.changeMap.addControl(geolocate); //añade el control (cuadro) 

    this.mapboxDirections = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: {
        profileSwitcher: false,
        instructions: false,
        inputs: false
    }
    }); //atributo de añadir direcciones al mapa 

    this.changeMap.addControl(this.mapboxDirections, 'bottom-left'); //añade control de las direcciones
    this.geolocation.getCurrentPosition().then((resp) => {
      
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let self = this; //scope
    this.changeMap.on('load', function () {
      self.mapboxDirections.setOrigin([self.gruprovider.long, self.gruprovider.lat]) //latitud y longitud de la ubicacion actual
      geolocate.trigger();
    });

    console.log("Map finished loading");
    console.log(this.destino);
    this.mapboxDirections.on("route", e => {
      let routes = e.route
      this.gruprovider.time = Math.ceil(routes[0].duration/60)
      // Each route object has a distance property
      this.distance = Math.ceil(routes[0].distance * 0.00062137);
      this.gruprovider.distance = this.distance; //guarda distancia (MILLAS)
      this.gruprovider.destination = this.destino; //guarda destino (PUNTOP B)
      console.log("Route lengths", routes);
      console.log('Millas', this.distance);
      console.log(this.time)
  })
  }

    //**navegar para pagina principal**
  navigate() {

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


  //Alerta cuando el usario no ha especificado un destino
  async emptyDestinou() {
    const alert = await this.alertCtrl.create({
      header: '¡ALERTA!',
      message: 'No ha especificado un destino.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
          //this.popController.dismiss();
          //this.nav.navigateRoot("/sidemenu");
        }
      }]
    });

    await alert.present();
  }

//**/funcion que cambia el servicio**
async changePage() { 
  if(this.mapboxDirections.getDestination().geometry == null){
    console.log("no puedes pasar")
    this.emptyDestinou();
    return;
  }

    console.log(this.mapboxDirections.getOrigin()) //extrae el origen de la ruta
    console.log(this.mapboxDirections.getDestination()) //extrae el destino de la ruta

    this.gruprovider.service = this.service;
    this.gruprovider.destination = this.mapboxDirections.getDestination().geometry.coordinates; //coordenadas del punto B(destino) en un array

    console.log("LEGS: " + this.mapboxDirections.getDestination().routes);
    this.distanceEquation();
     

    if(this.gruprovider.service == 'Servicio Especial'){
        this.nav.navigateRoot("/escoger-carro")
    }else{
      this.presentPopover(); 
    }

   
  
}

//Funcion ejecutada al momento de seleccionar el boton de Solicitar

async presentPopover() { //Popover de detalles del carro
  const popover = await this.popover.create({
    component: PopoverDescriptionComponent,
    translucent: false
  });
  console.log("pop working");
  return await popover.present();

}

//Funcion que calcula el costo de distancia por millas 
distanceEquation(){
  

  this.gruprovider.precioMilla = (this.distance * 3);
  console.log("Precio Milla:", this.gruprovider.precioMilla);

  this.distanceCost = (this.distance * 3) + this.gruprovider.price; //multiplica $3 x total de millas
  console.log(this.distanceCost);

  this.gruprovider.total = this.gruprovider.precioMilla;

  console.log(this.gruprovider.total);

  console.log(this.gruprovider.serviceId);


  if(this.gruprovider.total != null)
  {
    console.log("Entrando al condicional");

    Parse.Cloud.run('updateServicePrice', {
      serviceId: this.gruprovider.serviceId,
      servicePrice: this.gruprovider.total
    }).then((result) => {
      console.log(result);
      
    }, (error) =>{
      console.log(error);
    });
  }
}






}

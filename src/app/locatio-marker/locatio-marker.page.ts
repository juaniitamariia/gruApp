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
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  Geolocation
} from '@ionic-native/geolocation/ngx';
import {
  AlertController
} from "@ionic/angular";

//let mapboxDirections = require('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions');
let MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');

@Component({
  selector: 'app-locatio-marker',
  templateUrl: './locatio-marker.page.html',
  styleUrls: ['./locatio-marker.page.scss'],
})
export class LocatioMarkerPage implements OnInit {

  map1: mapboxgl.Map;
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

  constructor(public menu: MenuController,
    private nav: NavController, public gruprovider: GruproviderService,
    public nativePageTransitions: NativePageTransitions, public popover: PopoverController,
    public geolocation: Geolocation, public alertCtrl: AlertController) {

    this.service = this.gruprovider.service; //igualando lo que esta en el provider
    mapboxgl.accessToken = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';

  }

  ngOnInit() {

    this.loadMap();
    this.start = [this.gruprovider.long, this.gruprovider.lat];
    //console.log('coordenadas: ' + this.start);
    //console.log(this.directions.setDestination());
  }
  ngOnDestroy() {
    this.map1.remove();
  }

  setDestino() {
    this.destination = this.mapboxDirections.setDestination(this.destino)
  }

  loadMap() {

    this.map1 = new mapboxgl.Map({
      container: 'map1',
      style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5'
    });

    this.map1.dragRotate.disable();
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    this.map1.addControl(geolocate);

    this.mapboxDirections = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: {
        profileSwitcher: false,
        instructions: false,
        inputs: false
    }
    });

    this.map1.addControl(this.mapboxDirections, 'bottom-left');
    this.geolocation.getCurrentPosition().then((resp) => {
      
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let self = this; //scope
    this.map1.on('load', function () {
      self.mapboxDirections.setOrigin([self.gruprovider.long, self.gruprovider.lat])
      geolocate.trigger();
    });

    console.log("Map finished loading");
    console.log(this.destino);
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

    this.nav.navigateRoot("/sidemenu");

  }

  changePage() { //funcion que cambia el servicio
    if(this.mapboxDirections.getDestination().geometry == null){
      console.log("no puedes pasar")
      return;
    }
    console.log(this.mapboxDirections.getOrigin())
    console.log(this.mapboxDirections.getDestination())
    console.log(this.mapboxDirections.get)

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
    this.gruprovider.service = this.service;
    //this.nav.navigateRoot("/escoger-carro");
    //service = this.grupovider.service;
    //console.log(service);
  }

  // geocoder(){
  //   var MapboxGeocoder = require('@mapbox/mapbox-gl-geocoder');
  //   this.map1.addControl(new MapboxGeocoder({
  //     accessToken: mapboxgl.accessToken
  //     }));
  // }

  //Funcion ejecutada al momento de seleccionar el boton de Solicitar

  async presentPopover() { //Popover de detalles del carro
    const popover = await this.popover.create({

      component: PopovergruaComponent,
      //event: event,
      translucent: false
    });
    console.log("pop working");
    return await popover.present();

  }

  transition() {
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



}
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {NavController} from '@ionic/angular';
import { GruproviderService } from "../gruprovider.service";
import * as mapboxgl from 'mapbox-gl';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { PopovergruaComponent } from "./../popovergrua/popovergrua.component";
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-mark-location',
  templateUrl: './mark-location.page.html',
  styleUrls: ['./mark-location.page.scss'],
})


export class MarkLocationPage implements OnInit {

  mapMark: mapboxgl.Map;
  mapboxgl:any;
  require : any;
  service : string;
  
  constructor(public menu: MenuController,
    private nav : NavController, public grupovider : GruproviderService,
    public nativePageTransitions: NativePageTransitions, public popover : PopoverController,
    private geolocation: Geolocation) {

    this.service = this.grupovider.service; //igualando lo que esta en el provider
    mapboxgl.accessToken = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';

    }

  ngOnInit() {
    this.loadMap();
    this.getLocation();
  }

  loadMap(){
   

    this.mapMark = new mapboxgl.Map({
      container: 'mapMark',
      style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',
     // zoom: 13,
      //center: [this.lng, this.lat]
    });
    
    console.log(this.mapMark);

    this.mapMark.dragRotate.disable();
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    
    this.mapMark.addControl(geolocate);

    this.mapMark.on('load', function () {
      geolocate.trigger();
    });

   }

  navigate(){
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

  changePage(){ //funcion que cambia el servicio

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
    console.log(this.service);
    this.grupovider.service = this.service;
    console.log(this.grupovider.service);
    //this.presentPopover();
    this.nav.navigateRoot("/escoger-carro");
    //service = this.grupovider.service;
    //console.log(service);
  }

  getLocation(){

    this.geolocation.getCurrentPosition().then((resp) => {
      this.grupovider.lat = resp.coords.latitude;
      this.grupovider.long = resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
    console.log('Notas: ' + this.grupovider.messageNotes);
  }

}


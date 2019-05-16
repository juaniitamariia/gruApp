import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import * as mapboxgl from 'mapbox-gl';
import { GruproviderService } from "../gruprovider.service";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-locationon',
  templateUrl: './locationon.page.html',
  styleUrls: ['./locationon.page.scss'],
})
export class LocationonPage implements OnInit {
  map: mapboxgl.Map;
  mapboxgl:any;

  constructor( public nav : NavController, public locationAccuracy: LocationAccuracy, private geolocation: Geolocation, private gruprovider : GruproviderService, private nativePageTransitions: NativePageTransitions) { 

    this.map = this.gruprovider.map;
    this.mapboxgl = this.gruprovider.mapboxgl;
  }

  ngOnInit() {
    
  }

  loadMap(){

    this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',
    // zoom: 13,
    //center: [this.lng, this.lat]
  });}
  enableLocation(){
    
    
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }
    
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
     });

    console.log("location enabled");
    this.navigate();
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
    this.nav.navigateRoot('/registro');
    
   
   }
}

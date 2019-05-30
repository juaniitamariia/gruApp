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
import { Location } from "@angular/common";

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


  constructor() { }

  ngOnInit() {
  }

}

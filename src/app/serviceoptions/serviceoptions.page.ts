import {
  Component,
  OnInit
} from '@angular/core';
import {
  GruproviderService
} from "../gruprovider.service";
import {
  MenuController,
  NavController
} from '@ionic/angular';
import {
  PopoverController
} from '@ionic/angular';
import {
  AlertController
} from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import * as Parse from 'parse';

let parse = require('parse');


@Component({
  selector: 'app-serviceoptions',
  templateUrl: './serviceoptions.page.html',
  styleUrls: ['./serviceoptions.page.scss'],
})
export class ServiceoptionsPage implements OnInit {

  service: string;
  mapboxgl: any;
  map4: any;

  disabled: boolean = true;

  constructor(public grupovider: GruproviderService, public menu: MenuController,
    public popoverAlert: PopoverController, public alerCtrl: AlertController,
    public nav: NavController) {

    this.service = this.grupovider.service;
    console.log(this.service);

    mapboxgl.accessToken = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';

    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
  }

  ngOnInit() {
    this.loadMap();
    this.menu.swipeEnable(false);
  }

  loadMap() {

    this.map4 = new mapboxgl.Map({
      container: 'map4',
      style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',
     
    });

    console.log(this.map4);


    Parse.Cloud.run('getDriverLocation', {} )
      .then((result) => {
        console.log(result.get('currentlocation'))

      });


    var url = 'https://wanderdrone.appspot.com/';
    this.map4.on('load', function () {
      window.setInterval(function () {
        this.map4.getSource('drone').setData(url);
      }, 2000);

      this.map4.addSource('drone', {
        type: 'geojson',
        data: url
      });
      this.map4.addLayer({
        "id": "drone",
        "type": "symbol",
        "source": "drone",
        "layout": {
          "icon-image": "rocket-15"
        }
      });
    });


    

  }

  async Cancel() {
    const alert = await this.alerCtrl.create({
      header: 'Cancelar',
      message: '¿Estás seguro que quieres cancelar el servicio?',
      buttons: [{
          text: 'No',
          role: 'navMenu()',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Si',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.grupovider.whatUser = false;
            this.navMenu();
          }
        }
      ]
    });

    await alert.present();
  }

  navMenu() {
    this.nav.navigateRoot("/sidemenu");
  }

  async presentAlertPrompt() {
    const alert = await this.alerCtrl.create({
      header: 'Servicio no brindado',
      inputs: [{
        name: 'notas',
        type: 'text',
        placeholder: 'Notas'
      }],

      buttons: [{
        text: 'Someter',
        cssClass: 'greenBtn',
        handler: () => {
          console.log('Confirm Cancel');
          this.nav.navigateRoot('/sidemenu');
        }
      }]
    });

    await alert.present();


  }


}
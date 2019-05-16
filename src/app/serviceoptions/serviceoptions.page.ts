import { Component, OnInit } from '@angular/core';
import { GruproviderService } from "../gruprovider.service";
import { MenuController, NavController} from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-serviceoptions',
  templateUrl: './serviceoptions.page.html',
  styleUrls: ['./serviceoptions.page.scss'],
})
export class ServiceoptionsPage implements OnInit {

  service: string;
  mapboxgl:any;
  map4: any;

  disabled: boolean = true;
  
  constructor(public grupovider : GruproviderService, public menu: MenuController,
              public popoverAlert: PopoverController, public alerCtrl : AlertController,
              public nav : NavController) {

    this.service = this.grupovider.service;
    console.log(this.service);

    mapboxgl.accessToken = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';

   }

  ngOnInit() {
    this.loadMap();
    this.menu.swipeEnable(false);
  }

  loadMap(){
    
    this.map4 = new mapboxgl.Map({
      container: 'map4',
      style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',
     //zoom: 13,
     //center: [this.lng, this.lat]
    });
    
    console.log(this.map4);

  }

  openCustom(){
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
    console.log("is working");
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
          this.navMenu();
        }
      }]
    });

    await alert.present();
  }

  navMenu(){
    this.nav.navigateRoot("/sidemenu");
  }

  async presentAlertPrompt() {
    const alert = await this.alerCtrl.create({
      header: 'Servicio no brindado',
      inputs: [
        {
          name: 'notas',
          type: 'text',
          placeholder: 'Notas'}],

          buttons: [
          {
            text: 'Someter',
            cssClass: 'greenBtn',
            handler: () => {
              console.log('Confirm Cancel');
              this.nav.navigateRoot('/sidemenu');
            }
          }
        ]
      });
  
      await alert.present();


    }

    
}

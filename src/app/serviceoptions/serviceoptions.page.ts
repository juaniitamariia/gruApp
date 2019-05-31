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
  NativePageTransitions,
  NativeTransitionOptions
} from '@ionic-native/native-page-transitions/ngx';
import {
  PopoverController
} from '@ionic/angular';
import {
  AlertController
} from '@ionic/angular';
import * as mapboxgl from 'mapbox-gl';
import * as Parse from 'parse';
import * as moment from 'moment'

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
  cards: any; //variable de tarjetas

  disabled: boolean = true;

  constructor(public grupovider: GruproviderService, public menu: MenuController,
    public popoverAlert: PopoverController, public alerCtrl: AlertController,
    public nav: NavController, public provider: GruproviderService) {

    this.service = this.provider.service;
    console.log(this.provider.service);
    console.log("Test!!");

    mapboxgl.accessToken = 'pk.eyJ1IjoianJvc2FyaW8yNDEiLCJhIjoiY2pzdXF6NmJiMmgzNzQ5cnJkMjFsa285NSJ9.a6Z7HjeR6q74TBxQhXPy5A';

    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
  }

  ngOnInit() {
    this.loadMap();
    this.menu.swipeEnable(false);
  }

  goToLocation(serviceId: any) {
    console.log("Entrando al goToLocation");
    this.nav.navigateRoot('/change-location');
  }


  makePayment() { //enviar parametros al Cloud Function

    if (this.provider.card == null) {
      this.errorAlert("Tarjeta no ha sido seleccionada.");
      console.log('no hay tarjeta seleccionada');
      return;
    } else {
      console.log('seleccionada')
      console.log(this.provider.total)
      Parse.Cloud.run('purchase', {
        amount: this.provider.total,
        cardId: this.provider.card.id,
        customerId: this.provider.card.customer,
        service: this.provider.service
      }).then((result) => {
        console.log(result);
      }, (error) => {
        this.errorAlert(error);
        console.log(error);
      });
    }
  }

  async errorAlert(error: any) {
    const alert = await this.alerCtrl.create({
      header: 'Error',
      message: error,
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

  transition() { //transicion para las paginas
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 200,
      slowdownfactor: -1,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 100,
    }
  }



  loadMap() {

    this.map4 = new mapboxgl.Map({
      container: 'map4',
      style: 'mapbox://styles/jrosario241/cjsuqzyev4cip1fo3cv5c3vr5',

    });

    console.log(this.map4);


    // Parse.Cloud.run('getDriverLocation', {})
    //   .then((result) => {
    //     console.log(result.get('currentlocation'))
    //   });

    



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
    
    Parse.Cloud.run('deleteService', {
     serviceId: this.provider.serviceId
    }).then((result) => {
      console.log(result);
    }, (error) => {
      this.errorAlert(error);
      console.log(error);
    });
    //this.deleteRequest();
    this.nav.navigateRoot("/sidemenu");
  }

  // deleteRequest(){
  //   var requests;
  //   requests = this.provider.requests;
  //   //let index : any;
  //   //index = requests.indexOf(this.provider.selectedRequest); console.log(index);
  //   //requests.splice(index, 1);
  // }

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
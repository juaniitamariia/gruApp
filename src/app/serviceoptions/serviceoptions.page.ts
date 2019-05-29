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
    public nav: NavController,public provider: GruproviderService) {

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

  goToLocation()
  {
    this.nav.navigateRoot('/location-marker');
  }


  makePayment(){ //enviar parametros al Cloud Function

    if(this.provider.card == null){
      this.errorAlert("Tarjeta no ha sido seleccionada.");
      console.log('no hay tarjeta seleccionada');
      return;
    }else{
      console.log('seleccionada')
      console.log(this.provider.total)
      Parse.Cloud.run('purchase', {
        amount: this.provider.total,
        cardId: this.provider.card.id,
        customerId: this.provider.card.customer,
        service: this.provider.service
      }).then((result) => {
        console.log(result);
        Parse.Cloud.run('createServiceRequest', {
          car: this.provider.selectedCar.id,
          latitud: this.provider.lat,
          pointB: this.provider.destination,
          millas : this.provider.distance,
          longitud: this.provider.long,
          service: this.provider.service,
          notas: this.provider.messageNotes,
          image: this.provider.photo,
          price: this.provider.total,
          dateString: moment(new Date()).format('M/D/YYYY, h:mm a')
        }).then((result) => {
          console.log(result);
          this.Listo(); //navegar y culminar pedido
        }, (error) => {
          this.errorAlert(error);
          console.log(error);
        });
  
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


  async Listo(){ //Alerta de pedido Exitoso
    const alert = await this.alerCtrl.create({
      header: '¡Pedido Exitoso!',
      message: 'Tu pedido ya se envió a los proveedores más cercanos. En unos minutos tendrá una confirmación de un proveedor.',
      buttons: [
        {
          text: '¡Listo!',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.transition();
            this.nav.navigateRoot('/sidemenu');
          }
        }
      ]
    });
    this.provider.whatUser = true; //el usuario NO es nuevo, ya tiene un servicio pedido
    console.log(this.provider.whatUser);
    await alert.present();

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



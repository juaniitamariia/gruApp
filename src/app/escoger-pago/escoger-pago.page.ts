import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavController
} from "@ionic/angular";
import {
  NavigationEnd
} from '@angular/router';
import {
  NativePageTransitions,
  NativeTransitionOptions
} from '@ionic-native/native-page-transitions/ngx';
import {
  Location
} from "@angular/common";
import {
  AlertController
} from '@ionic/angular';
import {
  GruproviderService
} from "./../gruprovider.service";
import * as Parse from 'parse';
import * as moment from 'moment'

let parse = require('parse');


@Component({
  selector: 'app-escoger-pago',
  templateUrl: './escoger-pago.page.html',
  styleUrls: ['./escoger-pago.page.scss'],
})
export class EscogerPagoPage implements OnInit {

  cards: any; //variable de tarjetas
  selectedCard: any; //tarjeta seleccionada

  
  constructor(public nav: NavController, public nativePageTransitions: NativePageTransitions, public location: Location,
    public alerCtrl: AlertController, public provider: GruproviderService) {
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");

  }

  ngOnInit() { //cuando la pagina carga se ejecuta el codigo
    this.getCards();
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

    console.log('transition');
    this.nativePageTransitions.slide(options);
  }

  navigateFoward() { //navega a la próxima página

    this.transition();
    this.nav.navigateRoot('/sidemenu');
  }

  createService()
  {
  
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
          this.Listo();
      });

      console.log('creo el servicio')
      
  }

  navigateAdd() { //navega a las pagina de añadir tarjetas
    this.transition();
    this.nav.navigateRoot('/agregar-tarjetas');
  }

  navBack() { //navegacion para la pagina anterior
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
    console.log(this.provider.whatUser)
    await alert.present();

  }

  getCards() { //enseña las tarjetas actuales que tiene el Usuario
    Parse.Cloud.run('getStripeUserCards').then((result) => {
      console.log(result);
      this.cards = result;

    }, (error) => {
      this.errorAlert(error);
      console.log(error);
    });

    
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

  getCard(selectedCard) {
    console.log("Entrando getCard");
    this.provider.card = selectedCard;
    console.log(selectedCard);
    console.log('selected succesfully')

    this.createService();
  }


}
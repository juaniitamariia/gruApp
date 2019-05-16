import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import {NavController} from '@ionic/angular';
import { Location } from "@angular/common";
import { AlertController } from "@ionic/angular";
import {
  Stripe
} from '@ionic-native/stripe/ngx';
import * as Parse from 'parse';

let parse = require('parse');

@Component({
  selector: 'app-agregar-tarjetas',
  templateUrl: './agregar-tarjetas.page.html',
  styleUrls: ['./agregar-tarjetas.page.scss'],
})
export class AgregarTarjetasPage implements OnInit {
  numTarjeta: any;
  expDate: any;
  cvv: any;
  nombre: any;
  apellido: any;
  check: boolean;
  month: any;
  year: any;
  constructor( public nav: NavController, public nativePageTransitions: NativePageTransitions,
               public location : Location, public alertCtrl : AlertController, public stripe : Stripe) { 
                parse.serverURL = 'https://parseapi.back4app.com/';
                Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
            
               }

  ngOnInit() {
    //console.log(Parse.User.current().get('email'));
  }

 
  navigateBack(){
    let options: NativeTransitionOptions = {
      direction: 'right',
      duration: 200,
      slowdownfactor: -1,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 100,
    }

    console.log('transition');
    this.location.back();
    this.nativePageTransitions.slide(options);
  }
    

paymentMethod() {
  this.stripe.setPublishableKey('pk_test_boV42rnD9DvyVn4MwCIRM5n000I3LHrkcY');

  let card = {
    number: this.numTarjeta,
    expMonth: parseInt(this.month),
    expYear: parseInt(this.year),
    cvc: this.cvv
  }

  this.stripe.createCardToken(card)
    .then(token => {
      Parse.Cloud.run('createStripeUser', {cardToken: token.id, email: Parse.User.current().get('email')
      }).then((result) => {
        this.successAdd();
        this.location.back();
      }, (error) =>{
        this.errorAlert(error);
        console.log(error);
      });
    })
    .catch(error => {
      this.errorAlert(error);
      console.log(error)
    });
}

back(){
  this.location.back();
}

navigate(){
  this.location.back();
}

async successAdd(){
  const alert =  await this.alertCtrl.create({
    header: 'Listo',
    message: '¡Su tarjeta ha sido grabada exitósamente!',
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

async errorAlert(error : any){
  const alert =  await this.alertCtrl.create({
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



}

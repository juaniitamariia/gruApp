import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavController
} from '@ionic/angular';
import {
  NativePageTransitions,
  NativeTransitionOptions
} from '@ionic-native/native-page-transitions/ngx';
import {
  Location
} from "@angular/common";
import {
  Stripe
} from '@ionic-native/stripe/ngx';
import { AlertController } from "@ionic/angular";
import * as Parse from 'parse';

let parse = require('parse');


@Component({
  selector: 'app-metodo-pago',
  templateUrl: './metodo-pago.page.html',
  styleUrls: ['./metodo-pago.page.scss'],
})
export class MetodoPagoPage implements OnInit {

  cards : any;

  constructor(public nav: NavController, public nativePageTransitions: NativePageTransitions, public location: Location,
    public stripe: Stripe, public alert : AlertController) {
      parse.serverURL = 'https://parseapi.back4app.com/';
      Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
            
    }

  ngOnInit() {
    this.getCards();
  }

  navBack() { //navegar para atras (registro)
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

  navAgregar() { //navegar a pagina de agrgar tarjetas
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
    this.nav.navigateRoot("/agregar-tarjetas");
  }

  navMenu() { //navegar a pagina principal
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
    this.nav.navigateRoot("/sidemenu");
  }

  getCards(){
    Parse.Cloud.run('getStripeUserCards').then((result) =>  
    {
      console.log(result);
     this.cards=result;
    
  },(error) =>{
    this.errorAlert(error);
    console.log(error);
  });
  }

  async errorAlert(error : any){
    const alert =  await this.alert.create({
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

  deleteCard(selectedCard : any){
    let index : any;
    index = this.cards.indexOf(selectedCard); console.log(index);
    console.log('enter');
    Parse.Cloud.run('stripeDeleteCard', {cardId: selectedCard.id, customerId: selectedCard.customer}).then((result) =>  
    {
      this.cards.splice(index, 1);
      console.log(result);
  },(error) => {
    console.log(error);
  });
  }
  
}
import {
  Component,
  OnInit,
  NgModule
} from '@angular/core';
import {
  GruproviderService
} from "../gruprovider.service";
import {
  NavController
} from '@ionic/angular';
import {
  PopoverController
} from '@ionic/angular';
import {
  AlertController
} from '@ionic/angular';
import {
  NativePageTransitions,
  NativeTransitionOptions
} from '@ionic-native/native-page-transitions/ngx';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})

export class PopoverComponent implements OnInit {

  service: string; //servicio solicitado
  pop: boolean; //popover
  msg: string; //mensaje de notas
  lugar: string; //lugar en donde se encuentra el carro de servicio de grua

  constructor(public grupovider: GruproviderService, public nativePageTransitions: NativePageTransitions, private nav: NavController, public popController: PopoverController, public alerCtrl: AlertController) {
    this.service = this.grupovider.service; //guarda el parametro string
    console.log(this.service);
    console.log(this.grupovider.service);
    this.pop = true;
  }

  ngOnInit() {

    this.grupovider.pop = this.pop;
    this.orderService();
  }

  navigate() {
    this.navTransition();
    this.grupovider.lugar = this.lugar; //guarda el lugar en donde esta el carro
    
    //this.close();
    
    if (this.service == 'especial') {
      this.popController.dismiss();
      this.grupovider.lugar = this.lugar;
      console.log("special condition is working!");
      this.navTransition();
      this.nav.navigateRoot("/photo");
      this.close();
    } else if (this.service == 'grua') {
      if(this.lugar == undefined){
        this.placeNotSpecified();
        console.log("vacio")
      }else{
        this.popController.dismiss();
        this.grupovider.lugar = this.lugar;
        this.nav.navigateRoot("/locatio-marker");
      }
    } else {
      this.popController.dismiss();
      this.grupovider.messageNotes = this.msg;
      this.nav.navigateRoot("/mark-location");
    }
  }


  close() {
    this.popController.dismiss();
  }

  async Carretera() {
    const alert = await this.alerCtrl.create({
      header: '¡ALERTA!',
      message: 'El servicio de remolque sólo aplica cuando el vehículo se encuentre en un espacio accesible para la grúa y solo vehículos que tengan solo cuatro ruedas y no tenga carga. No camiones.',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
          //this.popController.dismiss();
          //this.nav.navigateRoot("/sidemenu");         
        }
      }]
    });

    await alert.present();
  }

  async Sotano() {
    const alert = await this.alerCtrl.create({
      header: '¡ALERTA!',
      message: 'Si su vehículo se encuentra en un sótano, debe ser cotizado como un servicio especial. Al dar Ok lo estará llevando a servicio especial para que haga todo el proceso.',
      buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.service = 'especial';
            console.log(this.service);
            //this.popController.create;
          }
        }
      ]
    });

    await alert.present();
  }

  async Multipiso() {
    const alert = await this.alerCtrl.create({
      header: '¡ALERTA!',
      message: 'Si su vehículo se encuentra en un multipiso, debe ser cotizado como un servicio especial. Al dar Ok lo estará llevando a servicio especial para que haga todo el proceso.',
      buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.service = 'especial';
            this.navTransition();
            this.nav.navigateRoot("/locatio-marker");
            console.log(this.service);
            //this.popController.create;
          }
        }
      ]
    });

    await alert.present();
  }

  async Otros() {
    const alert = await this.alerCtrl.create({
      header: '¡ALERTA!',
      message: 'Si su vehículo se encuentra fuera de carretera, no está en un sótano y tampoco en un multipiso debe ser cotizado como un servicio especial. Al dar Ok lo estará llevando a servicio especial para que haga todo el proceso',
      buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'Ok',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
            this.service = 'especial';
            console.log(this.service);
            //this.popController.create;
          }
        }
      ]
    });
    await alert.present();
  }

  Cancel() {
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

  navTransition() {
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

  orderService() {
    if (this.service == 'goma') {
      this.grupovider.service = 'Goma';
      this.grupovider.price = 30;
      console.log('servicio: ' + this.grupovider.service);
      console.log('precio: ' + this.grupovider.price);
    } else if (this.service == 'gasolina') {
      this.grupovider.service = 'Gasolina';
      this.grupovider.price = 35;
      console.log('servicio: ' + this.grupovider.service);
      console.log('precio: ' + this.grupovider.price);
    } else if (this.service == 'bateria') {
      this.grupovider.service = 'Bateria';
      this.grupovider.price = 30;
      console.log('servicio: ' + this.grupovider.service);
      console.log('precio: ' + this.grupovider.price);
    } else if (this.service == 'llaves') {
      this.grupovider.service = 'Cerrajeria';
      this.grupovider.price = 30;
      console.log('servicio: ' + this.grupovider.service);
      console.log('precio: ' + this.grupovider.price);

    }
  }

  async placeNotSpecified(){
    const alert = await this.alerCtrl.create({
      header: '¡ALERTA!',
      message: 'No ha especificado en que lugar se encuentra su vehículo.',
      buttons: [{
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }
      ]
    });

    await alert.present();
  }
}
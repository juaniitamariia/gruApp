import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import {NavController} from '@ionic/angular';
import { AlertController } from "@ionic/angular";
import { GruproviderService } from "./../gruprovider.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-pass-input',
  templateUrl: './pass-input.page.html',
  styleUrls: ['./pass-input.page.scss'],
})
export class PassInputPage implements OnInit {

  password: any;
  verifiedPassword: any;

  constructor(public nativePageTransitions: NativePageTransitions, public nav: NavController, public alert: AlertController,
              public provider : GruproviderService, public location:Location) { }

  ngOnInit() {
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
    this.nav.navigateRoot("/num-verification");
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
   this.nativePageTransitions.slide(options);
    this.location.back();
  }

  async confirmPass(){
    this.provider.password = this.password;

    if( this.password == this.verifiedPassword){ //&& this.provider.signUp() == true
      this.provider.signUp(); //función del provider que setea el codigo
      this.navigate();
    }else if (this.password != this.verifiedPassword){
      const alert = await this.alert.create({
        header: 'Error',
        message: 'Las contraseñas no son iguales',
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
    // else if (this.password == this.verifiedPassword){ //&& this.provider.signUp() == false
    //   this.presentAlert();
    // }
  }

  async presentAlert() {
    const alert =  await this.alert.create({
      header: 'Error',
      message: 'Ya existe un usario con ese correo electronico',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
          this.nav.navigateRoot('/registro');
          
        }
      }]
    });
    await alert.present();
  
  
  }
}

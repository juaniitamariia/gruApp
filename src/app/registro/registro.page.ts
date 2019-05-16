import { Component, OnInit, ANALYZE_FOR_ENTRY_COMPONENTS } from '@angular/core';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { GruproviderService } from "./../../app/gruprovider.service";
import * as Parse from 'parse';
import { ToastController } from '@ionic/angular';
import { AlertController } from "@ionic/angular";

let parse = require('parse');

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registro : boolean;
  result: string;
  name : string;
  email : string; //sign-in
  password : string; //sign-in
  resp : Parse.User;
  user : any;
  role : string;
  phoneNumber: string;
  

  constructor(private nativePageTransitions: NativePageTransitions, public nav: NavController,public provider : GruproviderService,
              public toastCtrl : ToastController, public alertCtrl : AlertController) {

    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    this.name = this.provider.name;

    this.role = "C";

  }

  ngOnInit() {
    this.registro = true;
  }

changeRegistro(registro : boolean){

this.registro = registro;
console.log("statusChange");

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
  console.log('transition working');
 }

 navigatePass(){
  this.navigate();
  this.nav.navigateRoot('/pass-input');
 }

 navigateInicio(){
  this.navigate();
  this.nav.navigateRoot('/sidemenu');
 }

signIn(){

  Parse.User.logIn(this.email, this.password).then((resp) => {
    console.log('Logged in successfully', resp);
    const currentUser = Parse.User.current(); //usuario actual logged
    this.user = currentUser; //igual a variable global

    Parse.Cloud.run('ifVerified', { userId: Parse.User.current().id }).then((response) => {
      if (response) {
        this.navigateInicio(); //navegar
      }
      else{
        this.notVerified();

      }
    });
  }, err => {
    console.log('Error logging in', err);
    this.alert();
  });


}

async notVerified(){
  const alert = await this.alertCtrl.create({
    header: 'Error',
    message: 'Su cuenta no ha sido verificada.',
    buttons: [{
      text: 'OK',
      role: 'cancel',
      cssClass: 'secondary',
      handler: () => {
        this.nav.navigateRoot('/num-verification');
        console.log('Confirm Cancel');
        //this.popController.dismiss();
        //this.nav.navigateRoot("/sidemenu");
      }
    }]
  });

  await alert.present();
}


async alert(){
  const alert = await this.alertCtrl.create({
    header: 'Error',
    message: 'Correo electrónico / Contraseña inválida.',
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


signUp(){
this.provider.email = this.email;
this.provider.nombre = this.name;
this.provider.phoneNumber = this.phoneNumber;
this.provider.role = this.role;
this.provider.password = this.password;
this.provider.username = this.email;
console.log(this.name);
this.navigatePass();
}

resetPass(){
  Parse.User.requestPasswordReset(this.email).then(() => {
    // Password reset request was sent successfully
    if (typeof document !== 'undefined') document.write('Reset password email sent successfully');
    console.log('Reset password email sent successfully');
  }).catch((error) => {
    if (typeof document !== 'undefined') document.write(`Error while creating request to reset user password: ${JSON.stringify(error)}`);
    console.error('Error while creating request to reset user password', error);
  });
}

}

import {
  Component,
  OnInit
} from '@angular/core';
import {
  Camera,
  CameraOptions
} from '@ionic-native/camera/ngx';
import {
  NativePageTransitions,
  NativeTransitionOptions
} from '@ionic-native/native-page-transitions/ngx';
import {
  NavController
} from '@ionic/angular';
import {
  Location
} from '@angular/common';
import * as Parse from 'parse';
import { AlertController } from "@ionic/angular";
import { GruproviderService } from "./../gruprovider.service";

let parse = require('parse');

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {

  constructor(public camera: Camera, public nav: NavController, public nativePageTransitions: NativePageTransitions,
    public location: Location, public alertCtrl : AlertController, public provider : GruproviderService) {
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");

  }

  picture:any;

  ngOnInit() {}

   async openCamera() {

    console.log('did enter');

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      cameraDirection: this.camera.Direction.BACK,
  };

    this.camera.getPicture(options).then((imageData) => {

      this.picture = 'data:image/jpeg;base64,' + imageData;

      let base64Image = imageData;
      let name = "photo.jpg";

      let parseFile = new Parse.File(name, {
        base64: base64Image
      }); //convierte la foto a base64
      parseFile.save().then((savedFile) => {
        console.log('file saved:' + savedFile);
        this.provider.photo == savedFile; //foto tomada
      }, (err) => {
        console.log('error grabando file: ' + err)
      })

    }, (err) => {
      console.log('error de camara' + err);
    });

  }


  async isPhotoSaved(){
    if(this.provider.photo ==  null){
      const alert = await this.alertCtrl.create({
        header: '¡ALERTA!',
        message: 'Necesitas enviar una foto al grüero para cotizar el servicio',
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

    }else{
      this.navigateFoward();
      console.log('Saved photo succesfully!!')
    }
  }

  navigateFoward() {

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
    this.nav.navigateRoot('/locatio-marker');
  }

  navigateBack() {
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
    //this.nav.navigateBack();
    this.location.back();
  }
}
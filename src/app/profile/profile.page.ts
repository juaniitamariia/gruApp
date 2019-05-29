import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import * as Parse from 'parse';
import { AlertController } from "@ionic/angular";
let parse = require('parse');


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name: any;
  phoneNumber: any;
  email: any;
  photo: any;
  licenseNumber:any;

  constructor(public imagePicker: ImagePicker, public nav : NavController, public nativePageTransitions : NativePageTransitions,
    public alert : AlertController) {

    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
   }

  ngOnInit() {

    this.getName();
    this.getInfo();
    this.getPhoto();

  }

choosePic(){
  let options : any;
  this.imagePicker.getPictures(options).then((results) => {
    for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
    }
  }, (err) => { });
  
}

getName(){
  
  Parse.Cloud.run('getName', {userId: Parse.User.current().id}).then((result) =>  
  {
   this.name=result;
   //console.log(this.name);
  });
}

getInfo(){
  Parse.Cloud.run('getUser', {userId: Parse.User.current().id}).then((result) => {
    this.email = result.getEmail();
    this.phoneNumber = result.get('phoneNumber');
    this.licenseNumber = result.get('licenseNum');
    console.log(result);
  },(error) => {
    console.log(error);
  })
}

getPhoto(){
  Parse.Cloud.run('getUser',{userId: Parse.User.current().id}).then((result) => {
    if(result.get('profilePic') == null){
      console.log("this object is null");
      this.photo = "assets/profile.svg";

    }
    else{
      this.photo = result.get('profilePic');
    }
    console.log(this.photo);
  })
}

checkLicenseNum()
{
  if(this.licenseNumber.length ==7)
  {
   this.updateClient();
  }
  else
  {
    this.notPermited();
  }
}

updateClient()
{ 
    Parse.Cloud.run('updateClient', {
      userId: Parse.User.current().id,
      newName: this.name,
      newEmail: this.email,
      newLicenseNum: this.licenseNumber,
      newPhoneNumber: this.phoneNumber
    }).then((result) => {
      console.log(result);
   }, (error) =>{
      console.log(error);
    });

    this.navBack();
}

navBack(){
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

  this.nav.navigateRoot('/sidemenu');
}

async notPermited(){
  
    const alert = await this.alert.create({
      header: 'Error',
      message: 'La licencia lleva 7 dígitos.',
      buttons: [
          {
            text: 'OK',
            cssClass: 'greenBtn',
            handler: () => {
              console.log('Confirm Cancel');
            }
          }
        ]
      });
  
      await alert.present();

}
  
  
}
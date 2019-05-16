import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { NavController } from "@ionic/angular";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import * as Parse from 'parse';
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

  constructor(public imagePicker: ImagePicker, public nav : NavController, public nativePageTransitions : NativePageTransitions) {

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


  
  
}
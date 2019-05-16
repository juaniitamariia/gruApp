// import { Component, OnInit } from '@angular/core';
// import {NavController} from '@ionic/angular';
// import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';


// @Component({
//   selector: 'app-splash',
//   templateUrl: './splash.page.html',
//   styleUrls: ['./splash.page.scss'],
// })
// export class SplashPage implements OnInit {

//   constructor(public NavCtrl:NavController, private nativePageTransitions: NativePageTransitions) { }
  

//   ngOnInit() {
//     setTimeout(()=>{ this.goHome();},4200);
//   }

//   goHome(){

//     let options: NativeTransitionOptions = {
//       direction: 'left',
//       duration: 200,
//       slowdownfactor: -1,
//       slidePixels: 20,
//       iosdelay: 100, 
//       androiddelay: 100,
//      }
//   console.log('transition');
//    this.nativePageTransitions.fade(options);
//    console.log('transition working');
//     console.log("hey");
//     this.NavCtrl.navigateRoot("/home");

//   }



// }

import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import * as Parse from 'parse';
let parse = require('parse');
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {
  constructor(public NavCtrl:NavController, private nativePageTransitions: NativePageTransitions) { 
  }
  
  ngOnInit() {
    setTimeout(()=>{ this.goHome();},4200);
  }
  goHome(){
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");
    Parse.User.currentAsync().then(user => {
      console.log('Logged user', user);
  
      user != null ? this.NavCtrl.navigateRoot('/sidemenu') : this.NavCtrl.navigateRoot('/home');
    }, err => {
      console.log('Error getting logged user',err);
      let options: NativeTransitionOptions = {
        direction: 'left',
        duration: 200,
        slowdownfactor: -1,
        slidePixels: 20,
        iosdelay: 100, 
        androiddelay: 100,
       }
      this.nativePageTransitions.slide(options);
      this.NavCtrl.navigateRoot('/locationon');
      
    });
  }
}
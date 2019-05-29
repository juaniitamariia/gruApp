import { Component, OnInit } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import {NavController} from '@ionic/angular';
import { GruproviderService } from '../gruprovider.service';
import * as Parse from 'parse';
let parse = require('parse');



@Component({
  selector: 'app-num-verification',
  templateUrl: './num-verification.page.html',
  styleUrls: ['./num-verification.page.scss'],
})
export class NumVerificationPage implements OnInit {

   numbers: String;
   verify: any;
   verificationCode: String


  constructor(public nativePageTransitions: NativePageTransitions, private nav: NavController, private gru: GruproviderService) {
  }

  ngOnInit() {
   parse.serverURL = 'https://parseapi.back4app.com/';
   Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");

  }

  navigate(){

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
    this.nav.navigateRoot('/registro');
    
   
   }

   add(input){
      this.numbers += input.toString();
      console.log(this.numbers);
   }

numbersOnly(input){
   var regularExp = /[^0-9]/;
   input.value = input.value.replace(regularExp, "");
 }

   navigateFoward(){

    let options: NativeTransitionOptions = {
       direction: 'left',
       duration: 200,
       slowdownfactor: -1,
       slidePixels: 20,
       iosdelay: 100, 
       androiddelay: 100,
      }

      this.numbers = (<HTMLInputElement>document.getElementById("one")).value.toString();
      this.numbers += (<HTMLInputElement>document.getElementById("two")).value.toString();
      this.numbers += (<HTMLInputElement>document.getElementById("three")).value.toString();
      this.numbers += (<HTMLInputElement>document.getElementById("four")).value.toString();

      console.log('transition');
      Parse.Cloud.run('setVerified', { userId: Parse.User.current().id, number: this.numbers} )
      .then((result) => {
        if(result.success == true){
         this.nativePageTransitions.slide(options);
         this.nav.navigateRoot('/metodo-pago');
        }else{
          console.log('NO SON IGUALES LOS NUMEROS')
        }
      });


      // if (this.gru.verificationCode == this.numbers){
        
      // }
      // else if( this.gru.verificationCode != this.numbers){
      //    console.log("Nope",this.gru.verificationCode);
      // }

      console.log(this.numbers);
   
   }

   gotoNextField(nextElement){
   nextElement.setFocus();
     }
    


   reSendCode() {
      this.verificationCode = (Math.floor(Math.random() * 9999)).toString(10);
      if (this.verificationCode.length != 4) {
        this.verificationCode = this.verificationCode + "1";
      }
      Parse.User.current().set('verificationCode', this.verificationCode)
      Parse.User.current().save().then((savedUser) => {
        Parse.Cloud.run('sendVerificationCode', {
          userId: Parse.User.current().id,
          phoneNumber: Parse.User.current().get('phoneNumber')
        }).then((result) => {
          console.log(result);
          return true;
        }, (error) => {
          console.log(error);
          return false;
        })
      }, (error) => {
        console.log(error)
        return false;
      })
    }
}

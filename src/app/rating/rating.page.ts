import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {

  constructor( public events: Events, public nativePageTransitions : NativePageTransitions, public nav : NavController) {

  }

  ngOnInit() {
  }

  navigateBtn(){
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
}
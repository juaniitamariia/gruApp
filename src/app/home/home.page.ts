import { Component } from '@angular/core';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavController } from "@ionic/angular";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  runPage(){
   console.log("splash working")
  }

  slideOpts = {
    effect: 'flip'
  };
  
  constructor(private nativePageTransitions: NativePageTransitions, public nav : NavController){
    console.log("timer is working")
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
    this.nav.navigateRoot('/locationon');
    
   
   }

  
}

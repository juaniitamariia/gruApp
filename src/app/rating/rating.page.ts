import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import {NavController} from '@ionic/angular';
import { AlertController } from "@ionic/angular";


@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {

  constructor( public events: Events, public nativePageTransitions : NativePageTransitions, public nav : NavController,
                public alertCtrl: AlertController) {

  }
  
  comentarios : string;
  hoverRate : any;

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

  validateRating(){
    if(this.hoverRate == null){
      this.error();
    }else{
      this.navigateBtn();
    }
  }

  async error() { //Alerta de pedido exitoso
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: '¡No haz hecho tu rating!',
      buttons: ['OK']
    });

    await alert.present();
  } 


  saveRating(driver:any, service:any) {
    driver = driver.toJSON();
    service = service.toJSON();
    Parse.Cloud.run('createReview', {
      user: Parse.User.current(),
      rating: this.hoverRate,
      driverId: driver.objectId,
      serviceId: service.objectId,
      reviewContent: this.comentarios,

    }).then((result) => {
      console.log(result);
      //this.navigate.navigateRoot('/mi-vehiculo');
    }, (error) =>{
      console.log(error);
    });
  }
}
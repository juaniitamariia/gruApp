import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { Location } from "@angular/common";
import { AlertController } from "@ionic/angular";

let parse = require('parse');

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.page.html',
  styleUrls: ['./addcar.page.scss'],
})
export class AddcarPage implements OnInit {

  color: string;
  make: string;
  year: string;
  model : string;
  licensePlateNum: string;
  userId: string; //id del usuario conectado
  eRROR : string;
  
 validateInputs(){
   if(this.licensePlateNum.length < 6 || this.licensePlateNum.length > 7){
    this.eRROR = 'El número de tablilla debe ser un mínimo de 6 caracteres o un máximo de 7 caracteres ';
    this.errorAlert();
   }else{
     this.navigate();
   }
   
 }

    
    // <ion-option value="Hyundai">Hyundai</ion-option>
    //     <ion-option value="Toyota">Toyota</ion-option>
    //     <ion-option value="Ford">Ford</ion-option>
    //     <ion-option value="Chevrolet">Chevrolet</ion-option>
    //     <ion-option value="Jeep">Jeep</ion-option>
    //     <ion-option value="Mini">Mini</ion-option>
    //     <ion-option value="Chrysler">Chrysler</ion-option>
    //     <ion-option value="Nissan">Nissan</ion-option>
    //     <ion-option value="Subaru">Subary</ion-option>
    //     <ion-option value="Honda">Honda</ion-option>
    //     <ion-option value="Acura">Acura</ion-option>
    //     <ion-option value="Dodge">Dodge</ion-option>
    //     <ion-option value="BMW">BWM</ion-option>
    //     <ion-option value="Porsche">Porsche</ion-option>
    //     <ion-option value="Buick">Buick</ion-option>
    //     <ion-option value="Cadillac">Cadillac</ion-option>
    //     <ion-option value="Fiat">Fiat</ion-option>
    //     <ion-option value="GMC">GMC</ion-option>
    //     <ion-option value="Infiniti">Infiniti</ion-option>
    //     <ion-option value="Jaguar">Jaguar</ion-option>
    //     <ion-option value="Kia">Kia</ion-option>
    //     <ion-option value="LandRover">Land Rover</ion-option>
    //     <ion-option value="Lexus">Lexus</ion-option>
    //     <ion-option value="Mazda">Mazda</ion-option>
    //     <ion-option value="Mitsubishi">Mitsubishi</ion-option>
    //     <ion-option value="Pontiac">Pontiac</ion-option>
    //     <ion-option value="Ram">Ram</ion-option>
    //     <ion-option value="Tesla">Tesla</ion-option>
    //     <ion-option value="Volkswagen">Volkswagen</ion-option>
    //     <ion-option value="Volvo">Volvo</ion-option>
    //     <ion-option value="Suzuki">Suzuki</ion-option>
    //     <ion-option value="Smart">Smart</ion-option>
    //     <ion-option value="Mercedes">Mecedes</ion-option>
    //     <ion-option value="Genesis">Genesis</ion-option>
   
  //   list: any = [
  //   {id: 1, name: 'one'},
  //   {id: 2, name: 'two'},
  //   {id: 3, name: 'three'}
  // ];
  // current = 2;



  constructor(public location : Location, public alert: AlertController
    ) { 
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");

    
  }

  ngOnInit() {
  }
  
  car(){
    Parse.Cloud.run('addCar', {userId: Parse.User.current().id, color: this.color, make: this.make, year: this.year, model: this.model, licensePlateNum: this.licensePlateNum }).then((result) =>  
    {
      this.location.back();
  });
  }

  navigate(){
    this.car();
  }

  navigateBack(){
    this.location.back();
  }


  async errorAlert(){
    const alert = await this.alert.create({
      header: 'Error',
      message: this.eRROR,
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


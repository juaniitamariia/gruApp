import { Component, OnInit } from '@angular/core';
import * as Parse from 'parse';
import { GruproviderService } from './../gruprovider.service';
import {AlertController, PopoverController} from '@ionic/angular';
import { PopoverComponent} from '../popover/popover.component';



let parse = require('parse');


@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  requests: any;
  name: any;
  historial = false;


  constructor(public alertCtrl: AlertController, public popover: PopoverComponent,public popoverController: PopoverController) {
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize('guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2', 'qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8');
  }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {
    Parse.Cloud.run('getUsersRequests', {userId: Parse.User.current().id }).then((result) => {

      if (result.length === 0) {
        console.log('No requests have been made');
      } else {
        for (let i = 0; i < result.length; i++) {
          result[i] = result[i].toJSON();
        }
        this.requests = result;
        // console.log(this.requests);
        // console.log(this.requests.destination.latitude, this.requests.destination.longitude); // destination                                                       
      }
      // tslint:disable-next-line:no-unused-expression
    }), (error) => {
      console.log(error);

    };
  }


  async info() {
    this.popover.service = 'historial';
    const alert = await this.alertCtrl.create({
      header: 'Recibo',
      message: '',
      buttons: [{
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
      }]
    });

    await alert.present();
  }

  presentInfo(selectedRequest: any) {
    this.popover.service = 'historial';
    this.presentPopover();
  }

  async presentPopover() { // Popover de detalles del carro
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      // event: event,
      translucent: false,
      backdropDismiss: false
    });
    console.log('pop working');
    return await popover.present();

  }



}

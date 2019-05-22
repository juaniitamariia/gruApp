import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { NavController } from "@ionic/angular";
import { GruproviderService } from "./../gruprovider.service";
import * as Parse from 'parse';

let parse = require('parse');

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

  requests: any;
  name: any;
  service: any;

  constructor(public location : Location, public control: NavController, public provider:GruproviderService) {
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize('guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2', 'qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8');
   }

  ngOnInit() {
    this.getRequests();
  }

  navigateBack(){
    this.location.back();
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
        this.service = this.requests.service;
        console.log(this.requests);

        // console.log(this.requests.destination.latitude, this.requests.destination.longitude); // destination     
        this.provider.serviceId = this.requests.objectid;                                                  
      }
      // tslint:disable-next-line:no-unused-expression
    }), (error) => {
      console.log(error);
    };
  }

  presentInfo(){
    console.log(this.requests)
  }

  goTo(objectId)
  {
    this.provider.serviceId = objectId
    this.control.navigateRoot('/cotizaciones');
  }

}

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
        this.provider.requests = result;
        this.provider.requestQuantity = result.length; //devuelve la cantidad total de items en el array
        this.service = this.requests.service;
        console.log(this.provider.requestQuantity);
        this.provider.serviceId = this.requests.objectid; //guarda el id del request                                              
      }
      // tslint:disable-next-line:no-unused-expression
    }), (error) => {
      console.log(error);
    };
  }

  seeDriver(objectId, request){
    console.log(this.requests);
    this.provider.serviceId = objectId;
    this.provider.selectedRequest = request;
   this.control.navigateForward("/serviceoptions");
  }

  goTo(objectId, request)
  {
    this.provider.serviceId = objectId;
    this.provider.selectedRequest = request;
    this.control.navigateRoot('/cotizaciones');
  }

}

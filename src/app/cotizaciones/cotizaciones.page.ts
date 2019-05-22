import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { GruproviderService } from "./../gruprovider.service";
import * as Parse from 'parse';

let parse = require('parse');

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.page.html',
  styleUrls: ['./cotizaciones.page.scss'],
})
export class CotizacionesPage implements OnInit {

  quots : any;

  constructor( public location: Location, public provider : GruproviderService) {
    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize('guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2', 'qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8');
   }

  ngOnInit() {
    this.getQuotes()
  }

  navigateBack(){
    this.location.back();
  }
    //funcion para remover cotizacion
    removeCotizaciones(selectedQuotes:any){
      let index : any;
      index = this.quots.indexOf(selectedQuotes); console.log(index);
      console.log('enter');
      Parse.Cloud.run('deleteQuotes', {quotesID: selectedQuotes.id}).then((result) =>  
      {
        this.quots.splice(index, 1);
        console.log(result);
    },(error) => {
      console.log(error);
    });
    }
  
  getQuotes(){
    Parse.Cloud.run('getUsersQuotes', {serviceID: this.provider.serviceId}).then((result) => {

      if (result.length === 0) {
        console.log('No requests have been made');
      } else {
        for (let i = 0; i < result.length; i++) {
          result[i] = result[i].toJSON();
        }
        this.quots = result;
                                                            
      }
    }), (error) => {
      console.log(error);

    };
  }

}

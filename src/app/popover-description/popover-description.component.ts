import { Component, OnInit } from '@angular/core';
import { PopoverController} from '@ionic/angular';
import { NavController } from "@ionic/angular";
import { GruproviderService } from "./../gruprovider.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-popover-description',
  templateUrl: './popover-description.component.html',
  styleUrls: ['./popover-description.component.scss'],
})
export class PopoverDescriptionComponent implements OnInit {

  constructor(public popController : PopoverController, public navigate : NavController,
    public provider : GruproviderService, public location: Location) { }

    total: number;
    distancia : any;
    time: number;
    service:  any = this.provider.service;

  ngOnInit()
  {
    this.distancia = this.provider.distance;
    this.total = this.provider.total;
    this.time = this.provider.time
    console.log(this.provider.distance);
  }

  close(){
    this.popController.dismiss();
  
  }

  navigateFoward(){
    
    this.close();
    this.provider.service = "Grua";
    this.location.back();
  }

}

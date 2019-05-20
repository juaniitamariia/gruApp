import { Component, OnInit } from '@angular/core';
import { PopoverController} from '@ionic/angular';
import { NavController } from "@ionic/angular";
import { GruproviderService } from "./../gruprovider.service";

@Component({
  selector: 'app-popovergrua',
  templateUrl: './popovergrua.component.html',
  styleUrls: ['./popovergrua.component.scss'],
})
export class PopovergruaComponent implements OnInit {

  constructor(public popController : PopoverController, public navigate : NavController,
              public provider : GruproviderService) { }
total: any;
distancia : any;


  ngOnInit() {
    this.distancia = this.provider.distance;
    this.total = this.provider.total;
    console.log(this.provider.distance);
  }


  close(){
    this.popController.dismiss();
    this.navigate.navigateRoot('/locatio-marker');
  }

  navigateFoward(){
    this.close();
    this.navigate.navigateRoot('/escoger-carro');
  }

}

import { Component, OnInit } from '@angular/core';
import { PopoverController} from '@ionic/angular';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-popovergrua',
  templateUrl: './popovergrua.component.html',
  styleUrls: ['./popovergrua.component.scss'],
})
export class PopovergruaComponent implements OnInit {

  constructor(public popController : PopoverController, public navigate : NavController) { }

  ngOnInit() {}


  close(){
    this.popController.dismiss();
    this.navigate.navigateRoot('/locatio-marker');
  }

  navigateFoward(){
    this.close();
    this.navigate.navigateRoot('/escoger-carro');
  }

}

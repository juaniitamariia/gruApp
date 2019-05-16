import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EscogerCarroPage } from './escoger-carro.page';

const routes: Routes = [
  {
    path: '',
    component: EscogerCarroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EscogerCarroPage]
})
export class EscogerCarroPageModule {}

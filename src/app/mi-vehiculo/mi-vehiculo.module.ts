import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MiVehiculoPage } from './mi-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: MiVehiculoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MiVehiculoPage]
})
export class MiVehiculoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AgregarTarjetasPage } from './agregar-tarjetas.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarTarjetasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AgregarTarjetasPage]
})
export class AgregarTarjetasPageModule {}

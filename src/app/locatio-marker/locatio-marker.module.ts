import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LocatioMarkerPage } from './locatio-marker.page';

const routes: Routes = [
  {
    path: '',
    component: LocatioMarkerPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LocatioMarkerPage]
})
export class LocatioMarkerPageModule {}

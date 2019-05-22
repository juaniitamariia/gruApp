import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'locationon', loadChildren: './locationon/locationon.module#LocationonPageModule' },
  { path: 'registro', loadChildren: './registro/registro.module#RegistroPageModule' },
  { path: 'sidemenu', loadChildren: './sidemenu/sidemenu.module#SidemenuPageModule' },
  { path: 'splash', loadChildren: './splash/splash.module#SplashPageModule' },
  { path: 'historial', loadChildren: './historial/historial.module#HistorialPageModule' },
  { path: 'metodo-pago', loadChildren: './metodo-pago/metodo-pago.module#MetodoPagoPageModule' },
  { path: 'locatio-marker', loadChildren: './locatio-marker/locatio-marker.module#LocatioMarkerPageModule' },
  { path: 'bookingservice', loadChildren: './bookingservice/bookingservice.module#BookingservicePageModule' },
  { path: 'serviceoptions', loadChildren: './serviceoptions/serviceoptions.module#ServiceoptionsPageModule' },
  { path: 'photo', loadChildren: './photo/photo.module#PhotoPageModule' },
  { path: 'num-verification', loadChildren: './num-verification/num-verification.module#NumVerificationPageModule' },
  { path: 'pass-input', loadChildren: './pass-input/pass-input.module#PassInputPageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'rating', loadChildren: './rating/rating.module#RatingPageModule' },
  { path: 'mi-vehiculo', loadChildren: './mi-vehiculo/mi-vehiculo.module#MiVehiculoPageModule' },
  { path: 'addcar', loadChildren: './addcar/addcar.module#AddcarPageModule' },
  { path: 'agregar-tarjetas', loadChildren: './agregar-tarjetas/agregar-tarjetas.module#AgregarTarjetasPageModule' },
  { path: 'escoger-pago', loadChildren: './escoger-pago/escoger-pago.module#EscogerPagoPageModule' },
  { path: 'escoger-carro', loadChildren: './escoger-carro/escoger-carro.module#EscogerCarroPageModule' },
  { path: 'pagar', loadChildren: './pagar/pagar.module#PagarPageModule' },
  { path: 'loading', loadChildren: './loading/loading.module#LoadingPageModule' },
  { path: 'mark-location', loadChildren: './mark-location/mark-location.module#MarkLocationPageModule' },
  { path: 'request', loadChildren: './request/request.module#RequestPageModule' },
  { path: 'edit-car', loadChildren: './edit-car/edit-car.module#EditCarPageModule' },
  { path: 'cotizaciones', loadChildren: './cotizaciones/cotizaciones.module#CotizacionesPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

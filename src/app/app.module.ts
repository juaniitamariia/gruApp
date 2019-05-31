import { ViewChild,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PopoverComponent } from "./popover/popover.component";
import { Camera } from '@ionic-native/camera/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonicRatingModule } from "ionic4-rating";
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { RegistroPage } from "././registro/registro.page";
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { PopovergruaComponent } from "./../app/popovergrua/popovergrua.component";
import { ShareComponent } from "./share/share.component";
import {Stripe} from '@ionic-native/stripe/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { FormsModule } from '@angular/forms';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import {PopoverDescriptionComponent} from './popover-description/popover-description.component';


@NgModule({
  declarations: [AppComponent, PopoverComponent, PopovergruaComponent, ShareComponent,PopoverDescriptionComponent],
  entryComponents: [PopoverComponent, PopovergruaComponent,PopoverDescriptionComponent],
  bootstrap: [AppComponent, ShareComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicRatingModule, FormsModule], 
  providers: [
    StatusBar,
    SplashScreen,
    ViewChild,
    PopoverComponent,
    Camera,
    LocationAccuracy,
    Geolocation,
    IonicRatingModule,
    NativePageTransitions,
    SocialSharing,
    RegistroPage,
    ImagePicker,
    PopovergruaComponent,
    ShareComponent,
    Stripe,
    StatusBar,
    ScreenOrientation,
    Keyboard,
    PopoverDescriptionComponent,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class AppModule {
  constructor(private statusBar: StatusBar) {
// set status bar to white
this.statusBar.backgroundColorByHexString('#ffffff');
  }
}

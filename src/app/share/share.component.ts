import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {

  mensaje = 'GruApp es una aplicación móvil de asistencia en carretera que trabaja de manera segura y rápida en todo el país y sin costos de membresía. ¡Haga clic aquí www.gruapp.app para descargar!';
  constructor(private socialSharing: SocialSharing) { }

  ngOnInit() {}

  shareFacebook(){
    // Share via facebook
    console.log(this.mensaje);
    this.socialSharing.shareViaFacebook(this.mensaje , 'http://localhost:8102').then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  shareInstagram(){
    // Share via facebook
    this.socialSharing.shareViaInstagram(this.mensaje, 'http://localhost:8102' ).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
//falta anadir el icono de twitter
  shareTwitter(){
    this.socialSharing.shareViaTwitter('message', 'image').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  shareWhatsapp(){
    this.socialSharing.shareViaWhatsApp(this.mensaje, 'image', 'http://localhost:8102').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
}

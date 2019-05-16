import { Component, OnInit } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent implements OnInit {

  constructor(private socialSharing: SocialSharing) { }

  ngOnInit() {}

  shareFacebook(){
    
    // Share via facebook
    this.socialSharing.shareViaFacebook('message', 'image', 'url').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  shareInstagram(){
    // Share via facebook
    this.socialSharing.shareViaInstagram('message', 'image').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  shareTwitter(){
    this.socialSharing.shareViaTwitter('message', 'image').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  shareWhatsapp(){
    this.socialSharing.shareViaWhatsApp('message', 'image', 'url').then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }
}

import {
  Injectable
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as Parse from 'parse';
import {
  NavController,
  AlertController
} from "@ionic/angular";
import {
  preserveWhitespacesDefault
} from '@angular/compiler';
import {
  userInfo
} from 'os';
import { AnyARecord } from 'dns';



let parse = require('parse');

@Injectable({
  providedIn: 'root'
})
export class GruproviderService {
  mapboxgl: any;
  map: mapboxgl.Map;
  public service: string;
  public pop: boolean;
  result: string;
  name: string;
  error: any;

  email: string;
  phoneNumber: string;
  nombre: string;
  verified: boolean;
  licenseNum: any;
  profilePic: any;
  role: string;
  password: string;
  username: string;
  code: any
  user: any;
  verificationCode: any;
  currentUser: any;

  userLat: any;
  userLong: any;

  lat: number;
  long: number;

  car : any;

  price : number;
  messageNotes : string;
  selectedCar:any;
  // selectedCard:any;
  total : number;
  card : any;
  lugar: string; //lugar que se guarda en el servicio de grua
  photo : any;
  destination: any;
  distance: number;
  precioMilla: any;
  time: any;
  serviceId: any;

  whatUser: boolean = false; //distingue si el usuario tiene un request procesado o es un cliente nuevo: false==no tiene ningun request
  requestQuantity : number;
  selectedRequest: any;
  requests : any;

  constructor(public nav: NavController, private alert: AlertController) {

  }

  ngOnInIt() {

    parse.serverURL = 'https://parseapi.back4app.com/';
    Parse.initialize("guMi91jQ9mwtDypMkb74aFyKPmI0sQN2CY9TPHW2", "qEd42GYwiQaSxPHkgST0XJXOFqeacdlz4vPYNZh8");

  }

  signUserUp() {
    console.log("Entrando singUp()");
    this.verificationCode = (Math.floor(Math.random() * 9999)).toString(10);
    if (this.verificationCode.length != 4) {
      this.verificationCode = this.verificationCode + "1";
    }

    console.log("Verification Code:", this.verificationCode);
    //Used to catch the error thrown by the signUp() function
    var no = false;
    const user = new Parse.User();
    user.set('email', this.email);
    user.set('phoneNumber', '+1' + this.phoneNumber);
    user.set('role', this.role);
    user.set('name', this.nombre);
    user.set('username', this.username);
    user.set('password', this.password);
    user.set('verificationCode', this.verificationCode);
    user.set("role", "C");
    user.set("verified", false);
    user.signUp().then((user) => {
      console.log("Code signedUp:" + this.verificationCode)
      this.currentUser = user;
      this.sendCode(this.verificationCode);
    }).catch((error) => {
      console.log(error);
      return false;
    });
    return true;
  }
  
  sendCode(code){
    console.log("sendCode()");
  
    let userId = Parse.User.current().id;
    console.log("ID:", userId);
  Parse.Cloud.run('sendVerificationCode', {
    verificationCode: code,
    userId: userId,
    phoneNumber: Parse.User.current().get('phoneNumber')
  }).then((result) => {
    console.log("mensaje enviado");
    console.log(result);
    this.nav.navigateRoot("/num-verification");
    return true;
  }, (error) => {
    console.log(error);
    return false;
  })
}

}
import { Component } from '@angular/core';
//import {Page, Platform} from 'ionic/ionic';


import { NavController, AlertController } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import {Platform} from "ionic-angular";

import { SocialSharing, Network, LocalNotifications, AdMob, Splashscreen } from 'ionic-native';
import {SettingPage} from "../setting/setting";
import * as moment from 'moment';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  geez_word = 'loading...';
  geez_verse = '';
  notifyTime: any;
  chosenHours: number;
  chosenMinutes: number;
  notifications: any[] = [];
  isError: number = 1;


  constructor(private http:Http, private platform: Platform, public navCtrl: NavController, public alertCtrl: AlertController) {
    this.platform = platform;
    this.notifyTime = moment(new Date()).format("MMM Do YY");
    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();
  }

  //  http://www.gajotres.net/ionic-2-how-to-use-cordova-plugins/

  ngOnInit() {

    //console.log(Network);
    //console.log("iiiiiiiiiiiiiiiii");

    Splashscreen.hide();

    if (Network.connection === 'none') {
      console.log('no connection!');

    } else {
      this.http.get('http://bible.geezexperience.com/tigrigna/')
        .subscribe((res:Response) => {
          let html = res["_body"];

          this.geez_verse = html.split("<h2>")[1].split("<span class=\"geezHead\">")[1].split("</span>")[0]
            + html.split("<h2>")[1].split("<span class=\"geezHead\">")[1].split("</span>")[1].split("</h2><p><span class=\"geez\">")[0];

          this.geez_word = html.split("<h2>")[1].split("<span class=\"geez\">")[1].split("</span>")[0];
        },
          (error) =>
            this.isError = 0);
    }


  }

  refreshVerse(){
    this.isError = 1;
    console.log(Network.connection);

    if (Network.connection === 'none') {
      console.log('no connection!');

    } else {
      this.http.get('http://bible.geezexperience.com/tigrigna/')
        .subscribe((res:Response) => {
            let html = res["_body"];

            this.geez_verse = html.split("<h2>")[1].split("<span class=\"geezHead\">")[1].split("</span>")[0]
              + html.split("<h2>")[1].split("<span class=\"geezHead\">")[1].split("</span>")[1].split("</h2><p><span class=\"geez\">")[0];

            this.geez_word = html.split("<h2>")[1].split("<span class=\"geez\">")[1].split("</span>")[0];
          },
          (error) =>
            this.isError = 0);
    }

  }

  ionViewDidLoad() {

  }


  share() {
    SocialSharing.share(this.geez_word+ ' '+ this.geez_verse, null /*Image*/, null /* url */)
      .then(()=>{
          //alert("Success");
        },
        ()=>{
          //alert("failed")
        })
  }

  setting() {
    this.navCtrl.push(SettingPage);
  }



  whatsappShare(message, subject, file, link) {
    SocialSharing.share(this.geez_word+ ' '+ this.geez_verse, null /*Image*/, null /* url */)
      .then(()=>{
          //alert("Success");
        },
        ()=>{
          //alert("failed")
        })
  }



  obtainNetworkConnection() {
     //watch network for a connection
    let connectSubscription = Network.onConnect().subscribe(() => {
          console.log('network connected!');

          // We just got a connection but we need to wait briefly

       // before we determine the connection type.  Might need to wait

          // prior to doing any api requests as well.
        //  setTimeout(() => {
        //      if (Network.connection === 'wifi') {
        //        console.log('we got a wifi connection, woohoo!');
        //      } else {
        //        console.log('no connection, woohoo!');
        //
        //      }
        //    }, 200);
        });

    // stop connect watch
    connectSubscription.unsubscribe();




    //if(Network.connection == 'none') {
    //  console.log('no connection!');
    //
    //} else if(Network.connection != 'none') {
    //  console.log('connection!');
    //
    //}
  }

  showInterstitials(){
    if (AdMob) AdMob.showInterstitial();
  }
}

import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, AdMob } from 'ionic-native';
import {HomePage} from "../pages/home/home";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {

    platform.ready().then(() => {
      StatusBar.styleDefault();

      interface AdMobType {
        banner:string,
        interstitial:string
      };

      var admobid:AdMobType;

      // select the right Ad Id according to platform
      if( /(android)/i.test(navigator.userAgent) ) {
        admobid = { // for Android
          banner: 'ca-app-pub-234324324324324/234324324324',
          interstitial: 'ca-app-pub-234324324324324/23432432432'
        };
      } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = { // for iOS
          banner: 'ca-app-pub-234324324324324/234324324324',
          interstitial: 'ca-app-pub-234324324324324/234324324324'
        };
      } else {
        admobid = { // for Windows Phone
          banner: 'ca-app-pub-234324324324324/234324324324',
          interstitial: 'ca-app-pub-234324324324324/234324324324'
        };
      }

      if(AdMob)  AdMob.createBanner({
        adId:admobid.banner,
        isTesting:true,//comment this out before publishing the app
        autoShow:true
      });

      if (AdMob) AdMob.prepareInterstitial({
        adId: admobid.interstitial,
        isTesting: true, //comment this out before publishing the app
        autoShow: false
      });
    });
  }
}


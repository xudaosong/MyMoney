import {Component, ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, NavController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomeComponent} from './component/home/home.component';


@Component({
  template: '<ion-nav #rootNavController [root]="rootPage" swipe-back-enabled="false"></ion-nav>'
})
export class MyMoney {
  @ViewChild('rootNavController') nav: NavController;

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = HomeComponent;
    // console.log('platform',platform)

    platform.ready().then(() => {
      StatusBar.overlaysWebView(false)
      StatusBar.backgroundColorByHexString('#da301c')
      document.addEventListener('backbutton', () => {
        if (!this.nav.canGoBack()) {
          this.platform.exitApp()
        } else {
          this.nav.pop()
        }
      }, false);
    })
  }
}

ionicBootstrap(MyMoney);

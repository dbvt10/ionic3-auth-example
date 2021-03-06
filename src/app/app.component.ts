import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';
import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private afAuth: AngularFireAuth) {

    // here we determine, if user is aunthenticated/have data in our db
    // thats we make before platform ready
    afAuth.authState.subscribe(user => {
      if (!user) {
        // you can modify here the page for non. auth users
        this.rootPage = AuthPage
        return;
      }
      // page for auth. users
      this.rootPage = HomePage
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


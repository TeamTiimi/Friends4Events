import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MediaProvider } from '../providers/media/media';
import {ProfilePage} from '../pages/profile/profile';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {EventPage} from '../pages/event/event';
import {CommentsPage} from '../pages/comments/comments';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    RegisterPage,
    EventPage,
    CommentsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    ProfilePage,
    RegisterPage,
    EventPage,
    CommentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MediaProvider,
    HttpClient
  ]
})
export class AppModule {}

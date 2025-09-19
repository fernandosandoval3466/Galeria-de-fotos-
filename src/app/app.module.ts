import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {GooglePlus} from '@ionic-native/google-plus/ngx';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule],
  providers: [
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    provideFirebaseApp(() => initializeApp({ 
    projectId: "tiendaonlinefsg", 
    appId: "1:78037822091:web:b396f793604d814818028e", 
    storageBucket: "tiendaonlinefsg.firebasestorage.app", 
    apiKey: "AIzaSyBRb-E4oxE7ziR2ZoTcJyp9A8oPAtFcMfU", 
    authDomain: "tiendaonlinefsg.firebaseapp.com", 
    messagingSenderId: "78037822091" })), provideAuth(() => getAuth())],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Auth, signInWithCredential, GoogleAuthProvider, UserCredential } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        
        private AFauth: Auth,
        private google: GooglePlus,
    ) { }

}
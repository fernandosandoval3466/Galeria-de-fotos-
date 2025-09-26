import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, UserCredential, User, onAuthStateChanged } from "@angular/fire/auth";
import { Firestore } from "@angular/fire/firestore";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private AFauth: Auth,
        private google: GooglePlus,
        private router: Router
    ) { }

    async loginWithEmail(email: string, password: string): Promise<UserCredential> {
        try {
            const result = await signInWithEmailAndPassword(this.AFauth, email, password);
            return result;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    async registerWithEmail(email: string, password: string): Promise<UserCredential> {
        try {
            const result = await createUserWithEmailAndPassword(this.AFauth, email, password);
            return result;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    }

    async resetPassword(email: string): Promise<void> {
        try {
            await sendPasswordResetEmail(this.AFauth, email);
        } catch (error) {
            console.error('Reset password error:', error);
            throw error;
        }
    }

    async loginWithGoogle(): Promise<UserCredential> {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(this.AFauth, provider);
            return result;
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    }

    getCurrentUser(): Observable<User | null> {
        return new Observable(observer => {
            const unsubscribe = onAuthStateChanged(this.AFauth, observer.next.bind(observer));
            return unsubscribe;
        });
    }

    getCurrentUserSync(): User | null {
        return this.AFauth.currentUser;
    }

    async logout() {
        try {
            await this.AFauth.signOut();
            this.router.navigate(['/login']);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    }
}

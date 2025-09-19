import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: false
})
export class Tab4Page {

    email!: string;
    password!: string;

    constructor(private authService: AuthService, private router: Router) { }



}


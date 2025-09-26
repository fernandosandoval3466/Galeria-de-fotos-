import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.scss'],
    standalone: false
})
export class Tab4Page implements OnInit {

    loginForm!: FormGroup;
    isLoading = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private alertController: AlertController,
        private loadingController: LoadingController,
        private toastController: ToastController
    ) { }

    ngOnInit() {
        this.initForm();
    }

    // Inicializar formulario reactivo
    initForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // Método para login
    async onLogin() {
        if (this.loginForm.invalid) {
            this.markFormGroupTouched();
            return;
        }

        this.isLoading = true;
        const loading = await this.showLoading('Iniciando sesión...');

        try {
            const { email, password } = this.loginForm.value;
            await this.authService.loginWithEmail(email, password);

            await loading.dismiss();
            this.showToast('Has iniciado sesión correctamente');

            // Redirigir al tab de fotos después del login
            this.router.navigate(['/tabs/tab1']);

        } catch (error: any) {
            await loading.dismiss();
            this.showAlert('Error', error.message || 'Error desconocido al iniciar sesión');
        } finally {
            this.isLoading = false;
        }
    }

    // Método para registro
    async onRegister() {
        if (this.loginForm.invalid) {
            this.markFormGroupTouched();
            return;
        }

        this.isLoading = true;
        const loading = await this.showLoading('Registrando usuario...');

        try {
            const { email, password } = this.loginForm.value;
            await this.authService.registerWithEmail(email, password);

            await loading.dismiss();
            this.showToast('Tu cuenta ha sido creada correctamente');

            // Redirigir a la página principal o tabs
            this.router.navigate(['/tabs']);

        } catch (error: any) {
            await loading.dismiss();
            this.showAlert('Error en registro', error.message || 'Error desconocido al registrar');
        } finally {
            this.isLoading = false;
        }
    }

    // Método para login con Google
    async onGoogleLogin() {
        this.isLoading = true;
        const loading = await this.showLoading('Iniciando sesión con Google...');

        try {
            await this.authService.loginWithGoogle();

            await loading.dismiss();
            this.showToast('Has iniciado sesión con Google correctamente');

            // Redirigir al tab de fotos después del login con Google
            this.router.navigate(['/tabs/tab1']);

        } catch (error: any) {
            await loading.dismiss();
            this.showAlert('Error', error.message || 'Error desconocido con Google');
        } finally {
            this.isLoading = false;
        }
    }

    // Método para restablecer contraseña
    async onForgotPassword() {
        const alert = await this.alertController.create({
            header: 'Restablecer Contraseña',
            message: 'Ingresa tu email para recibir un enlace de restablecimiento',
            inputs: [
                {
                    name: 'email',
                    type: 'email',
                    placeholder: 'example@gmail.com',
                    value: this.loginForm.get('email')?.value || ''
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Enviar',
                    handler: async (data) => {
                        if (!data.email) {
                            this.showAlert('Error', 'Por favor ingresa un email válido');
                            return false;
                        }

                        this.isLoading = true;
                        const loading = await this.showLoading('Enviando email de restablecimiento...');

                        try {
                            await this.authService.resetPassword(data.email);

                            await loading.dismiss();
                            this.showAlert(
                                '¡Email enviado!',
                                'Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña'
                            );

                        } catch (error: any) {
                            await loading.dismiss();
                            this.showAlert('Error', error.message || 'Error al enviar email de restablecimiento');
                        } finally {
                            this.isLoading = false;
                        }
                        return true;
                    }
                }
            ]
        });

        await alert.present();
    }

    // Método para mostrar loading
    private async showLoading(message: string) {
        const loading = await this.loadingController.create({
            message: message,
            spinner: 'crescent'
        });
        await loading.present();
        return loading;
    }

    // Método para mostrar alertas
    private async showAlert(header: string, message: string) {
        const alert = await this.alertController.create({
            header: header,
            message: message,
            buttons: ['OK']
        });
        await alert.present();
    }

    // Método para mostrar toast
    private async showToast(message: string) {
        const toast = await this.toastController.create({
            message: message,
            duration: 2000,
            position: 'top'
        });
        await toast.present();
    }

    // Marcar todos los campos del formulario como tocados para mostrar errores
    private markFormGroupTouched() {
        Object.keys(this.loginForm.controls).forEach(key => {
            const control = this.loginForm.get(key);
            control?.markAsTouched();
        });
    }

    // Getters para validación en el template
    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    // Método para verificar si un campo tiene error
    isFieldInvalid(fieldName: string): boolean {
        const field = this.loginForm.get(fieldName);
        return !!(field && field.invalid && field.touched);
    }

    // Método para obtener mensaje de error específico
    getFieldError(fieldName: string): string {
        const field = this.loginForm.get(fieldName);
        if (field && field.errors && field.touched) {
            if (field.errors['required']) {
                return `${fieldName === 'email' ? 'Email' : 'Contraseña'} es requerido`;
            }
            if (field.errors['email']) {
                return 'Email inválido';
            }
            if (field.errors['minlength']) {
                return 'La contraseña debe tener al menos 6 caracteres';
            }
        }
        return '';
    }
}


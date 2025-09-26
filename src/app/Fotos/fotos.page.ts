import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Foto } from '../services/foto';
import { CartService, Product } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { ToastController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fotos',
  templateUrl: 'fotos.page.html',
  styleUrls: ['fotos.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  products$ = this.productService.getProducts();
  filteredProducts$!: Observable<Product[]>;
  newProductForm: FormGroup;
  currentUser = this.authService.getCurrentUserSync();
  private searchSubject = new BehaviorSubject<string>('');

  constructor(
    public fotoService: Foto,
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.newProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });

    this.filteredProducts$ = combineLatest([this.products$, this.searchSubject]).pipe(
      map(([products, searchTerm]) =>
        products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }

  ngOnInit() {
    this.fotoService.loadSaved();
  }

  addPhotoToGallery() {
    this.fotoService.addNewToGallery();
  }

  async addNewProduct() {
    if (this.newProductForm.invalid) {
      this.newProductForm.markAllAsTouched();
      return;
    }

    const user = this.authService.getCurrentUserSync();
    if (!user) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debes iniciar sesión para agregar productos.',
        buttons: [
          {
            text: 'Iniciar Sesión',
            handler: () => {
              this.router.navigate(['/login']);
            }
          }
        ]
      });
      await alert.present();
      return;
    }

    try {
      const { name, price, image } = this.newProductForm.value;
      await this.productService.addProduct({ name, price: Number(price), image });
      this.newProductForm.reset();
      const toast = await this.toastController.create({
        message: 'Producto agregado exitosamente',
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      // Refresh products
      this.products$ = this.productService.getProducts();
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo agregar el producto. Verifica tu conexión.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  onSearch(event: any) {
    const searchTerm = event.detail.value || '';
    this.searchSubject.next(searchTerm);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.showToast(`${product.name} agregado al carrito`);
  }

  async deleteProduct(product: Product) {
    const user = this.authService.getCurrentUserSync();
    if (!user || product.userId !== user.uid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No tienes permisos para eliminar este producto.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const confirmAlert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Estás seguro de que quieres eliminar "${product.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            try {
              await this.productService.deleteProduct(product.id);
              this.showToast('Producto eliminado exitosamente');
              // Refresh products
              this.products$ = this.productService.getProducts();
            } catch (error) {
              const alert = await this.alertController.create({
                header: 'Error',
                message: 'No se pudo eliminar el producto.',
                buttons: ['OK']
              });
              await alert.present();
            }
          }
        }
      ]
    });
    await confirmAlert.present();
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }
}

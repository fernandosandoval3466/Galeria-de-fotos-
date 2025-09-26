import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: 'Cart.page.html',
  styleUrls: ['Cart.page.scss'],
  standalone: false,
})
export class CartPage implements OnInit {

  cartItems$: Observable<CartItem[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService, private alertController: AlertController) {
    this.cartItems$ = this.cartService.cartItems$;
    this.total$ = this.cartItems$.pipe(
      map(items => this.cartService.getTotal())
    );
  }

  ngOnInit() {}

  updateQuantity(item: CartItem, quantity: string | number | null | undefined) {
    if (quantity === null || quantity === undefined) return;
    const numQuantity = typeof quantity === 'string' ? Number(quantity) : quantity;
    this.cartService.updateQuantity(item.product.id, numQuantity);
  }

  removeItem(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  async onBuy() {
    const alert = await this.alertController.create({
      header: 'Sé paciente!',
      message: 'Esta función se agregará próximamente.',
      buttons: ['OK']
    });
    await alert.present();
  }
}

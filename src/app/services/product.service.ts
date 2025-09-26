import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  userId?: string;
}

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private firestore: Firestore, private authService: AuthService) { }

    async addProduct(product: Omit<Product, 'id' | 'userId'>): Promise<string> {
        try {
            const user = this.authService.getCurrentUserSync();
            if (!user) {
                throw new Error('Usuario no autenticado');
            }
            const productsRef = collection(this.firestore, 'products');
            const data = { ...product, userId: user.uid };
            const docRef = await addDoc(productsRef, data);
            return docRef.id;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    }

    getProducts(): Observable<Product[]> {
        const productsRef = collection(this.firestore, 'products');
        return from(getDocs(productsRef)).pipe(
            map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)))
        );
    }

    // Optional: update and delete if needed
    async updateProduct(id: string, product: Partial<Product>) {
        const productRef = doc(this.firestore, `products/${id}`);
        await updateDoc(productRef, product);
    }

    async deleteProduct(id: string) {
        const productRef = doc(this.firestore, `products/${id}`);
        await deleteDoc(productRef);
    }
}

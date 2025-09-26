import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../services/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab4',
        loadChildren: () => import('../Login/login.module').then(m => m.Tab4PageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('../Fotos/fotos.module').then(m => m.Tab1PageModule),
        canActivate: [AuthGuard] // Proteger esta ruta con AuthGuard
      },
      {
        path: 'tab2',
        loadChildren: () => import('../Carrito/Cart.module').then(m => m.CartPageModule),
        canActivate: [AuthGuard] // Proteger esta ruta con AuthGuard
      },

      {
        path: '',
        redirectTo: '/tabs/tab4',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab4',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

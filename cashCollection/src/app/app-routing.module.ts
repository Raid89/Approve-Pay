import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { authGuard } from './shared/guards/login.guard';

const routes: Routes = [
  
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  {
    path: 'auth',
    loadChildren: () => import('./features/user-auth/user-auth.module').then(m => m.UserAuthModule)
  },

  {
    path: 'home',
    loadChildren: () => import('./features/menu/menu.module').then(m => m.MenuModule),
    canActivate: [authGuard]
  },

  {
    path: 'receipts',
    loadChildren: () => import('./features/receipts/receipts.module').then(m => m.ReceiptsModule),
    // canActivate: [authGuard]
  },
  
  {
    path: 'history',
    loadChildren: () => import('./features/history/history-routing.module').then(m => m.HistoryRoutingModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

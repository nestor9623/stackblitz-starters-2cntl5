import { Route } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Route[] = [
  { path: 'login', loadComponent: () => import('./components/login/login.component').then(mod => mod.LoginComponent) },
  {
    path: 'post-home', loadComponent: () => import('./components/post-home/post-home.component').then(mod => mod.PostHomeComponent), canActivate: [authGuard]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'login',
  },
];

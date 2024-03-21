import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then(
                (m) => m.AuthModule
            ),
    },
    {
        path: 'login',
        loadChildren: () =>
            import('./modules/auth/auth.module').then(
                (m) => m.AuthModule
            ),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./modules/main/main.module').then(
                (m) => m.MainModule
            ),
    },

    {
        path: '**',
        loadChildren: () =>
            import('./modules/main/main.module').then(
                (m) => m.MainModule
            ),
    },
];

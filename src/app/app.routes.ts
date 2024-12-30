import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'notes-list', loadComponent: () => import('./pages/notes-page/notes-page.component').then(m => m.NotesPageComponent) },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: "**", loadComponent: () => import('./pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent) }
];

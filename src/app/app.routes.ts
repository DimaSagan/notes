import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'notes-list', pathMatch: 'full' },
    { path: 'notes-list', loadComponent: () => import('./pages/notes-page/notes-page.component').then(m => m.NotesPageComponent) },

    {path:"**", loadComponent: () => import('./pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)}
];

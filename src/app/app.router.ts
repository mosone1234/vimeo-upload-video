import { Routes } from "@angular/router";
import { VimeoComponent } from './components/vimeo/vimeo.component';
import { NavbarComponent } from './components/navbar/navbar.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'vimeo',
        pathMatch: 'full'
    },
    {
        path: '',
        component: NavbarComponent,
        outlet: 'navbar'
    },
    {
        path: 'vimeo',
        component: VimeoComponent
    }
];
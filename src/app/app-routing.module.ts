import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VimeoComponent } from './components/vimeo/vimeo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'vimeo',
    pathMatch: 'full'
  },
  {
    path: 'vimeo',
    component: VimeoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

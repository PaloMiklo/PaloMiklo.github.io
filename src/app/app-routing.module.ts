import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },

  // auxiliary routes
  {
    path: 'about',
    outlet: 'about-outlet',
    loadChildren: () => import('./components/modals/about-modal/module/about-modal.module')
      .then(m => m.AboutModalModule)
  },
  {
    path: 'contact',
    outlet: 'contact-outlet',
    loadChildren: () => import('./components/modals/contact-modal/module/contact-modal.module')
      .then(m => m.ContactModalModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

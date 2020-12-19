import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';

const routes: Routes = [
    {
      path: '',
      /*
      significa que o match será feito somente quando for host:port/ sem usar essa tag, o angular pode tentar dar match tmb com host:port/ ou host:port/algo/
      */
      pathMatch: 'full',
      redirectTo: 'home'
    },
    {
      path: 'home',
      loadChildren: './home/home.module#HomeModule'
    },
    {
      path: 'user/:userName',
      component: PhotoListComponent,
      resolve: {
        photoList: PhotoListResolver
      }
    },
    {
      path: 'p/add',
      component: PhotoFormComponent,
      canActivate: [AuthGuard]
    },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

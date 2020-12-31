import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';
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
      },
      /*
      O sistema de rotas do Angular permite que o desenvolvedor pendure informações nas
      configurações de rota para que mais tarde sejam obtidas através dos componentes carregadas por ela.
      */
      data: {
        title: 'Timeline'
      }
    },
    {
      path: 'p/add',
      component: PhotoFormComponent,
      canActivate: [AuthGuard],
      data: {
        title: 'Photo upload'
      }
    },
    {
      path: 'p/:photoId',
      component: PhotoDetailsComponent,
      data: {
        title: 'Photo detail'
      }
    },
    {
      path: 'not-found',
      component: NotFoundComponent,
      data: {
        title: 'Not found'
      }
    },
    {
      path: 'error',
      component: GlobalErrorComponent,
      data: {
        title: 'Error'
      }
    },
    {
      path: '**',
      redirectTo: 'not-found'
    }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

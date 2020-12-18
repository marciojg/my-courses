import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RequestInterceptor } from './auth/request.interceptor';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    {
      /*
      O Angular já inclui um interceptador padrão no Http Client, o qual não faz nada.
      Queremos, então, indicar ao Angular que a implementação do interceptador que
      será utilizada é a nossa.
      */
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      /*
      O multi: true serve para quando houver mais de um interceptador,
      para que seja delegado sucessivamente.
      */
      multi: true
    }
  ]
})
export class CoreModule {}

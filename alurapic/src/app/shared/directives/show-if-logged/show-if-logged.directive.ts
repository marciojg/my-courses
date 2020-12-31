import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({ selector: '[showIfLogged]' })
export class ShowIfLoggedDirective implements OnInit {

  currentDisplay: string;

  constructor(
      private element: ElementRef<any>,
      private renderer: Renderer2,
      private userService: UserService
  )   {}

  /*
  A questão é que nosso menu faz parte do header da aplicação, e ele nunca é recarregado.
  Isso significa que o último estado do menu sempre será o mesmo. Para resolver esse problema,
  acrescentaremos algumas modificações em show-if-logged.directive.ts, tornando seu código um pouco
  mais complexo.
  */
  ngOnInit(): void {
    this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
    this.userService.getUser().subscribe(user => {
      if(user) {
        this.renderer.setStyle(this.element.nativeElement, 'display', this.currentDisplay);
      } else {
        this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
        this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
      }
   });
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { LoadingType } from './loading-type';

@Injectable({ providedIn: 'root' })
export class LoadingService {

    loadingSubject = new Subject<LoadingType>();

    getLoading() {
      return this.loadingSubject
                 .asObservable()
                 /*
                 quando asObservable() for chamado pela primeira vez, o padrão que desejamos
                 para quem o assinar é STOPPED
                 */
                 .pipe(startWith(LoadingType.STOPPED));
    }

    start() {
      this.loadingSubject.next(LoadingType.LOADING);
    }

    stop() {
      this.loadingSubject.next(LoadingType.STOPPED);
    }
}

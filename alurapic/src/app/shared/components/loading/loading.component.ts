import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Component({
  selector: 'ap-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['loading.component.css']
})
export class LoadingComponent implements OnInit {

  loading$: Observable<string>

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService
                        .getLoading()
                        /* Com esse pipe pegamos o valor dos tipos disponíveis no enum
                          LOADING = 'loading',
                          STOPPED = 'stopped'
                        */
                        .pipe(map(loadingType => loadingType.valueOf()));
  }
}

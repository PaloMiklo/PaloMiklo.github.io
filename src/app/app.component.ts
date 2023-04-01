import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Unsubscribe } from './core/decorators/class/unsubscribe';
import { EmptyClass } from './core/mixins/base';
import { UnsubscribeMixin } from './core/mixins/unsubscribe';
import { BusyService } from './core/service/busy.service';

@Unsubscribe
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends UnsubscribeMixin(EmptyClass) implements OnInit {
  public ready = false;

  constructor(
    private readonly _busyService: BusyService,
    private cdRef: ChangeDetectorRef
  ) {
    super();
  };

  ngOnInit(): void {
    console.log(environment.buildDate);

    this._busyService.ready$.pipe(
      tap((ready: boolean) => {
        this.ready = ready;
        this.cdRef.markForCheck()
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  };
}

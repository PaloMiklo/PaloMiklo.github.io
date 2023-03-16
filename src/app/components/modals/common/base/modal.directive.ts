import { Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Unsubscribe } from 'src/app/core/decorators/class/unsubscribe';
import { EmptyClass } from 'src/app/core/mixins/base';
import { UnsubscribeMixin } from 'src/app/core/mixins/unsubscribe';
import { BusyService } from 'src/app/core/service/busy.service';
import { MenuButtonsStateService } from 'src/app/core/state/menu-buttons.service';

@Unsubscribe
@Directive({ selector: '[appModal]' })
export class ModalDirective extends UnsubscribeMixin(EmptyClass) {
  protected readonly MODAL_CLOSED = 'hidden.bs.modal';
  protected ready = false;

  constructor(
    protected readonly state: MenuButtonsStateService,
    protected readonly busyService: BusyService,
    protected readonly route: ActivatedRoute,
    protected readonly router: Router
  ) {
    super();
  };

  protected readonly detectReadyState$ = (): Observable<boolean> => this.busyService.ready$
    .pipe(tap((state: boolean) => this.ready = state));

  public readonly afterClose = (): void => {
    this.router.navigate(['..'], { relativeTo: this.route });
    this.state.resetActiveMenuBtn();
  };
}


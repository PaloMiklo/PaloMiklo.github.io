import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { takeUntil, tap } from 'rxjs';
import { ModalTypes } from 'src/app/core/enum';
import { BusyService } from 'src/app/core/service/busy.service';
import { MenuButtonsStateService } from 'src/app/core/state/menu-buttons.service';
import { ModalDirective } from '../common/base/modal.directive';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutModalComponent extends ModalDirective implements AfterViewInit {
  @ViewChild('about') private _modalRef: ElementRef<HTMLElement>;

  private _modal: Modal;
  public readonly MODALS = ModalTypes;

  constructor(
    protected override readonly state: MenuButtonsStateService,
    protected override readonly busyService: BusyService,
    protected override readonly route: ActivatedRoute,
    protected override readonly router: Router
  ) {
    super(state, busyService, route, router);
  }

  ngAfterViewInit(): void {
    this.detectReadyState$().pipe(
      tap(() => {
        this._modalRef.nativeElement.style.zIndex = !this.ready ? '1' : '998';
        this._modalRef.nativeElement.addEventListener(this.MODAL_CLOSED, () => this.afterClose());
        this._modal = Modal.getOrCreateInstance(this._modalRef.nativeElement);
        this._modal.show();
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  };
} 

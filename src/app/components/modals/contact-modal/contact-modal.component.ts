import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { takeUntil, tap } from 'rxjs';
import { AlertService } from 'src/app/core/alert/service/alert.service';
import { ModalTypes } from 'src/app/core/enum';
import { MessageModel, MessageModelFields } from 'src/app/core/forms/model/message';
import { IMessage } from 'src/app/core/model';
import { BusyService } from 'src/app/core/service/busy.service';
import { MenuButtonsStateService } from 'src/app/core/state/menu-buttons.service';
import { ModalDirective } from '../common/base/modal.directive';
import { contactForm } from './contact-modal.config';
import { ContactModalService } from './service/contact-modal.service';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.scss'],
  providers: [ContactModalService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactModalComponent extends ModalDirective implements OnInit, AfterViewInit {
  @ViewChild('contact') private _modalRef: ElementRef<HTMLElement>;

  public form: FormGroup<MessageModel>;
  public readonly MODALS = ModalTypes;
  public readonly FIELD = MessageModelFields;

  private _modal: Modal;

  constructor(
    private readonly _service: ContactModalService,
    private readonly _alert: AlertService,
    protected override readonly state: MenuButtonsStateService,
    protected override readonly busyService: BusyService,
    protected override readonly route: ActivatedRoute,
    protected override readonly router: Router
  ) {
    super(state, busyService, route, router);
  }

  ngOnInit(): void { this.form = contactForm(); };

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

  public readonly onSend = (): void => {
    const mssg: IMessage = Object.assign(
        this.form.getRawValue(),
        { datetime: new Date().toISOString() }
      );
    this._service.sentMessage$(mssg).pipe(
      tap(() => this.form.reset()),
      takeUntil(this.unsubscribe$)
    ).subscribe()
  }
}

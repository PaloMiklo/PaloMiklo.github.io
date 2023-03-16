import { transition, trigger, useAnimation } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { zoomOut } from 'ng-animate';
import { takeUntil, tap } from 'rxjs';
import { Unsubscribe } from '../decorators/class/unsubscribe';
import { EmptyClass } from '../mixins/base';
import { UnsubscribeMixin } from '../mixins/unsubscribe';
import { AlertType, IAlertContent } from './config/alert.config';
import { AlertService } from './service/alert.service';

@Unsubscribe
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('zoomOut', [
      transition('void => true', useAnimation(zoomOut)),
      transition('false => true', useAnimation(zoomOut)),
      transition('true => false', useAnimation(zoomOut))
    ])
  ]
})
export class AlertComponent extends UnsubscribeMixin(EmptyClass) implements OnInit {
  public alerts: TAlertContent[] = [];
  public readonly TYPES = AlertType;

  constructor(
    private readonly _alertService: AlertService,
    private readonly _cdRef: ChangeDetectorRef
  ) {
    super();
  };

  ngOnInit(): void {
    this._alertService.display$.pipe(
      tap((alert: IAlertContent) => {
        if (this._alreadyContains(alert.uuid))
          this._removeAlertBy(alert.uuid);
        else
          this._add(Object.assign(alert, { zoomOut: false }));
        this._cdRef.markForCheck();
      }),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  };

  public readonly copyMessage = (mssg: string, i: number): void => {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = mssg;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.alerts[i].zoomOut = !this.alerts[i].zoomOut;
  };

  public readonly onClose = (uuid: string): void => this._removeAlertBy(uuid);

  private readonly _alreadyContains = (uuid: string): boolean => this.alerts.some((existing: IAlertContent) => existing.uuid === uuid);

  private readonly _add = (alert: TAlertContent): void => { this.alerts.push(alert) };

  private readonly _removeAlertBy = (uuid: string): void => { this.alerts = this.alerts.filter((a: IAlertContent) => a.uuid !== uuid) };
};

type TAlertContent = IAlertContent & { zoomOut: boolean };
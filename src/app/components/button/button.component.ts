import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { Unsubscribe } from 'src/app/core/decorators/class/unsubscribe';
import { ModalTypes } from 'src/app/core/enum';
import { EmptyClass } from 'src/app/core/mixins/base';
import { UnsubscribeMixin } from 'src/app/core/mixins/unsubscribe';
import { MenuButtonsStateService } from 'src/app/core/state/menu-buttons.service';

@Unsubscribe
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent extends UnsubscribeMixin(EmptyClass) implements OnInit {
  @Input() public title: string;
  @Input() public target: ModalTypes;

  constructor(
    private readonly _router: Router,
    private readonly _cdRef: ChangeDetectorRef,
    public readonly state: MenuButtonsStateService
  ) {
    super();
  };

  ngOnInit(): void {
    // listen for changes and update the state of all buttons
    this.state.changesOnMenuButtons$.pipe(
      tap(() => this._cdRef.detectChanges()),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  };

  public readonly onRouteChange = (target?: ModalTypes): void => {
    this.state.activeMenuBtn = target;
    this.state.changesOnMenuButtons.next();
    this._preventMultipleBackdrops();
    this._router.navigateByUrl(`/(${target}-outlet:${target})`);
  };

  // bootstrap appends new html element on each modal opening if previous one was not closed manually
  private readonly _preventMultipleBackdrops = (): void => {
    const backdrops: HTMLCollection = document.getElementsByClassName('modal-backdrop');
    backdrops.length > 0 && backdrops.item(0)!.remove();
  }
};


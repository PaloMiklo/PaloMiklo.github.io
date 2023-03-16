import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MENU_ITEMS } from '../core/config';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  public readonly menuItems = MENU_ITEMS;

  constructor(
    private readonly _cdRef: ChangeDetectorRef
  ) { }

  public readonly detect = (): void => this._cdRef.detectChanges();

}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-about-main',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutMainComponent { }

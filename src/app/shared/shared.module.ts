import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import { SocialComponent } from '../components/button/social/social.conponent';

@NgModule({
  declarations: [
    ButtonComponent
  ],
  imports: [
    CommonModule,
    SocialComponent
  ],
  exports:[
    ButtonComponent,
    SocialComponent
  ]
})
export class SharedModule { }

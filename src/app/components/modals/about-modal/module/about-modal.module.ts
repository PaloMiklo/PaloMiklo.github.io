import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsCoreModule } from 'src/app/core/forms/module/forms-core.module';
import { CommonModalModule } from '../../common/module/common.module';
import { AboutModalComponent } from '../about-modal.component';
import { AboutMainComponent } from '../main/about-main.component';
import { AboutRoutingModule } from './about-routing.module';


@NgModule({
    declarations: [
        AboutModalComponent,
        AboutMainComponent
    ],
    imports: [
        CommonModule,
        CommonModalModule,
        FormsCoreModule,
        AboutRoutingModule
    ],
    providers: []
})
export class AboutModalModule { }

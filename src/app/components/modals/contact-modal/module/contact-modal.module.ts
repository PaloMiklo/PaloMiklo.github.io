import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsCoreModule } from 'src/app/core/forms/module/forms-core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModalModule } from '../../common/module/common.module';
import { ContactModalComponent } from '../contact-modal.component';
import { ContactMainComponent } from '../main/contact-main.component';
import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
    declarations: [
        ContactMainComponent,
        ContactModalComponent
    ],
    imports: [
        CommonModule,
        CommonModalModule,
        FormsCoreModule,
        ContactRoutingModule,
        SharedModule
    ],
    providers: []
})
export class ContactModalModule { }

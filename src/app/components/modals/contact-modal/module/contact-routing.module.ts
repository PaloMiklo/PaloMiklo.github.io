import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactModalComponent } from '../contact-modal.component';
import { ContactMainComponent } from '../main/contact-main.component';

const routes: Routes = [
    {
        path: '', component: ContactMainComponent,
        children: [
            { path: '', component: ContactModalComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule { }

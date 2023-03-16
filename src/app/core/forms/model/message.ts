import { FormControl } from "@angular/forms";

export interface MessageModel {
    [MessageModelFields.NAME]: FormControl<string>;
    [MessageModelFields.EMAIL]: FormControl<string>;
    [MessageModelFields.MESSAGE]: FormControl<string>;
}

export enum MessageModelFields {
    NAME = 'name',
    EMAIL = 'email',
    MESSAGE = 'message'
} 

export type TFormModels = MessageModel;
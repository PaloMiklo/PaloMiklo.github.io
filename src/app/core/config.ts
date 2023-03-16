import { ModalTypes } from "./enum";
import { IMenuItem } from "./model";

export const MENU_ITEMS: IMenuItem[] = [
    {
        title: 'about me',
        target: ModalTypes.ABOUT
    },
    {
        title: 'contact',
        target: ModalTypes.CONTACT
    }
];

export const ALERT_TIMEOUT_ON_OFF = 20000;
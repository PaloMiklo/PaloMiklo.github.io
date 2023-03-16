import { ModalTypes } from "./enum";

export interface IMenuItem {
    title: string,
    target: ModalTypes
};

export interface IMessage {
    name: string,
    email: string,
    message: string,
    datetime: string
};
export interface IAlertContent { mssg: string, type: AlertType, uuid: string };
export enum AlertType { SUCCESS = 0, ERROR = 1, INFO = 2 };
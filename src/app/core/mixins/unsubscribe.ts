import { Subject } from "rxjs";

export function UnsubscribeMixin(BaseClass: any) {
    return class extends BaseClass {
        protected readonly unsubscribe = new Subject<void>();
        protected readonly unsubscribe$ = this.unsubscribe.asObservable();
    }
}
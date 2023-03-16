// onDestroy implementation on child not needed
// if onDestroy is implemented on child also, both implementations gets called
// synergy of UnsubscribeMixin & Unsubscribe decorator
export function Unsubscribe(targetClass: Function) {

    const original = targetClass.prototype.ngOnDestroy;

    targetClass.prototype.ngOnDestroy = function () {
        const unsubscribeRef = this['unsubscribe'];

        unsubscribeRef.next();
        unsubscribeRef.complete();

        original?.apply(this)
    }
};

import { defer, Observable } from "rxjs";

export function doOnSubscribe<T = unknown>(onSubscribe: () => void): (source: Observable<T>) => Observable<T> {
    return function inner(source: Observable<T>): Observable<T> {
        return defer(() => {
            onSubscribe();
            return source;
        });
    };
}
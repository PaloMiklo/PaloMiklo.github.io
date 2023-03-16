import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {

  private constructor(
    private readonly _http: HttpClient
  ) { }

  public readonly postData$ = <T = unknown>(url: string, data: T): Observable<T> => this._http.post<T>(url, data);
}

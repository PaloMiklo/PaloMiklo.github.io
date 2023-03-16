import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMessage } from 'src/app/core/model';
import { HttpService } from 'src/app/core/service/http.service';

@Injectable()
export class ContactModalService {
  constructor(
    private readonly _http: HttpService
  ) { }

  public readonly sentMessage$ = (mssg: IMessage): Observable<IMessage> => this._http.postData$<IMessage>('/api/onSendMessage', mssg);
}

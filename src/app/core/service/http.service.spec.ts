import { HttpClient } from '@angular/common/http';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import {
    inject,
    TestBed,
    waitForAsync
} from '@angular/core/testing';
import { map, of, tap } from 'rxjs';
import { IMessage } from '../model';
import { HttpService } from './http.service';

describe('Http service', function () {
  const url = '/api/onSendMessage';
  const message: IMessage = {
    name: 'name',
    email: 'email@gmail.com',
    message: 'lorem ipsum',
    datetime: String(Date.now)
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: HttpClient }],
    });

  }));

  it('should post message', inject(
    [HttpTestingController, HttpService],
    (httpMock: HttpTestingController, dataService: HttpService) => {

      dataService.postData$(url, message).pipe(
        tap((res: IMessage) => expect(res).toEqual(message)),
        map((res: IMessage) => of(res))
      ).subscribe();

      const mockReq = httpMock.expectOne(url);

      expect(mockReq.request.body).toEqual(message);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(message);

      httpMock.verify();
    }
  ));
});

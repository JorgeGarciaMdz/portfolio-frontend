import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './User';


@Injectable({
  providedIn: 'root'
})
export class SinginService {

  private url: string = 'http://127.0.0.1:8080/auth/singin'
  constructor(private httpClient: HttpClient) { }

  public initSession(userSingin: User): Observable<any> {
    return this.httpClient.post<any>(this.url, userSingin);
  }
}

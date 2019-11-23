import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  _url = 'http://localhost:3000/users';

  constructor(private _http: HttpClient) {

  }

  addUser(user: User) {
    return this._http.post<any>(this._url, user);
  }

  removeUser(id) {
    return this._http.delete(`${this._url}/${id}`);
  }
}

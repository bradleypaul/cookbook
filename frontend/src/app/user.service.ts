import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private loginUrl = `${environment.url}/login`;
    private signupUrl = `${environment.url}/signup`;

    constructor(
        private http: HttpClient
    ) { }

    isUser(user: User): Observable<void> {
        return this.http.post<void>(this.loginUrl, user);
    }

    createUser(user: User): Observable<void> {
        return this.http.post<void>(this.signupUrl, user);
    }

    // updateUser(user: User): Observable<void> {
    //     const updateUrl = `${this.userBaseUrl}/${user.id}`;
    //     return this.http.put<void>(updateUrl, user);
    // }

    // deleteUser(id: number): Observable<void> {
    //     return this.http.delete<void>(`${this.userBaseUrl}/${id}`);
    // }
}

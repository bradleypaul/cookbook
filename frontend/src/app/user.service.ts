import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userBaseUrl = `${environment.url}/login`;

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    getUser(user: User): Observable<User> {
        this.log(`HeroService: fetched hero user=${user}`);
        return this.http.get<User>(`${this.userBaseUrl}`);
    }

    isUser(user: User): Observable<void> {
        return this.http.post<void>(this.userBaseUrl, user);
    }

    // createUser(user: User): Observable<void> {
    //     return this.http.post<void>(this.userBaseUrl, user);
    // }

    updateUser(user: User): Observable<void> {
        const updateUrl = `${this.userBaseUrl}/${user.id}`;
        return this.http.put<void>(updateUrl, user);
    }

    deleteUser(id: number): Observable<void> {
        return this.http.delete<void>(`${this.userBaseUrl}/${id}`);
    }

    private log(message: string) {
        this.messageService.add(`user service: ${message}`);
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUser } from './user.type';
import { map, Observable, switchMap, take, tap, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;

  private user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
  private users: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);

  constructor(private http: HttpClient) {}

  /**
   * getter for fuels
   */
  get users$(): Observable<IUser[]> {
    return this.users.asObservable();
  }

  /**
   * getter for fuel
   */
  get user$(): Observable<IUser> {
    return this.user.asObservable();
  }

  // get user
  getUser() {
    return this.http.get<IUser[]>(this.baseUrl + '/user').pipe(
      tap((ful: IUser[]) => {
        this.users.next(ful);
      })
    );
  }

  //get by id
  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/user/${id}`).pipe(
      tap((usr) => {
        this.user.next(usr);
      })
    );
  }

  // create user
  createUser(user: IUser): Observable<IUser> {
    return this.users$.pipe(
      take(1),
      switchMap((usr) =>
        this.http.post(this.baseUrl + '/user', user).pipe(
          map((newUser: any) => {
            this.users.next([...usr, newUser]);
            return newUser;
          })
        )
      )
    );
  }

  //update User
  userUpdate(id: string, user: IUser): Observable<IUser> {
    return this.users$.pipe(
      take(1),
      switchMap((usr) =>
        this.http.put<IUser>(`${this.baseUrl}/fuel/${id}`, user).pipe(
          map((updateUser) => {
            const index = usr.findIndex((usrs) => usrs._id === id);
            usr[index] = updateUser;
            this.users.next(usr);
            this.user.next(updateUser);
            return updateUser;
          })
        )
      )
    );
  }

  clrPrevData(){
    this.user.next(null)
  }


}

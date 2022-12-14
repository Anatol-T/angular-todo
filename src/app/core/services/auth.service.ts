import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { CommonResponse } from '../models/core.models'
import { ResultCodeEnum } from '../enums/resultCode.enum'
import { Router } from '@angular/router'
import { LoginRequestData, MeResponse } from '../models/auth.models'
import { BehaviorSubject, catchError, EMPTY, tap } from 'rxjs'
import { NotificationService } from './notification.service'

@Injectable()
export class AuthService {
  isAuth = false
  meRequest = false
  // resolveAuthRequest: Function = () => {}
  // authRequest = new Promise(resolve => {
  //   this.resolveAuthRequest = resolve
  // })
  isAuth$ = new BehaviorSubject<boolean>(false)

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login(data: Partial<LoginRequestData>) {
    this.isAuth$.next(true)
    this.http
      .post<CommonResponse<{ userId: number }>>(
        `${environment.baseUrl}/auth/login`,
        data
      )
      .pipe(
        catchError(this.errorHandler.bind(this)),
        tap(() => {
          this.isAuth$.next(false)
        })
      )
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/'])
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }

  logout() {
    this.isAuth$.next(true)
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth$.next(false)
          this.router.navigate(['/login'])
        }
      })
  }

  me() {
    this.meRequest = true
    this.isAuth$.next(true)
    return this.http
      .get<CommonResponse<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(
        tap(res => {
          if (res.resultCode === ResultCodeEnum.success) {
            this.isAuth = true
          }
          this.isAuth$.next(false)
        }),
        catchError(this.errorHandler.bind(this))
      )
    // .subscribe(res => {
    //   if (res.resultCode === ResultCodeEnum.success) {
    //     this.isAuth = true
    //   }
    //   this.resolveAuthRequest()
    //   this.isAuth$.next(false)
    // })
  }

  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}

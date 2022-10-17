import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { CommonResponse } from '../models/core.models'
import { ResultCodeEnum } from '../enums/resultCode.enum'
import { Router } from '@angular/router'
import { LoginRequestData, MeResponse } from '../models/auth.models'
import { BehaviorSubject, catchError, EMPTY } from 'rxjs'

@Injectable()
export class AuthService {
  isAuth = false
  resolveAuthRequest: Function = () => {}
  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })
  isAuth$ = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router) {}

  login(data: Partial<LoginRequestData>) {
    this.isAuth$.next(true)
    this.http
      .post<CommonResponse<{ userId: number }>>(
        `${environment.baseUrl}/auth/login`,
        data
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth$.next(false)
          this.router.navigate(['/'])
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
    this.isAuth$.next(true)
    this.http
      .get<CommonResponse<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth = true
        }
        this.resolveAuthRequest()
        this.isAuth$.next(false)
      })
  }

  private errorHandler(err: HttpErrorResponse) {
    console.log(err.message)
    return EMPTY
  }
}

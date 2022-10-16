import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment'
import { CommonResponse } from '../models/core.models'
import { ResultCodeEnum } from '../enums/resultCode.enum'
import { Router } from '@angular/router'
import { LoginRequestData, MeResponse } from '../models/auth.models'

@Injectable()
export class AuthService {
  isAuth = false
  resolveAuthRequest: Function = () => {}
  authRequest = new Promise(resolve => {
    this.resolveAuthRequest = resolve
  })

  constructor(private http: HttpClient, private router: Router) {}

  login(data: Partial<LoginRequestData>) {
    this.http
      .post<CommonResponse<{ userId: number }>>(
        `${environment.baseUrl}/auth/login`,
        data
      )
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/'])
        }
      })
  }

  logout() {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/auth/login`)
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.router.navigate(['/login'])
        }
      })
  }

  me() {
    this.http
      .get<CommonResponse<MeResponse>>(`${environment.baseUrl}/auth/me`)
      .subscribe(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          this.isAuth = true
        }
        this.resolveAuthRequest()
      })
  }
}

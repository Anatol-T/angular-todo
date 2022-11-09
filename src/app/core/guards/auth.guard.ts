import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { AuthService } from '../services/auth.service'
import { map, Observable } from 'rxjs'
import { ResultCodeEnum } from '../enums/resultCode.enum'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const urlNav = this.router.createUrlTree(['/login'])

    return this.authService.me().pipe(
      map(res => {
        if (res.resultCode === ResultCodeEnum.success) {
          return true
        } else {
          return urlNav
        }
      })
    )
  }
}

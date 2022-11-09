import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http'
import { finalize, Observable } from 'rxjs'
import { environment } from '../../../environments/environment'
import { LoadingService } from '../services/loading.service'
import { AuthService } from '../services/auth.service'

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  totalRequests = 0
  completedRequests = 0

  constructor(
    private loader: LoadingService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.totalRequests === 0) {
      console.log('me start', this.authService.meRequest)
      if (!this.authService.meRequest) {
        console.log('show')
        this.loader.show()
      }
    }
    this.totalRequests++

    request = request.clone({
      withCredentials: true,
      headers: new HttpHeaders().append('api-key', environment['apiKey']),
    })
    return next.handle(request).pipe(
      finalize(() => {
        this.completedRequests++
        // console.log(
        //   'final',
        //   this.authService.isAuth,
        //   this.completedRequests,
        //   this.totalRequests
        // )
        if (this.completedRequests === this.totalRequests) {
          console.log('me finish', this.authService.meRequest)
          if (!this.authService.meRequest) {
            this.loader.hide()
            console.log('hide')
          } else {
            this.authService.meRequest = false
          }
          this.completedRequests = 0
          this.totalRequests = 0
        }
      })
    )
  }
}

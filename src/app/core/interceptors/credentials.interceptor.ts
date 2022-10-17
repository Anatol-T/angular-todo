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

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  totalRequests = 0
  completedRequests = 0

  constructor(private loader: LoadingService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.totalRequests === 0) {
      this.loader.show()
    }
    this.totalRequests++
    request = request.clone({
      withCredentials: true,
      headers: new HttpHeaders().append('api-key', environment['apiKey']),
    })
    return next.handle(request).pipe(
      finalize(() => {
        this.completedRequests++
        if (this.completedRequests === this.totalRequests) {
          this.loader.hide()
          this.completedRequests = 0
          this.totalRequests = 0
        }
        //this.loader.hide()
      })
    )
  }
}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { CredentialsInterceptor } from './interceptors/credentials.interceptor'
import { AuthService } from './services/auth.service'
import { LoadingService } from './services/loading.service'
import { NotificationService } from './services/notification.service'

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true,
    },
    AuthService,
    LoadingService,
    NotificationService,
  ],
})
export class CoreModule {}

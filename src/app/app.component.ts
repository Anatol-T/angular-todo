import { Component, OnInit } from '@angular/core'
import { AuthService } from './core/services/auth.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-todo'
  isAuth$: Observable<boolean>

  constructor(private authService: AuthService) {
    this.isAuth$ = authService.isAuth$
  }

  ngOnInit(): void {
    this.authService.me()
  }
}

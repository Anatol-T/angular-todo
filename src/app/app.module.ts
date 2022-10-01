import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./auth/auth.module";
import {CoreModule} from "./core/core.module";
import {TodosModule} from "./todos/todos.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, AuthModule, CoreModule, TodosModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

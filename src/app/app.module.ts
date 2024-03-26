import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TodolistComponent } from './todolist/todolist.component';
import { CustomInterceptor } from './services/custom.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodolistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
  {
      provide: HTTP_INTERCEPTORS,
      useClass:CustomInterceptor,
      multi:true
  },
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.getTokenFromLocalStorage();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const authReq = req.clone({ headers });
      return next.handle(authReq);
    }
    return next.handle(req);
  }

  getTokenFromLocalStorage(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('loginToken');
    }
    return null;
  }
}

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../loading/loading.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private loadingService: LoadingService,
    private tokenService: TokenService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    let clonedReq = req;

    if (token) {
      clonedReq = req.clone({
        headers: req.headers.set('Authorization', `${token}`),
      });
    }

    if (!clonedReq.url.includes('authors')) {
      this.loadingService.show();
    }

    return next.handle(clonedReq).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            this.loadingService.hide();
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.loadingService.hide();
          }
        },
      })
    );
  }
}

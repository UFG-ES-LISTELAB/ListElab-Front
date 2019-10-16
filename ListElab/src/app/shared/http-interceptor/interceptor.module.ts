import {Injectable, Injector, NgModule} from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {LocalStorageService} from '../services/local-storage.service';
import {LoginService} from '../services/login.service';

@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.injector.get(LoginService);
    const storage = this.injector.get(LocalStorageService);

    if (LoginService.isAuthenticated()) {
      const dupReq = req.clone({
        headers: req.headers.set('Authorization', storage.getItem('token')),
      });
      return next.handle(dupReq);
    }

    return next.handle(req);
  }

}


@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpsRequestInterceptor,
      multi: true,
    },
  ],
})


export class InterceptorModule {}

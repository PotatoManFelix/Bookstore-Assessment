import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const user = this.authenticationService.userValue;
        // const isApiUrl = request.url.startsWith(environment.apiUrl);

        // if (!user || !isApiUrl) {
        //     console.log("something is wrong")
        // }

        return next.handle(request);
    }
}
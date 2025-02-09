import { bootstrapApplication } from '@angular/platform-browser';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { tap } from 'rxjs';

function logginginterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    // // midify request
    // const req = request.clone({
    //     headers: request.headers.set('X-DEBUG', 'TESTING')
    // })
    console.log('[outgoing request]')
    console.log(request)
    return next(request).pipe(
        tap({
            next: event => {
                if(event.type === HttpEventType.Response){
                    console.log('[INCOMING RESPONSE]')
                    console.log(event.status)
                    console.log(event.body)
                }
            }
        })
    )
}

bootstrapApplication(AppComponent, {
    providers:[provideHttpClient(
        withInterceptors([logginginterceptor])
    )]
}).catch((err) => console.error(err));

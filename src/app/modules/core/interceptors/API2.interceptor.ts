import { map, catchError } from 'rxjs/operators';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {ProgressBarService} from '../../../shared/services/progress-bar.service';

 export class API2Interceptor implements HttpInterceptor { 


   intercept(
       req: HttpRequest<any>, 
       next: HttpHandler
       ): Observable<HttpEvent<any>> { 
  
     const cloneReq = req.clone({ setHeaders: {"Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"}
     
    //  new HttpHeaders({'Content-Type': 'application/json', 'Authorization': 'jwt-token',
    //  "content_security_policy": "default-src 'none';script-src 'self';style-src 'self';font-src 'self';img-src 'self' data:;connect-src 'self'"})
    
    });
     return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
            }
            return event;
        }));
  
        
    //  return next.handle(reqClone) 
    //    .map(event => { 
    //      if (event instanceof HttpResponse) { 
    //        event = event.clone({ 
    //          headers: event.headers.set('x-test-res', 'res-test-header') 
    //        }); 
    //      } 
    //      return next.handle(event); 
    //    }); 
   } 

   
 } 
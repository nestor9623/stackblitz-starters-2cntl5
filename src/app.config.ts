import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";
import { provideRouter } from "@angular/router";
import { routes } from "./app.route";
import { LoaderInterceptor } from "./services/loader.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes), 
      provideHttpClient(withInterceptorsFromDi()),  
      {
        provide:HTTP_INTERCEPTORS,
        useClass: LoaderInterceptor,
        multi:true
      }
    ]
  };
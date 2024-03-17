import 'zone.js';
import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './services/loader.service';
import { CommonModule } from '@angular/common';
import { appConfig } from './app.config';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, CommonModule ],
  template: `
    @if(isLoading | async; as post){
      <div class="loader"></div>
    }
    <router-outlet></router-outlet>
  `,
})
export class App {
  isLoading: Subject<boolean> = this.loader.isLoading;

  constructor(private loader: LoaderService) {}
}

bootstrapApplication(App, appConfig);

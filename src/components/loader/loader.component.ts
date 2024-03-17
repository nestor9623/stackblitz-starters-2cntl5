import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-loader',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `
        <div class="loader"></div>

    `
})

export class LoaderComponent {

    isLoading = false;

    showLoader(loading: boolean){
        this.isLoading = loading;
    }
    
}
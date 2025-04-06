import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtnBackComponent } from '../btn-back/btn-back.component';

@Component({
    selector: 'app-url',
    imports: [RouterModule, BtnBackComponent],
    templateUrl: './url.component.html',
    styleUrl: './url.component.css'
})
export class UrlComponent {

}
